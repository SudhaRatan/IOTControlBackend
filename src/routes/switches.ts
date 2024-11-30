import Express from "express";
import verifyJWT from "../middlewares/auth";
import Switch from "../models/Switch";
import { AuthenticatedRequest } from "../types";

const router = Express.Router();

// Create a new switch
router.post("/", verifyJWT, async (req, res) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const newSwitch = new Switch({
      ...req.body,
      userId,
    });
    await newSwitch.save();
    res.status(201).json(newSwitch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating switch" });
  }
});

// Get all switches for the logged-in user
router.get("/", verifyJWT, async (req, res) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const switches = await Switch.find({ userId });
    res.json(switches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting switches" });
  }
});

// Get a specific switch by ID
router.get("/:id", verifyJWT, async (req, res) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const switchItem = await Switch.findOne({ _id: req.params.id, userId });
    if (!switchItem) {
      res.status(404).json({ message: "Switch not found" });
    }
    res.json(switchItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting switch" });
  }
});

// Get switches by thingId
router.get("/thing/:thingId", verifyJWT, async (req, res) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const switches = await Switch.find({ thingId: req.params.thingId, userId });
    res.json(switches);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error getting switches by thingId" });
  }
});

// Update a switch
router.put("/:id", verifyJWT, async (req, res) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const switchItem = await Switch.findOneAndUpdate(
      { _id: req.params.id, userId },
      req.body,
      { new: true }
    );
    if (!switchItem) {
      res.status(404).json({ message: "Switch not found" });
    }
    res.json(switchItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating switch" });
  }
});

// Delete a switch
router.delete("/:id", verifyJWT, async (req, res) => {
  try {
    const { userId } = req as AuthenticatedRequest;
    const switchItem = await Switch.findOneAndDelete({
      _id: req.params.id,
      userId,
    });
    if (!switchItem) {
      res.status(404).json({ message: "Switch not found" });
    }
    res.json({ message: "Switch deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting switch" });
  }
});

export default router;
