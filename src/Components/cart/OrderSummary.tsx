import { Grid, Typography } from '@mui/material'
import React from 'react'

const OrderSummary = () => {
  return (
    <Grid container>
        <Grid item xs={6}>
            <Typography>No. Productos</Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={"end"}>
            <Typography>3 Items</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>Subtotal</Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={"end"}>
            <Typography>${`${155.36}`}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography>impuestos (15%)</Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={"end"}>
            <Typography>${`${35.36}`}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Typography variant="subtitle1">Total:</Typography>
        </Grid>
        <Grid item xs={6} display={'flex'} justifyContent={"end"}>
            <Typography variant="subtitle1">${`${185.36}`}</Typography>
        </Grid>
    </Grid>
  )
}

export default OrderSummary