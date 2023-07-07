import AuthLayout from '@/Components/layout/AuthLayout'
import React from 'react'
import { Box, Grid, Typography, TextField, Button, Link } from '@mui/material';
import NextLink from "next/link"



const RegisterPage = () => {
  return (
    <AuthLayout title='Ingresar'>
        <Box sx={{width: 350, padding:"20px 20px"}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant='h1' component="h1">Crear cuenta</Typography>
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Nombre" variant="filled" fullWidth /> 
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Correo" variant="filled" fullWidth /> 
                </Grid>
                <Grid item xs={12}>
                    <TextField label="Contraseña" variant="filled" fullWidth /> 
                </Grid>
                <Grid item xs={12}>
                    <Button color='secondary' className='circular-btn' size="large" fullWidth>
                        Ingresar
                    </Button> 
                </Grid>
                <Grid item xs={12} display={'flex'} justifyContent={"end"}>
                    <NextLink legacyBehavior passHref href="/auth/login">
                        <Link underline="always">
                            ¿Ya tienes cuenta?
                        </Link>
                    </NextLink>
                </Grid>
            </Grid>
        </Box>
    </AuthLayout>
  )
}

export default RegisterPage