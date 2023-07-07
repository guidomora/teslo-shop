import ShopLayout from '@/Components/layout/ShopLayout'
import React from 'react'
import { Chip, Grid, Link, Typography } from '@mui/material';
import { DataGrid, GridColDef, GridValueGetterParams, GridRenderCellParams } from '@mui/x-data-grid';
import NextLink from "next/link"



const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "fullname", headerName: "Nombre Completo", width: 300 },

  {
    field: "paid",
    headerName: "Pagada",
    description: "Muestra info de si la orden esta pagada o no",
    width: 200,
    // El renderCell sirve para que podamos renderizar un componente en
    // las filas
    renderCell: (params: GridRenderCellParams) => {
      return (
        params.row.paid
          ? <Chip color='success' label="Pagada" variant="outlined" />
          : <Chip color='error' label="No pagada" variant="outlined" />
      )
    }
  },

  {
    field: "orden",
    headerName: "Order",
    width: 200,
    sortable:false,
    renderCell: (params: GridRenderCellParams) => {
      return (
        <NextLink legacyBehavior passHref href={`/orders/${params.row.id}`}>
          <Link underline='always'>
            Ver orden
          </Link>
        </NextLink>
      )

    }
  }
]

const rows = [
  { id: 1, paid: true, orden: "Orden", fullname: "Guido Morabito" },
  { id: 2, paid: true, orden: "Orden", fullname: "Guido perez" },
  { id: 3, paid: false, orden: "Orden", fullname: "pedro gisbert" },
  { id: 4, paid: true, orden: "Orden", fullname: "franco turbina" },
  { id: 5, paid: false, orden: "Orden", fullname: "joaquin ferrari" },
  { id: 6, paid: true, orden: "Orden", fullname: "rocio manganaro" }
]

const HistoryPage = () => {
  return (
    <ShopLayout title='Historial de ordenes' pageDescription='Historial de ordenes del cliente'>
      <Typography variant='h1' component="h1">Historial de ordenes</Typography>
      <Grid container>
        <Grid item sx={{ height: 650, width: "100%" }}>
          <DataGrid
            rows={rows}
            columns={columns}
          />
        </Grid>
      </Grid>
    </ShopLayout>
  )
}

export default HistoryPage