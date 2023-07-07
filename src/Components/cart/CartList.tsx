import React, { FC } from 'react'
import { initialData } from '../../../database/products';
import { Box, Button, CardActionArea, CardMedia, Grid, Link, Typography } from '@mui/material';
import NextLink from "next/link"
import ItemCounter from '../ui/ItemCounter';

// va a ser opcional 
interface Props {
    editable?: boolean
}

const productsInCart = [
    initialData.products[1],
    initialData.products[2],
    initialData.products[3]
]

const CartList: FC<Props> = ({ editable = false }) => {
    return (
        <>
            {
                productsInCart.map(product => (
                    <Grid spacing={2} container key={product.slug} sx={{ mb: 1 }}>
                        <Grid item xs={3}>
                            <NextLink legacyBehavior href="/product/slug" passHref>
                                <Link>
                                    <CardActionArea>
                                        <CardMedia
                                            image={`/products/${product.images[0]}`}
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
                                <Typography variant='body1'>Talla:<strong>M</strong></Typography>
                                {
                                    editable
                                        ? <ItemCounter />
                                        : <Typography variant='h5'>3 items</Typography>
                                }
                            </Box>
                        </Grid>
                        <Grid item xs={2} display={'flex'} alignItems={'center'} flexDirection={'column'}>
                            <Typography>${product.price}</Typography>
                            {
                                editable &&
                                <Button variant='text' color='secondary'>Remover</Button>

                            }
                        </Grid>
                    </Grid>
                ))
            }
        </>
    )
}

export default CartList