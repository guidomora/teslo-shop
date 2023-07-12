import { GetServerSideProps } from 'next'
import ShopLayout from '@/Components/layout/ShopLayout'
import React from 'react'
import { initialData } from '../../../database/products'
import { Box, Button, Grid, Typography } from '@mui/material'
import ProductSlideShow from '@/Components/products/ProductSlideShow'
import 'react-slideshow-image/dist/styles.css'
import ItemCounter from '@/Components/ui/ItemCounter'
import SizeSelector from '@/Components/products/SizeSelector'
import { useRouter } from 'next/router'
import { IProduct } from '@/Interfaces/products'
import { NextPage } from 'next'
import { getProductbySlug } from '../../../database/dbProducts'
import { redirect } from 'next/dist/server/api-utils'





interface Props {
  product: IProduct
}


const ProductPage: NextPage<Props> = ({product}) => {



  return (
    <ShopLayout title={product.title} pageDescription={product.description}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={7}>
          <ProductSlideShow images={product.images} />
        </Grid>
        <Grid item xs={12} sm={5}>
          <Box display={'flex'} flexDirection={'column'}>
            <Typography variant='h1' component="h1">{product.title}</Typography>
            <Typography variant='subtitle1' component="h2">${product.price}</Typography>
            <Box sx={{my:2}}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter />
              <SizeSelector
               sizes={product.sizes} 
              //  selectedSize={product.sizes[0]} 
               />
            </Box>
            <Button color='secondary' className='circular-btn'>Agregar al carrito</Button>
            {/* <Chip label="No hay disponibles" color='error' variant="outlined" /> */}
            <Box sx={{mt:3}}>
              <Typography variant="subtitle2">Descripción</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async ({params}) => {

  // desestructuramos el slug que va a venir de los params
  const { slug } = params as {slug:string}

  // se lo pasamos este custom hook que lo va a traer de la db
  const product = await getProductbySlug(slug)

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent:false
      }
    }
  }

  return {
    props: {
      product
    }
  }
}

export default ProductPage