import { IOrder } from "@/Interfaces/order";
import { IUser } from "@/Interfaces/user";
import mongoose, { Model, Schema, model } from "mongoose";


const orderSchema = new Schema({

    // el objectId es de mongo y la referencia es a la coleccion de usuarios
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    orderItems: [{
        _id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
        title: { type: String, required: true },
        size: { type: String, required: true },
        quantity: { type: Number, required: true },
        slug: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
    }],
    shippingAdress: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        adress: { type: String, required: true },
        adress2: { type: String, required: true },
        zip: { type: String},
        city: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true },
    },
    paymentResult: { type: Number, required: true },
    numberOfItems: { type: Number, required: true },
    subTotal: { type: Number, required: true },
    taxRate: { type: Number, required: true },
    tax: { type: Number, required: true },
    total: { type: Number, required: true },

    isPaid: { type: Boolean, required: true, default: false },
    paidAt: { type: String},

}, {
    timestamps: true
}
)

const Order: Model<IOrder> = mongoose.models.Order || model("User", orderSchema)

export default Order