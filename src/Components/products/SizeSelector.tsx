import { ISize} from '@/Interfaces/products'
import { Box, Button } from '@mui/material'
import React, { FC, useState } from 'react'



interface Props {
  selectedSize?: ISize
  sizes: ISize[]
  onSelectedSize: (size: ISize) => void
}

const SizeSelector: FC<Props> = ({ selectedSize, sizes, onSelectedSize }) => {
  
  return (
    <Box>
      {
        sizes.map(size => (
          <Button 
          key={size} 
          size='small'
          onClick={() => onSelectedSize(size)}
          color={selectedSize === size ? "primary": "info"}>
            {size}
          </Button>
        ))
      }
    </Box>
  )
}

export default SizeSelector