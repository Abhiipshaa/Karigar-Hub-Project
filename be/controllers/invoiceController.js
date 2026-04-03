const PDFDocument = require('pdfkit');
const Order = require('../models/Order');
const User = require('../models/User');

const generateInvoice = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('user', 'name email phone')
      .populate('products.product', 'name price');

    if (!order) return res.status(404).json({ message: 'Order not found' });
    if (order.user._id.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    const doc = new PDFDocument({ margin: 50, size: 'A4' });
    const orderId = order._id.toString();
    const filename = `invoice-${orderId}.pdf`;

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    doc.pipe(res);

    // ── Header ────────────────────────────────────────────────────────────────
    doc.rect(0, 0, doc.page.width, 80).fill('#C0522B');
    doc.fillColor('#fff').fontSize(26).font('Helvetica-Bold').text('KARIGAR HUB', 50, 25);
    doc.fontSize(10).font('Helvetica').text('Authentic Indian Handcrafted Marketplace', 50, 55);

    // INVOICE label (top-right)
    doc.fontSize(28).font('Helvetica-Bold').fillColor('#fff')
      .text('INVOICE', 0, 28, { align: 'right', width: doc.page.width - 50 });

    doc.fillColor('#000');

    // ── Order meta ────────────────────────────────────────────────────────────
    const metaY = 100;
    doc.fontSize(10).font('Helvetica-Bold').fillColor('#7B5C3A').text('ORDER ID', 50, metaY);
    doc.font('Helvetica').fillColor('#2C1A0E').text(`#${orderId.slice(-10).toUpperCase()}`, 50, metaY + 14);

    const orderDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
      day: 'numeric', month: 'long', year: 'numeric',
    });
    doc.font('Helvetica-Bold').fillColor('#7B5C3A').text('DATE', 200, metaY);
    doc.font('Helvetica').fillColor('#2C1A0E').text(orderDate, 200, metaY + 14);

    const payStatus = order.isPaid ? 'PAID' : 'PENDING';
    const payColor  = order.isPaid ? '#16a34a' : '#d97706';
    doc.font('Helvetica-Bold').fillColor('#7B5C3A').text('PAYMENT STATUS', 350, metaY);
    doc.font('Helvetica-Bold').fillColor(payColor).text(payStatus, 350, metaY + 14);

    // ── Divider ───────────────────────────────────────────────────────────────
    doc.moveTo(50, 145).lineTo(545, 145).strokeColor('#E8D5B0').lineWidth(1).stroke();

    // ── Customer details ──────────────────────────────────────────────────────
    const custY = 160;
    doc.fontSize(11).font('Helvetica-Bold').fillColor('#C0522B').text('BILL TO', 50, custY);
    doc.fontSize(10).font('Helvetica-Bold').fillColor('#2C1A0E').text(order.user.name, 50, custY + 16);
    doc.font('Helvetica').fillColor('#5C3317').text(order.user.email, 50, custY + 30);
    if (order.user.phone) doc.text(order.user.phone, 50, custY + 44);

    const addr = order.shippingAddress || {};
    const addrParts = [addr.addressLine, addr.city, addr.pincode].filter(Boolean).join(', ');
    if (addrParts) doc.text(addrParts, 50, custY + (order.user.phone ? 58 : 44));

    // ── Payment method ────────────────────────────────────────────────────────
    doc.fontSize(11).font('Helvetica-Bold').fillColor('#C0522B').text('PAYMENT METHOD', 350, custY);
    doc.fontSize(10).font('Helvetica').fillColor('#2C1A0E')
      .text((order.paymentMethod || 'Online').toUpperCase(), 350, custY + 16);

    // ── Items table ───────────────────────────────────────────────────────────
    const tableTop = 270;
    // Table header bg
    doc.rect(50, tableTop, 495, 22).fill('#C0522B');
    doc.fillColor('#fff').fontSize(10).font('Helvetica-Bold');
    doc.text('ITEM', 58, tableTop + 6);
    doc.text('QTY', 340, tableTop + 6, { width: 50, align: 'center' });
    doc.text('PRICE', 390, tableTop + 6, { width: 70, align: 'right' });
    doc.text('TOTAL', 460, tableTop + 6, { width: 80, align: 'right' });

    let rowY = tableTop + 28;
    let subtotal = 0;

    order.products.forEach((item, idx) => {
      const name  = item.product?.name || 'Product';
      const price = Number(item.product?.price || 0);
      const qty   = Number(item.quantity || 1);
      const total = price * qty;
      subtotal += total;

      if (idx % 2 === 0) doc.rect(50, rowY - 4, 495, 22).fill('#FDF6EC');
      doc.fillColor('#2C1A0E').font('Helvetica').fontSize(10);
      doc.text(name, 58, rowY, { width: 270, ellipsis: true });
      doc.text(String(qty), 340, rowY, { width: 50, align: 'center' });
      doc.text(`Rs.${price.toLocaleString('en-IN')}`, 390, rowY, { width: 70, align: 'right' });
      doc.text(`Rs.${total.toLocaleString('en-IN')}`, 460, rowY, { width: 80, align: 'right' });
      rowY += 24;
    });

    // ── Totals ────────────────────────────────────────────────────────────────
    const gst     = Math.round(subtotal * 0.18);
    const grandTotal = Number(order.totalPrice);

    doc.moveTo(50, rowY + 4).lineTo(545, rowY + 4).strokeColor('#E8D5B0').lineWidth(1).stroke();
    rowY += 14;

    const totalsX = 390;
    doc.fontSize(10).font('Helvetica').fillColor('#5C3317');
    doc.text('Subtotal:', totalsX, rowY, { width: 70, align: 'right' });
    doc.text(`Rs.${subtotal.toLocaleString('en-IN')}`, 460, rowY, { width: 80, align: 'right' });
    rowY += 18;
    doc.text('GST (18%):', totalsX, rowY, { width: 70, align: 'right' });
    doc.text(`Rs.${gst.toLocaleString('en-IN')}`, 460, rowY, { width: 80, align: 'right' });
    rowY += 18;

    doc.rect(380, rowY - 4, 165, 24).fill('#C0522B');
    doc.fillColor('#fff').font('Helvetica-Bold').fontSize(11);
    doc.text('GRAND TOTAL:', totalsX, rowY + 2, { width: 70, align: 'right' });
    doc.text(`Rs.${grandTotal.toLocaleString('en-IN')}`, 460, rowY + 2, { width: 80, align: 'right' });

    // ── Footer ────────────────────────────────────────────────────────────────
    const footerY = doc.page.height - 70;
    doc.rect(0, footerY, doc.page.width, 70).fill('#2C1A0E');
    doc.fillColor('#E8D5B0').fontSize(12).font('Helvetica-Bold')
      .text('Thank you for your purchase!', 0, footerY + 14, { align: 'center' });
    doc.fillColor('#7B5C3A').fontSize(9).font('Helvetica')
      .text('Karigar Hub — Supporting Indian Artisans | www.karigarhub.in', 0, footerY + 34, { align: 'center' });

    doc.end();
  } catch (err) {
    console.error('Invoice error:', err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = { generateInvoice };
