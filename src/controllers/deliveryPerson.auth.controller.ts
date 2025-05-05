import { Request, Response } from 'express';
import DeliveryPerson from '../models/deliveryPerson.model';
import { IDeliveryPerson } from '../interfaces/IDeliveryPerson';
import { hashPassword, comparePasswords, generateToken } from '../utils/auth';


export const register = async (req: Request, res: Response) => {
    try {
        const { name, email, password, mobile, age, NIC, vehicleNumber, currentLocation, address, licenseNumber } = req.body;

        // Check if Delivery Person already exists
        const existingDeliveryPerson = await DeliveryPerson.findOne({ email });
        if (existingDeliveryPerson) return res.status(400).json({ error: "Email already registered" });

        // Hash Password
        const hashedPassword = await hashPassword(password);

        // Create Delivery Person
        const newDeliveryPerson: IDeliveryPerson = await DeliveryPerson.create({ name, email, password: hashedPassword, mobile, age, NIC, vehicleNumber, currentLocation, address, licenseNumber });

        // Generate Token
        const token = generateToken(newDeliveryPerson._id.toString(), newDeliveryPerson.role);

        res.status(201).json({ token, deliveryPerson: newDeliveryPerson });
    } catch (error) {
        res.status(500).json({ error });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // Find delivery person
        const deliveryPerson = await DeliveryPerson.findOne({ email });
        if (!deliveryPerson) return res.status(400).json({ error: "Delivery Person not found" });

        // Compare Passwords
        const isMatch = await comparePasswords(password, deliveryPerson.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        // Generate Token
        const token = generateToken(deliveryPerson._id.toString(), deliveryPerson.role);

        res.status(201).json({ token, deliveryPerson });
    } catch (error) {
        res.status(500).json({ error });
    }
};