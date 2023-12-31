import React, { useContext, useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { NextPage } from 'next'
import ShopLayout from '@/Components/layout/ShopLayout'
import { Box, Button, Chip, Grid, Typography } from '@mui/material'
import ProductSlideShow from '@/Components/products/ProductSlideShow'
import 'react-slideshow-image/dist/styles.css'
import ItemCounter from '@/Components/ui/ItemCounter'
import SizeSelector from '@/Components/products/SizeSelector'
import { IProduct, ISize } from '@/Interfaces/products'
import { getAllProductsSlugs, getProductbySlug } from '../../../database/dbProducts'
import { ICartProduct } from '@/Interfaces/cart'
import { useRouter } from 'next/router'
import { CartContext } from '@/Context/cart/CartContext'






interface Props {
  product: IProduct
}


const ProductPage: NextPage<Props> = ({ product }) => {
  const {addProductToCart} = useContext(CartContext)
  const router = useRouter()

  // con <ICartProduct> indicamos que el state va a ser de ese tipo de dato
  const [tempCartProduct, setTempCartProduct] = useState<ICartProduct>({
    _id: product._id,
    image: product.images[0],
    price: product.price,
    size: undefined,
    slug: product.slug,
    title: product.title,
    gender: product.gender,
    quantity: 1,
  })

  const selectedSize = (size: ISize) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      size
    }))
  }

  const onUpdateQuantity = (quantity: number) => {
    setTempCartProduct(currentProduct => ({
      ...currentProduct,
      quantity
    }))
  }

  const look = () => {
    if (!tempCartProduct.size) {
      return
    } 
    addProductToCart(tempCartProduct)
    router.push("/cart")
  }


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
            <Box sx={{ my: 2 }}>
              <Typography variant='subtitle2'>Cantidad</Typography>
              <ItemCounter
              currentValue={tempCartProduct.quantity} 
              maxValue={product.inStock > 5 ? product.inStock :5 }
              updateQuantity={onUpdateQuantity}
              />
              <SizeSelector
                sizes={product.sizes}
                selectedSize={tempCartProduct.size}
                onSelectedSize={selectedSize}
              />
            </Box>
            {
              (product.inStock > 0) ?
                (<Button color='secondary' className='circular-btn' onClick={look}>{
                  tempCartProduct.size ? "Agregar al carrito"
                    : "Seleccione una talla"
                }
                </Button>)
                : <Chip label="No hay disponibles" color='error' variant="outlined" />
            }
            <Box sx={{ mt: 3 }}>
              <Typography variant="subtitle2">Descripción</Typography>
              <Typography variant="body2">{product.description}</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

// No vamos a usar SSR------------------------------------------
// export const getServerSideProps: GetServerSideProps = async ({params}) => {

//   // desestructuramos el slug que va a venir de los params
//   const { slug } = params as {slug:string}

//   // se lo pasamos este custom hook que lo va a traer de la db
//   const product = await getProductbySlug(slug)

//   if (!product) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent:false
//       }
//     }
//   }

//   return {
//     props: {
//       product
//     }
//   }
// }
// --------------------------------------------------------------------------



export const getStaticPaths: GetStaticPaths = async (ctx) => {

  // obtenemos el slug
  const productSlugs = await getAllProductsSlugs()

  return {
    //           desestructuramos slug 
    paths: productSlugs.map(({ slug }) => ({
      params: { slug }
    })),
    fallback: "blocking"
  }
}


// desestructuramos los params del context
export const getStaticProps: GetStaticProps = async ({ params }) => {

  // si el slug no viene va a ser un string vacio
  const { slug = "" } = params as { slug: string }
  const product = await getProductbySlug(slug)

  if (!product) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props: {
      product
    },
    revalidate: 86400
  }
}


export default ProductPage