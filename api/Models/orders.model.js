import mongoose from "mongoose";

const { Schema } = mongoose;

const OrderSchema = Schema({
    orderNumber: {
        type: String,
        required: [true, "Please enter order number"]
    },
    orderedProducts: {
        type: Object, // couples product serialNumber and quantity
        required: true
    },
    orderDate: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId, // Utilisation de Schema.Types.ObjectId
        ref: 'User', // référence à un autre modèle d'utilisateur si nécessaire
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;
