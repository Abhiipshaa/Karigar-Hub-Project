const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { role: 'user', parts: [{ text: `You are a helpful assistant for Karigar Hub, an Indian handcrafted marketplace that sells authentic handmade products from verified artisans across 28 Indian states. Products include: Handloom & Sarees, Jewellery, Pottery & Decor, Paintings, Festive Items, Wooden Crafts, Gifts, Bamboo & Cane crafts, Dokra art, Madhubani paintings, Pattachitra, Chikankari, and more. Always respond in English only. Keep responses short, friendly, and helpful. Do not use markdown formatting like ** or ## in your responses.` }] },
            { role: 'model', parts: [{ text: 'Understood! I am the Karigar Hub assistant. How can I help you today?' }] },
            { role: 'user', parts: [{ text: message }] },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData?.error?.message || `Gemini API error ${response.status}`);
    }
    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Thanks for your message. We'll get back to you soon.";
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
