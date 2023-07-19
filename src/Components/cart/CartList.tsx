import React, { FC, useContext } from 'react'
import { initialData } from '../../../database/seed-data';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import NextLink from "next/link"
import ItemCounter from '../ui/ItemCounter';
import { CartContext } from '@/Context/cart/CartContext';
import { ICartProduct } from '@/Interfaces/cart';

// va a ser opcional 
interface Props {
    editable?: boolean
}



const CartList: FC<Props> = ({ editable = false }) => {
    const {cart, updateCartQuantity, removeCartProduct} = useContext(CartContext)

    const onNewCartQuantityValue = (product: ICartProduct, newQuantityValue: number) => {
        product.quantity = newQuantityValue // el producto va a tener el valor que estamos recibiendo como argumento
        updateCartQuantity(product)
    }
    return (
        <>
            {
                cart.map(product => (
                    // para que la key sea unica cuando agreguemos 2 productos con el mismo slug
                    <Grid spacing={2} container key={product.slug + product.size} sx={{ mb: 1 }}> 
                        <Grid item xs={3}>
                            <NextLink legacyBehavior href={`/product/${product.slug}`} passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            image={`/products/${product.image}`}
                                            component="img"
                                            sx={{ borderRadius: "5px" }}
                                        />
                                    </CardActionArea>
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={7}>
                            <Box display={'flex'} flexDirection={'column'}>
                                <Typography variant='body1'>{product.title}</Typography>
                                <Typography variant='body1'>Talla: <strong>{product.size}</strong></Typography>
                                {
                                    editable
                                        ? (
                                        <ItemCounter currentValue={product.quantity} maxValue={10} updateQuantity={(value)=>onNewCartQuantityValue(product, value)} />
                                        )
                                        : <Typography variant='h5'>{product.quantity} {product.quantity > 1 ? "productos" : "producto"}</Typography>
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={2} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                            <Typography>${product.price}</Typography>
                            {
                                editable &&
                                <Button variant='text' color='secondary' onClick={()=>removeCartProduct(product)}>Remover</Button>

                            }
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}

export default CartList