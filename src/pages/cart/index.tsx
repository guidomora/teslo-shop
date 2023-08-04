import CartList from '@/Components/cart/CartList'
import OrderSummary from '@/Components/cart/OrderSummary'
import ShopLayout from '@/Components/layout/ShopLayout'
import { CartContext } from '@/Context/cart/CartContext'
import { Box, Button, Card, CardContent, Divider, Grid, Link, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react'
import NextLink from "next/link"

const CartPage = () => {

    const { isLoaded, cart } = useContext(CartContext)
    const router = useRouter()

    useEffect(() => {
        if (isLoaded && cart.length === 0) {
            router.replace("/cart/empty")
        }
    }, [isLoaded, cart, router])


    if (!isLoaded || cart.length === 0) {
        return (<></>)
    }

    return (
        <ShopLayout title='Carrito - 3' pageDescription={"Carrito de compras de la tienda"}>
            <Typography variant='h1' component="h1">Carrito</Typography>
            <Grid container>
                <Grid item xs={12} sm={7}>
                    <CartList editable />
                </Grid>
                <Grid item xs={12} sm={5}>
                    <Card className='summary-card'>
                        <CardContent>
                            <Typography variant='h2'>Orden</Typography>
                            <Divider sx={{ my: 1 }} />
                            <OrderSummary />
                            <Box sx={{ mt: 3 }}>
                                <NextLink legacyBehavior passHref href={"/checkout/adress"}>
                                    <Link sx={{textDecoration: "none"}}>
                                        <Button color='secondary' className='circular-btn' fullWidth>
                                            CheckOut
                                        </Button>
                                    </Link>
                                </NextLink>

                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </ShopLayout>
    )
}

export default CartPage