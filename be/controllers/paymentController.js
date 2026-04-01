const Razorpay = require('razorpay');
const crypto   = require('crypto');

// Lazily create instance so dotenv is always loaded before this runs
const getRazorpay = () => new Razorpay({
  key_id:     process.env.TEST_API_KEY,
  key_secret: process.env.TEST_SECRET_KEY,
});

// POST /api/payment/create-order
const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0)
      return res.status(400).json({ message: 'Invalid amount' });

    const options = {
      amount:   Math.round(amount * 100), // convert rupees → paise
      currency: 'INR',
      receipt:  `receipt_${Date.now()}`,
    };

    const order = await getRazorpay().orders.create(options);
    res.json({ orderId: order.id, amount: order.amount, currency: order.currency });
  } catch (err) {
    console.error('Razorpay create order error:', err.message);
    res.status(500).json({ message: 'Failed to create payment order' });
  }
};

// POST /api/payment/verify
const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature)
      return res.status(400).json({ message: 'Missing payment fields' });

    const body     = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expected = crypto
      .createHmac('sha256', process.env.TEST_SECRET_KEY)
      .update(body)
      .digest('hex');

    if (expected !== razorpay_signature) {
      console.log('Payment verification FAILED:', { razorpay_payment_id, status: 'failed' });
      return res.status(400).json({ success: false, message: 'Payment verification failed' });
    }

    console.log('Payment verified:', { payment_id: razorpay_payment_id, status: 'success' });
    res.json({ success: true, payment_id: razorpay_payment_id });
  } catch (err) {
    console.error('Razorpay verify error:', err.message);
    res.status(500).json({ message: 'Verification error' });
  }
};

module.exports = { createRazorpayOrder, verifyPayment };
