import CartList from '@/Components/cart/CartList'
import OrderSummary from '@/Components/cart/OrderSummary'
import ShopLayout from '@/Components/layout/ShopLayout'
import { Box, Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material'
import React from 'react'

const CartPage = () => {
  return (
    <ShopLayout title='Carrito - 3' pageDescription={"Carrito de compras de la tienda"}>
        <Typography variant='h1' component="h1">Carrito</Typography>
        <Grid  container>
            <Grid item xs={12} sm={7}>
                <CartList editable/>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Orden</Typography>
                        <Divider sx={{my:1}} />
                        <OrderSummary />
                        <Box sx={{mt:3}}>
                            <Button color='secondary' className='circular-btn' fullWidth>
                                CheckOut
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    </ShopLayout>
  )
}

export default CartPage