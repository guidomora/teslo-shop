import ShopLayout from '@/Components/layout/ShopLayout'
import { Box, Typography } from '@mui/material'
import React from 'react'

const Custom404 = () => {
  return (
    <ShopLayout 
    title='Page not found'
    pageDescription='No hay nada que mostrar aqui'
    >
        <Box display="flex" justifyContent="center" alignItems="center"
        height="calc(100vh - 200px)"
        sx={{flexDirection:{xs:"column", sm:"row"}}}>
          <Typography variant='h1' component="h1" fontWeight={200}
          sx={{fontSize:{xs:30, sm:80}}}>404 |</Typography>
          <Typography marginLeft={2} sx={{fontSize:{xs:12, sm:20}, marginTop:{xs:1, sm: 0}}}>
            No encontramos ninguna página aquí
          </Typography>
        </Box>

    </ShopLayout>
  )
}

export default Custom404