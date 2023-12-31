import { Grid, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { CartContext } from '../../Context/cart/CartContext';
import { format } from '@/utils/currency';

const OrderSummary = () => {
    const {numberOfItems, subTotal, total, tax} = useContext(CartContext)
    
  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={"end"}>
            <Typography>{numberOfItems > 1 ? "productos" : "producto"}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={"end"}>
            <Typography>{format(subTotal)}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>impuestos ({Number(process.env.NEXT_PUBLIC_TAX_RATE) * 100}%)</Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={"end"}>
            <Typography>{format(tax)}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle1">Total:</Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={"end"}>
            <Typography variant="subtitle1">{format(total)}</Typography>
        </Grid>
    </Grid>
  )
}

export default OrderSummary