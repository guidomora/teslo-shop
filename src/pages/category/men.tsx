import ShopLayout from '@/Components/layout/ShopLayout'
import ProductList from '@/Components/products/ProductList'
import FullScreenLoading from '@/Components/ui/FullScreenLoading'
import { useProducts } from '@/hooks/useProducts'
import { Typography } from '@mui/material'
import { NextPage } from 'next'


const MenPage: NextPage = () => {
    const { products, isLoading } = useProducts('/products?gender=men')



  return (
    <ShopLayout title={'Teslo-Hombres'}
      pageDescription={'Productos para Hombres'}>
      <Typography variant="h1" component="h1">Hombres</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>Todos los productos</Typography>
      {
        isLoading ? <FullScreenLoading /> :
          <ProductList products={products} />
      }

    </ShopLayout>
  )
}


export default MenPage