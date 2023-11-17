import * as mongoose from 'mongoose';
import { Document, Schema } from "mongoose";

export interface IProduct extends Document {
        gtin: number;
        name: string;
        image: string;
        brandName: string;
        category: string;
        color: string;
        stock: number;
        price: number;
}

const ProductSchema: Schema = new mongoose.Schema<IProduct>(
    {
        gtin: { type: Number, required: true },
        name: { type: String, required: true },
        image: { type: String },
        brandName: { type: String, required: true },
        category: { type: String, required: true },
        color: { type: String, required: true },
        stock: { type: Number, required: true },
        price: { type: Number, required: true }
    },
    { timestamps: true }
);


export default mongoose.model('products', ProductSchema);
