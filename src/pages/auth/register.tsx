import AuthLayout from '@/Components/layout/AuthLayout'
import React, { useState } from 'react'
import { Box, Grid, Typography, TextField, Button, Link, Chip } from '@mui/material';
import NextLink from "next/link"
import { useForm } from 'react-hook-form';
import tesloApi from '@/api/tesloApi';
import { isEmail } from '@/utils/validations';
import { ErrorOutline } from '@mui/icons-material';

type FormData = {
    name: string;
    email: string;
    password: string;
}

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm<FormData>()
    const [showError, setShowError] = useState(false)

    const onRegisterForm = async ({ name, email, password }: FormData) => {
        try {
            const { data } = await tesloApi.post("/user/register", { name, email, password })
            const { token, user } = data
            console.log({ token, user });

        } catch (error) {
            console.log(error);
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 3000);
        }
    }

    return (
        <AuthLayout title='Ingresar'>
            <form onSubmit={handleSubmit(onRegisterForm)} noValidate>
                <Box sx={{ width: 350, padding: "20px 20px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1">Crear cuenta</Typography>
                            <Chip label="No reconocemos ese usuario / contraseña" color='error' icon={<ErrorOutline />}
                            className='fadeIn' sx={{display: showError ? "flex" : "none"}} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                            label="Nombre" 
                            variant="filled" 
                            fullWidth type="name" 
                            {...register("name", {
                                required: "Este campo es requerido",
                                minLength: {value:2, message:"Mínimo 2 caracteres"}
                            })}
                            error={!!errors.name}
                            helperText={errors.name?.message}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                            label="Correo" 
                            variant="filled" 
                            fullWidth 
                            type="email" 
                            {...register("email", {
                                required:"Este campo es requerido",
                                minLength: {value: 6, message: "Minimo 6 caracteres"}
                            })}
                            error={!!errors.email}
                            helperText={errors.email?.message}/>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                            label="Contraseña" 
                            variant="filled" 
                            fullWidth 
                            type="password" 
                            {...register("password", {
                                required:"Este campo es requerido",
                                minLength: {value: 6, message: "Minimo 6 caracteres"}
                            })}
                            error={!!errors.password}
                            helperText={errors.password?.message}/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button 
                            color='secondary' 
                            className='circular-btn' 
                            size="large" 
                            fullWidth
                            type='submit'>
                                Crear cuenta
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
            </form>
        </AuthLayout>
    )
}

export default RegisterPage