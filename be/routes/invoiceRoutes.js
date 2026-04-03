const express = require('express');
const router  = express.Router();
const PDFDocument = require('pdfkit');
const Order   = require('../models/Order');

router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('user', 'name email phone')
      .populate('products.product', 'name price');

    if (!order) return res.status(404).json({ message: 'Order not found' });

    const doc = new PDFDocument({ margin: 50, size: 'A4' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=invoice-${order._id}.pdf`);
    doc.pipe(res);

    const PRIMARY   = '#C0522B';
    const DARK      = '#2C1A0E';
    const MUTED     = '#7B5C3A';
    const LIGHT_BG  = '#FDF6EC';
    const invoiceNo = `KH-${order._id.toString().slice(-8).toUpperCase()}`;
    const orderDate = new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });

    // ── Header background ──
    doc.rect(0, 0, doc.page.width, 110).fill(PRIMARY);

    // Logo circle
    doc.circle(70, 55, 28).fill('rgba(255,255,255,0.15)');
    doc.fontSize(22).fillColor('#FFFFFF').font('Helvetica-Bold').text('KH', 55, 43);

    // Brand name
    doc.fontSize(20).fillColor('#FFFFFF').font('Helvetica-Bold').text('Karigar Hub', 105, 35);
    doc.fontSize(8).fillColor('rgba(255,255,255,0.75)').font('Helvetica').text('Authentic Indian Handcrafts', 105, 58);

    // INVOICE label on right
    doc.fontSize(28).fillColor('#FFFFFF').font('Helvetica-Bold').text('INVOICE', 0, 35, { align: 'right' });
    doc.fontSize(10).fillColor('rgba(255,255,255,0.85)').font('Helvetica').text(`# ${invoiceNo}`, 0, 68, { align: 'right' });

    doc.moveDown(4);

    // ── Info row ──
    const infoY = 130;
    const addr  = order.shippingAddress || {};

    // Bill To box
    doc.rect(50, infoY, 240, 90).fill(LIGHT_BG).stroke('#E8D5B0');
    doc.fontSize(8).fillColor(MUTED).font('Helvetica-Bold').text('BILL TO', 62, infoY + 10);
    doc.fontSize(11).fillColor(DARK).font('Helvetica-Bold').text(order.user?.name || 'Customer', 62, infoY + 24);
    doc.fontSize(9).fillColor(MUTED).font('Helvetica')
      .text(order.user?.email || '', 62, infoY + 40)
      .text(order.user?.phone || '', 62, infoY + 53)
      .text([addr.addressLine, addr.city, addr.pincode].filter(Boolean).join(', '), 62, infoY + 66, { width: 220 });

    // Order details box
    doc.rect(310, infoY, 240, 90).fill(LIGHT_BG).stroke('#E8D5B0');
    doc.fontSize(8).fillColor(MUTED).font('Helvetica-Bold').text('ORDER DETAILS', 322, infoY + 10);
    const details = [
      ['Invoice No',   invoiceNo],
      ['Order Date',   orderDate],
      ['Payment',      order.paymentMethod?.toUpperCase() || 'ONLINE'],
      ['Status',       order.isPaid ? 'PAID' : 'PENDING'],
    ];
    details.forEach(([label, val], i) => {
      doc.fontSize(8).fillColor(MUTED).font('Helvetica').text(label, 322, infoY + 26 + i * 14);
      doc.fontSize(8).fillColor(DARK).font('Helvetica-Bold').text(val, 430, infoY + 26 + i * 14, { align: 'right', width: 108 });
    });

    // ── Items table ──
    const tableTop = infoY + 110;
    const cols = { item: 50, qty: 320, price: 390, total: 460 };

    // Table header
    doc.rect(50, tableTop, 500, 24).fill(PRIMARY);
    doc.fontSize(9).fillColor('#FFFFFF').font('Helvetica-Bold')
      .text('ITEM',       cols.item,  tableTop + 8)
      .text('QTY',        cols.qty,   tableTop + 8)
      .text('UNIT PRICE', cols.price, tableTop + 8)
      .text('TOTAL',      cols.total, tableTop + 8);

    // Table rows
    let rowY = tableTop + 24;
    let subtotal = 0;

    order.products.forEach((item, i) => {
      const name  = item.product?.name || 'Product';
      const price = Number(item.product?.price || 0);
      const qty   = Number(item.quantity || 1);
      const total = price * qty;
      subtotal   += total;

      const bg = i % 2 === 0 ? '#FFFFFF' : LIGHT_BG;
      doc.rect(50, rowY, 500, 22).fill(bg).stroke('#E8D5B0');

      doc.fontSize(9).fillColor(DARK).font('Helvetica')
        .text(name,                                cols.item,  rowY + 7, { width: 260 })
        .text(String(qty),                         cols.qty,   rowY + 7)
        .text(`Rs. ${price.toLocaleString('en-IN')}`, cols.price, rowY + 7)
        .text(`Rs. ${total.toLocaleString('en-IN')}`, cols.total, rowY + 7);

      rowY += 22;
    });

    // ── Totals ──
    const gst      = Math.round(subtotal * 0.18);
    const shipping = order.totalPrice - subtotal > 0 ? order.totalPrice - subtotal - gst : 0;
    const grand    = order.totalPrice;

    rowY += 10;
    const totals = [
      ['Subtotal',  `Rs. ${subtotal.toLocaleString('en-IN')}`],
      ['GST (18%)', `Rs. ${gst.toLocaleString('en-IN')}`],
      ...(shipping > 0 ? [['Shipping', `Rs. ${shipping.toLocaleString('en-IN')}`]] : [['Shipping', 'FREE']]),
    ];

    totals.forEach(([label, val]) => {
      doc.fontSize(9).fillColor(MUTED).font('Helvetica')
        .text(label, 350, rowY)
        .text(val,   460, rowY, { align: 'right', width: 90 });
      rowY += 16;
    });

    // Grand total bar
    rowY += 4;
    doc.rect(350, rowY, 200, 26).fill(PRIMARY);
    doc.fontSize(11).fillColor('#FFFFFF').font('Helvetica-Bold')
      .text('GRAND TOTAL', 360, rowY + 8)
      .text(`Rs. ${grand.toLocaleString('en-IN')}`, 360, rowY + 8, { align: 'right', width: 180 });

    // ── Footer ──
    const footerY = doc.page.height - 70;
    doc.rect(0, footerY, doc.page.width, 70).fill(LIGHT_BG);
    doc.moveTo(50, footerY).lineTo(doc.page.width - 50, footerY).stroke('#E8D5B0');

    doc.fontSize(10).fillColor(PRIMARY).font('Helvetica-Bold')
      .text('Thank you for supporting Indian artisans! 🙏', 0, footerY + 14, { align: 'center' });
    doc.fontSize(8).fillColor(MUTED).font('Helvetica')
      .text('Karigar Hub · karigar-hub.in · support@karigarhub.in', 0, footerY + 32, { align: 'center' })
      .text('This is a computer-generated invoice and does not require a signature.', 0, footerY + 46, { align: 'center' });

    doc.end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
