import CartList from '@/Components/cart/CartList'
import OrderSummary from '@/Components/cart/OrderSummary'
import ShopLayout from '@/Components/layout/ShopLayout'
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material'
import React, { useContext } from 'react'
import NextLink from "next/link"
import { CartContext } from '@/Context/cart/CartContext'
import { countries } from '@/utils/countries'


const SumaryPage = () => {
    const {shippingAdress, numberOfItems} = useContext(CartContext)

    const countryName = countries.find(c => c.code === shippingAdress?.country)?.name

    if (!shippingAdress) {
        <></>
    }

  return (
    <ShopLayout title='Resumen de orden' pageDescription={"Resumen de orden"}>
        <Typography variant='h1' component="h1">Resumen de orden</Typography>
        <Grid  container>
            <Grid item xs={12} sm={7}>
                <CartList/>
            </Grid>
            <Grid item xs={12} sm={5}>
                <Card className='summary-card'>
                    <CardContent>
                        <Typography variant='h2'>Resumen ({numberOfItems})</Typography>
                        <Divider sx={{my:1}} />
                        <Box display={'flex'} justifyContent={"space-between"}>
                        <Typography variant="subtitle1">Dirección de entrega</Typography>
                            <NextLink legacyBehavior passHref href="/checkout/adress">
                                <Link underline="always">
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>
                        <Typography>{shippingAdress?.firstName}</Typography>
                        <Typography>{shippingAdress?.lastName}</Typography>
                        <Typography>{shippingAdress?.adress}</Typography>
                        { shippingAdress?.adress2?.length === undefined  ? <Typography>{shippingAdress?.adress2}</Typography> : null}
                        <Typography>{shippingAdress?.city}</Typography>
                        <Typography>{shippingAdress?.zip}</Typography>
                        <Typography>{countryName}</Typography>
                        <Typography>+{shippingAdress?.phone}</Typography>
                        <Divider sx={{my:1}} />
                        <Box display={'flex'} justifyContent={"end"}>
                            <NextLink legacyBehavior passHref href="/cart">
                                <Link underline="always">
                                    Editar
                                </Link>
                            </NextLink>
                        </Box>
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

export default SumaryPage