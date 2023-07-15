import ShopLayout from '@/Components/layout/ShopLayout'
import { Box, Typography } from '@mui/material'
import ProductList from '@/Components/products/ProductList'
import { useProducts } from '@/hooks/useProducts'
import FullScreenLoading from '@/Components/ui/FullScreenLoading'
import { NextPage, GetServerSideProps } from 'next'
import { getAllProducts, getProductsByTerm } from '../../../database/dbProducts'
import { IProduct } from '@/Interfaces/products'

interface Props {
    products: IProduct[]
    foundProducts: boolean
    query: string
}


const SearchPage: NextPage<Props> = ({ products, foundProducts, query }) => {

    return (
        <ShopLayout title={'Teslo - Search'}
            pageDescription={'Los mejores productos'}>
            <Typography variant="h1" component="h1">Buscar producto</Typography>
            {
                foundProducts ?
                    <Typography variant="h2" sx={{ mb: 1 }} textTransform="capitalize">{query}</Typography>
                    : <Box display={'flex'}>
                        <Typography variant="h2" sx={{ mb: 1 }}>No encontramos ningún producto</Typography>
                        <Typography variant="h2" sx={{ ml: 1 }} color="secondary" textTransform="capitalize">{query}</Typography>
                    </Box>
            }
            <ProductList products={products} />
        </ShopLayout>
    )
}


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { query = "" } = params as { query: string }


    if (query.length === 0) {
        return {
            redirect: {
                destination: "/",
                permanent: true
            }
        }
    }

    // es un let porque puede ser que la persona haya buscado algo y no hay resultados
    let products = await getProductsByTerm(query)
    const foundProducts = products.length > 0

    if (!foundProducts) {
        products = await getAllProducts()
    }

    return {
        props: {
            products,
            foundProducts,
            query
        }
    }
}

export default SearchPage
