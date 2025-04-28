import { Request, Response } from "express";
import DeliveryPerson from "../models/deliveryPerson.model";
import { IDeliveryPerson } from "../interfaces/IDeliveryPerson";

const getAllDeliveryPersons = async (req: Request, res: Response) => {
  try {
    const deliveryPersons: IDeliveryPerson[] | null =
      await DeliveryPerson.find();

    if (deliveryPersons === null || deliveryPersons.length === 0) {
      return res.status(404).json({ message: "No delivery persons found" });
    }

    res.status(200).json(deliveryPersons);
  } catch (error) {
    console.error("Error fetching delivery persons:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getDeliveryPersonById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deliveryPerson: IDeliveryPerson | null =
      await DeliveryPerson.findById(id);

    if (!deliveryPerson) {
      return res.status(404).json({ message: "Delivery Person not found" });
    }

    res.status(200).json(deliveryPerson);
  } catch (error) {
    console.error("Error fetching delivery person:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateDeliveryPerson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      mobile,
      age,
      NIC,
      vehicleNumber,
      currentLocation,
      address,
      licenseNumber,
    } = req.body;

    const deliveryPerson: IDeliveryPerson | null =
      await DeliveryPerson.findById(id);

    if (!deliveryPerson) {
      return res.status(404).json({ message: "Delivery Person not found" });
    }

    const updatedDeliveryPerson: IDeliveryPerson | null =
      await DeliveryPerson.findByIdAndUpdate(
        id,
        {
          name,
          email,
          mobile,
          age,
          NIC,
          vehicleNumber,
          currentLocation,
          address,
          licenseNumber,
        },
        { new: true }
      );

    res.status(200).json(updatedDeliveryPerson);
  } catch (error) {
    console.error("Error updating delivery person:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const deleteDeliveryPerson = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deliveryPerson: IDeliveryPerson | null =
      await DeliveryPerson.findById(id);

    if (!deliveryPerson) {
      return res.status(404).json({ message: "Delivery Person not found" });
    }

    await DeliveryPerson.findByIdAndDelete(id);

    res.status(200).json({ message: "Delivery Person deleted successfully" });
  } catch (error) {
    console.error("Error deleting delivery person:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAvailableDeliveryPersons = async (req: Request, res: Response) => {
  try {
    const availableDeliveryPersons: IDeliveryPerson[] | null =
      await DeliveryPerson.find({ isAvailable: true });

    if (
      availableDeliveryPersons === null ||
      availableDeliveryPersons.length === 0
    ) {
      return res
        .status(404)
        .json({ message: "No available delivery persons found" });
    }

    res.status(200).json(availableDeliveryPersons);
  } catch (error) {
    console.error("Error fetching available delivery persons:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateDeliveryPersonAvailability = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const { isAvailable } = req.body;

    const deliveryPerson: IDeliveryPerson | null =
      await DeliveryPerson.findById(id);

    if (!deliveryPerson) {
      return res.status(404).json({ message: "Delivery Person not found" });
    }

    const updatedDeliveryPerson: IDeliveryPerson | null =
      await DeliveryPerson.findByIdAndUpdate(
        id,
        { isAvailable },
        { new: true }
      );

    res.status(200).json(updatedDeliveryPerson);
  } catch (error) {
    console.error("Error updating delivery person availability:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export {
  getAllDeliveryPersons,
  getDeliveryPersonById,
  updateDeliveryPerson,
  deleteDeliveryPerson,
  getAvailableDeliveryPersons,
  updateDeliveryPersonAvailability,
};
