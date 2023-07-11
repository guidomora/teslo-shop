import ShopLayout from '@/Components/layout/ShopLayout'
import ProductList from '@/Components/products/ProductList'
import FullScreenLoading from '@/Components/ui/FullScreenLoading'
import { useProducts } from '@/hooks/useProducts'
import { Typography } from '@mui/material'
import { NextPage } from 'next'


const KidsPage: NextPage = () => {
    const { products, isLoading } = useProducts('/products?gender=kid')



  return (
    <ShopLayout title={'Teslo-kids'}
      pageDescription={'Productos para niños'}>
      <Typography variant="h1" component="h1">Niños</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>Todos los productos</Typography>
      {
        isLoading ? <FullScreenLoading /> :
          <ProductList products={products} />
      }

    </ShopLayout>
  )
}


export default KidsPage