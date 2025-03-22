import express from "express";
import Event from "../models/event.models.js";
import authMiddleware from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
  const { name, date, location, description } = req.body;

  try {
    const event = new Event({
      name,
      date,
      location,
      description,
      organizerId: req.user.id,
    });

    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("organizerId", "name email");
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/:id/rsvp", authMiddleware, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    if (!event.attendees.includes(req.user.id)) {
      event.attendees.push(req.user.id);
      await event.save();
    }

    res.json({ message: "RSVP successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate("organizerId", "name email").populate("attendees", "name email");

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.json(event);
  } 
  catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { name, date, location, description } = req.body;
    const eventId = req.params.id;

    // Find the event in MongoDB
    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Convert organizerId to string before comparing
    if (event.organizerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update this event" });
    }

    // Update event fields if provided
    if (name) event.name = name;
    if (date) event.date = date;
    if (location) event.location = location;
    if (description) event.description = description;

    await event.save(); // Save the updated event

    res.status(200).json({ message: "Event updated successfully", event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});




router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const eventId = req.params.id;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Only the event organizer can delete
    if (event.organizerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete this event" });
    }

    await Event.findByIdAndDelete(eventId);
    res.json({ message: "Event deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
