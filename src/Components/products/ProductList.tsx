import { IProduct } from "@/Interfaces/products"
import { Grid } from "@mui/material"
import { FC } from "react"
import ProductCard from "./ProductCard"

// Componente de las listas de productos

interface Props {
    products:IProduct[]
}


const ProductList:FC<Props> = ({products}) => {
  return (
    <Grid container spacing={4}>
        {products.map(product => (
            <ProductCard 
            product={product}
            key={product.slug}
            />
        ))}
    </Grid>
  )
}

export default ProductList