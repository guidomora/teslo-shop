import AuthLayout from '@/Components/layout/AuthLayout'
import React, { useContext, useState } from 'react'
import { Box, Grid, Typography, TextField, Button, Link, Chip } from '@mui/material';
import NextLink from "next/link"
import { useForm } from 'react-hook-form';
import tesloApi from '@/api/tesloApi';
import { isEmail } from '@/utils/validations';
import { ErrorOutline } from '@mui/icons-material';
import { AuthContext } from '@/Context/auth/AuthContext';
import { useRouter } from 'next/router';

type FormData = {
    name: string;
    email: string;
    password: string;
}

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm<FormData>()
    const [showError, setShowError] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const {registerUser} = useContext(AuthContext)
    const router = useRouter()

    const onRegisterForm = async ({ name, email, password }: FormData) => {
        setShowError(false)

        const {hasError, message} = await registerUser(name, email, password)

        if (hasError) {
            setShowError(true)
            setErrorMessage(message!) // le agregamos el "!" para marcar que no va a ser undefined
            setTimeout(() => {
                setShowError(false)
            }, 3000);
            return
        }
        const destination = router.query.p?.toString() ||"/" //si el argumento no viene redireccionamos a la pagina de inicio
        router.replace(destination);
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
                            <NextLink legacyBehavior passHref href={`/auth/login?p=${router.query.p?.toString()}`}>
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