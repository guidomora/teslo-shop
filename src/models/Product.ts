import { IProduct } from "@/Interfaces/products";
import mongoose, { Schema, model, Model } from "mongoose";

// Configuramos el modelo de los productos

const productSchema = new Schema({
    description: { type: String, required: true },
    images: [{ type: String }], //Las imagenes al ser varias, las envolvemos en []
    inStock: { type: Number, required: true, default: 0 }, // valor por defecto 0
    price: { type: Number, required: true, default: 0 },
    sizes: [{
        type: String,
        enum: {
            values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            message: "{VALUE} no es un tamaño permitido"
        }
    }],
    slug: { type: String, required: true, unique: true }, // unico
    tags: [{ type: String, required: true }],
    title: { type: String, required: true },
    type: { // al no ser un listado no va en un array como sizes
        // o es un pantalon, o una remera, etc
        type: String,
        enum: {
            values: ['shirts', 'pants', 'hoodies', 'hats'],
            message: "{VALUE} no es un tipo permitido"
        },
        default: 'shirts'
    },
    gender: { 
        type: String,
        enum: {
            values: ['men', 'women', 'kid', 'unisex'],
            message: "{VALUE} no es un genero permitido"
        },
        default: 'women'
    }

}, {
    timestamps: true
})

const Product: Model<IProduct> = mongoose.models.Product || model("Product" ,productSchema)

export default Product