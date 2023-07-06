import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import ShopLayout from '@/Components/layout/ShopLayout'
import {Typography } from '@mui/material'
import { initialData } from '../../database/products'
import ProductList from '@/Components/products/ProductList'



const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <ShopLayout title={'Teslo'} 
    pageDescription={'Los mejores productos'}>
      <Typography variant="h1" component="h1">Tienda</Typography>
      <Typography variant="h2" sx={{mb:1}}>Todos los productos</Typography>
      <ProductList products={initialData.products as any}/>
    </ShopLayout>
  )
}
