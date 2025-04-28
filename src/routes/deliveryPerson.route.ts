import express from "express";
import { register, login } from "../controllers/deliveryPerson.auth.controller";
import {
  getAllDeliveryPersons,
  getDeliveryPersonById,
  getAvailableDeliveryPersons,
  updateDeliveryPerson,
  deleteDeliveryPerson,
  updateDeliveryPersonAvailability,
} from "../controllers/deliveryPerson.controller";


const router = express.Router();

router.post("/login", login as express.RequestHandler);
router.post("/register", register as express.RequestHandler);
router.get("/", getAllDeliveryPersons as express.RequestHandler);
router.get("/available", getAvailableDeliveryPersons as express.RequestHandler);
router.get("/:id", getDeliveryPersonById as express.RequestHandler);
router.put("/:id", updateDeliveryPerson as express.RequestHandler);
router.put(
  "/:id/availability",
  updateDeliveryPersonAvailability as express.RequestHandler
);
router.delete("/:id", deleteDeliveryPerson as express.RequestHandler);

export default router;