import ShopLayout from '@/Components/layout/ShopLayout'
import ProductList from '@/Components/products/ProductList'
import FullScreenLoading from '@/Components/ui/FullScreenLoading'
import { useProducts } from '@/hooks/useProducts'
import { Typography } from '@mui/material'
import { NextPage } from 'next'


const WomenPage: NextPage = () => {
    const { products, isLoading } = useProducts('/products?gender=women')



  return (
    <ShopLayout title={'Teslo-Mujeres'}
      pageDescription={'Productos para Mujeres'}>
      <Typography variant="h1" component="h1">Mujeres</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>Todos los productos</Typography>
      {
        isLoading ? <FullScreenLoading /> :
          <ProductList products={products} />
      }

    </ShopLayout>
  )
}


export default WomenPage