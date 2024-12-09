import Express from "express";
import verifyJWT from "../middlewares/auth";
import Thing from "../models/Thing";
import { AuthenticatedRequest } from "../types";
import Switch from "../models/Switch";

const router = Express.Router();

// Create a new thing
router.post("/", verifyJWT, async (req, res) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const thing = new Thing({
      ...req.body,
      userId,
    });
    await thing.save();
    res.status(201).json(thing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating thing" });
  }
});

// Get all things for the logged-in user
router.get("/", verifyJWT, async (req, res) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const things = await Thing.find({ userId }).populate("switches");
    res.json(things);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting things" });
  }
});

// Get a specific thing by ID
router.get("/:id", verifyJWT, async (req, res) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const thing = await Thing.findOne({ _id: req.params.id, userId });
    if (!thing) {
      res.status(404).json({ message: "Thing not found" });
    }
    res.json(thing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting thing" });
  }
});

// Update a thing
router.put("/:id", verifyJWT, async (req, res) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const thing = await Thing.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true }
    );
    if (!thing) {
      res.status(404).json({ message: "Thing not found" });
    }
    res.json(thing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating thing" });
  }
});

// Delete a thing
router.delete("/:id", verifyJWT, async (req, res) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const thing = await Thing.findOneAndDelete({
      _id: req.params.id,
      userId,
    });
    await Switch.deleteMany({ thingId: req.params.id });
    if (!thing) {
      res.status(404).json({ message: "Thing not found" });
      return;
    }
    res.json({ message: "Device removed" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting thing" });
  }
});

export default router;
