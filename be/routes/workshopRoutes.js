const express = require('express');
const router = express.Router();
const Workshop = require('../models/Workshop');
const protect = require('../middleware/authMiddleware');

// Generate dummy zoom link
const generateZoomLink = () => `https://zoom.us/j/${Math.random().toString(36).substr(2, 9)}${Date.now().toString(36)}`;

// POST /api/workshops — Create workshop
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, date, fromTime, toTime, duration, zoomLink, price, maxParticipants } = req.body;

    if (!title || !description || !date || !fromTime || !toTime) {
      return res.status(400).json({ message: 'Please fill all required fields' });
    }

    if (fromTime >= toTime) {
      return res.status(400).json({ message: 'To Time must be after From Time' });
    }

    const workshop = await Workshop.create({
      title,
      description,
      date,
      fromTime,
      toTime,
      duration: duration || '',
      zoomLink: zoomLink || '',
      artistId: req.user.id,
    });

    res.status(201).json({ success: true, message: 'Workshop created successfully', workshop });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/workshops — Get all workshops (public)
router.get('/', async (req, res) => {
  try {
    const workshops = await Workshop.find().sort({ createdAt: -1 })
      .populate('artistId', 'name category profileImage address bio');
    res.json(workshops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/workshops/my — Get my workshops
router.get('/my', protect, async (req, res) => {
  try {
    const workshops = await Workshop.find({ artistId: req.user.id }).sort({ createdAt: -1 });
    res.json(workshops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT /api/workshops/:id — Update workshop
router.put('/:id', protect, async (req, res) => {
  try {
    const workshop = await Workshop.findOneAndUpdate(
      { _id: req.params.id, artistId: req.user.id },
      req.body,
      { new: true }
    );
    if (!workshop) return res.status(404).json({ message: 'Workshop not found' });
    res.json({ success: true, workshop });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/workshops/:id — Delete workshop
router.delete('/:id', protect, async (req, res) => {
  try {
    const workshop = await Workshop.findOneAndDelete({ _id: req.params.id, artistId: req.user.id });
    if (!workshop) return res.status(404).json({ message: 'Workshop not found' });
    res.json({ success: true, message: 'Workshop deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
