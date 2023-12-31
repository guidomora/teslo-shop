import CartList from '@/Components/cart/CartList'
import OrderSummary from '@/Components/cart/OrderSummary'
import ShopLayout from '@/Components/layout/ShopLayout'
import { Box, Button, Card, CardContent, Chip, Divider, Grid, Link, Typography } from '@mui/material'
import React from 'react'
import NextLink from "next/link"
import { CreditCardOffOutlined, CreditScoreOutlined } from '@mui/icons-material'


const OrderPage = () => {
    return (
        <ShopLayout title='Resumen de orden 45354' pageDescription={"Resumen de orden"}>
            <Typography variant='h1' component="h1">Orden: 312</Typography>
            {/* <Chip 
        sx={{my:2}}
        label="Pendiente de pago"
        variant="outlined"
        color='error'
        icon={<CreditCardOffOutlined />}
        /> */}
            <Chip
                sx={{ my: 2 }}
                label="La orden ya fue pagada"
                variant="outlined"
                color='success'
                icon={<CreditScoreOutlined />}
            />
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Resumen (3 productos)</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display={'flex'} justifyContent={"space-between"}>
                                <Typography variant="subtitle1">Dirección de entrega</Typography>
                                <NextLink legacyBehavior passHref href="/checkout/adress">
                                    <Link underline="always">
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>
                            <Typography>Guido </Typography>
                            <Typography>Capital federal</Typography>
                            <Typography>1270</Typography>
                            <Typography>Argentina</Typography>
                            <Typography>+549112233445</Typography>
                            <Divider sx={{ my: 1 }} />
                            <Box display={'flex'} justifyContent={"end"}>
                                <NextLink legacyBehavior passHref href="/cart">
                                    <Link underline="always">
                                        Editar
                                    </Link>
                                </NextLink>
                            </Box>
                            <OrderSummary />
                            <Box sx={{ mt: 3 }}>
                                <Typography variant='h1'>Pagar</Typography>
                                <Chip
                                    sx={{ my: 2 }}
                                    label="La orden ya fue pagada"
                                    variant="outlined"
                                    color='success'
                                    icon={<CreditScoreOutlined />}
                                />
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default OrderPage