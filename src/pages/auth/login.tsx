import AuthLayout from '@/Components/layout/AuthLayout'
import React, { useContext, useState } from 'react'
import { Box, Grid, Typography, TextField, Button, Link, Chip } from '@mui/material';
import NextLink from "next/link"
import { useForm } from 'react-hook-form';
import { isEmail } from '@/utils/validations';
import { ErrorOutline } from '@mui/icons-material';
import tesloApi from '@/api/tesloApi';
import { AuthContext } from '@/Context/auth/AuthContext';
import { useRouter } from 'next/router';

type FormData = {
    email: string
    password: string
}

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm<FormData>()
    const [showError, setShowError] = useState(false)
    const { loginUser } = useContext(AuthContext)
    const router = useRouter()

    const onLoginUser = async ({ email, password }: FormData) => {
        setShowError(false)

        const isValidLogin = await loginUser(email, password)

        if (!isValidLogin) {
            setShowError(true)
            setTimeout(() => {
                setShowError(false)
            }, 3000);
            return;
        }
        router.replace("/"); // el replace hace que el usuario no pueda volver a la pagina anterior
    }

    return (
        <AuthLayout title='Ingresar'>
            <form onSubmit={handleSubmit(onLoginUser)} noValidate>
                <Box sx={{ width: 350, padding: "20px 20px" }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant='h1' component="h1">Iniciar Sesión</Typography>
                            <Chip label="No reconocemos ese usuario / contraseña" color='error' icon={<ErrorOutline />}
                                className='fadeIn' sx={{ display: showError ? "flex" : "none" }} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Correo"
                                variant="filled"
                                fullWidth
                                type="email"
                                {...register("email", {
                                    required: "Este campo es requerido",
                                    validate: isEmail
                                })}
                                error={!!errors.email} // doble negacion: propio de TS, si existe el error.....
                                helperText={errors.email?.message} // si existe el mensaje, sino es undefined
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Contraseña"
                                variant="filled"
                                fullWidth
                                type='password'
                                {...register("password", {
                                    required: "Este campo es requerido",
                                    minLength: { value: 6, message: "Minimo 6 caracteres" }
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />
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