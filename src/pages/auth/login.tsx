import AuthLayout from '@/Components/layout/AuthLayout'
import React from 'react'
import { Box, Grid, Typography, TextField, Button, Link } from '@mui/material';
import NextLink from "next/link"
import { useForm } from 'react-hook-form';

type FormData = {
    email: string
    password: string
}

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm<FormData>()

    const onLoginUser = (data: FormData) => {
        console.log(data);
    }

    return (
        <AuthLayout title='Ingresar'>
            <form onSubmit={handleSubmit(onLoginUser)}>
                <Box sx={{ width: 350, padding: "20px 20px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1">Iniciar Sesión</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                            label="Correo" 
                            variant="filled" 
                            fullWidth
                            type="email"
                            {...register("email")}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                            label="Contraseña" 
                            variant="filled" 
                            fullWidth
                            type='password'
                            {...register("password")}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button type='submit' color='secondary' className='circular-btn' size="large" fullWidth>
                                Ingresar
                            </Button>
                        </Grid>
                        <Grid item xs={12} display={'flex'} justifyContent={"end"}>
                            <NextLink legacyBehavior passHref href="/auth/register">
                                <Link underline="always">
                                    ¿No tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

export default LoginPage