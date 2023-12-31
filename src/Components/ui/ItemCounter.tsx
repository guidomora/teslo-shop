import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'
import { Box, IconButton, Typography } from '@mui/material'
import React, { FC, useState } from 'react'


interface Props {
  currentValue: number
  maxValue: number
  updateQuantity: (newValue: number) => void
}


const ItemCounter: FC<Props> = ({ maxValue, currentValue, updateQuantity }) => {

  const addOrRemove = (value: number) => {
    if (value === -1) {
      if (currentValue === 1) return

      return updateQuantity(currentValue - 1)
    }
    if (currentValue >= maxValue) return

    updateQuantity(currentValue + 1)
  }



  return (
    <Box display={'flex'} alignItems={'center'}>
      <IconButton onClick={()=>addOrRemove(-1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: "center" }}>{currentValue}</Typography>
      <IconButton onClick={()=>addOrRemove(+1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}

export default ItemCounter