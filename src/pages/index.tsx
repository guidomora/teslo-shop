import { Inter } from 'next/font/google'
import ShopLayout from '@/Components/layout/ShopLayout'
import { Typography } from '@mui/material'
import ProductList from '@/Components/products/ProductList'
import { useProducts } from '@/hooks/useProducts'
import FullScreenLoading from '@/Components/ui/FullScreenLoading'



const inter = Inter({ subsets: ['latin'] })





export default function Home() {

  const { products, isLoading } = useProducts('/products')



  return (
    <ShopLayout title={'Teslo'}
      pageDescription={'Los mejores productos'}>
      <Typography variant="h1" component="h1">Tienda</Typography>
      <Typography variant="h2" sx={{ mb: 1 }}>Todos los productos</Typography>
      {
        isLoading ? <FullScreenLoading /> :
          <ProductList products={products} />
      }

    </ShopLayout>
  )
}
