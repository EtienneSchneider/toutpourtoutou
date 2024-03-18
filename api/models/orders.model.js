import mongoose from "mongoose";

const OrderSchema = mongoose.Schema(
    {
        orderNumber: {
            type: String,
            required: [true, "Please enter order number"]
        },
        orderedProducts: {
            type: Object, // couples product serialNumber and quantity
            required: true
        },
        orderDate: {
            orderDate: String,
            required: true
        },
        user: {
          type: ObjectId,
          required: true
        }
    }
);

const Order = mongoose.model("Order", OrderSchema);

export default Product;
