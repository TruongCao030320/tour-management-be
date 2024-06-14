import express from "express";
import {
  createBooking,
  getAllBooking,
  getSingleBooking,
} from "../controller/bookingController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
const router = express.Router();
router.post("/", verifyUser, createBooking);
router.get("/:id", verifyUser, getSingleBooking);
router.get("/", verifyUser, getAllBooking);
export default router;
