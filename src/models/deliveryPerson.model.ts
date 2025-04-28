import { Schema, model } from "mongoose";
import { IDeliveryPerson } from "../interfaces/IDeliveryPerson";

const deliveryPersonSchema = new Schema<IDeliveryPerson>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "deliveryPerson",
    },
    age: {
      type: Number,
      required: true,
    },
    NIC: {
      type: String,
      required: true,
    },
    vehicleNumber: {
      type: String,
      required: true,
    },
    currentLocation: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    licenseNumber: {
      type: String,
      required: true,
    },
    isAvailable:{
        type:Boolean, 
        default:true
    }
  },
  { timestamps: true }
);

const DeliveryPerson = model<IDeliveryPerson>("DeliveryPerson", deliveryPersonSchema);
export default DeliveryPerson;