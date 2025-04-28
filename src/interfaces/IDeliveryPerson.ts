import {  Document, Schema } from 'mongoose';

export interface IDeliveryPerson extends Document {
    _id : Schema.Types.ObjectId;
    name : string;
    email : string;
    password : string;
    mobile : string;
    role : string;
    age : number;
    NIC : string;
    vehicleNumber : string;
    currentLocation : string;
    address : string;
    licenseNumber : string;
    isAvailable : boolean;
    comparePassword(candidatePassword: string): Promise<boolean>;
}