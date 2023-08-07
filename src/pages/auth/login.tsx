import { GetServerSideProps } from 'next'
import AuthLayout from '@/Components/layout/AuthLayout'
import React, { useEffect, useState } from 'react'
import { Box, Grid, Typography, TextField, Button, Link, Chip, Divider } from '@mui/material';
import NextLink from "next/link"
import { useForm } from 'react-hook-form';
import { isEmail } from '@/utils/validations';
import { ErrorOutline } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { getProviders, getSession, signIn } from 'next-auth/react';

type FormData = {
    email: string
    password: string
}

const LoginPage = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm<FormData>()
    const [showError, setShowError] = useState(false)
    const router = useRouter()
    const [providers, setProviders] = useState<any>({}) // le ponemos any porque si le queremos poner el verdadero tipo es un quilombo

    useEffect(() => {
        // promesa propia de next auth
        getProviders().then(prov => { // podemos acceder a los providers para iniciar sesion
            setProviders(prov)
        })
    }, [])
    

    const onLoginUser = async ({ email, password }: FormData) => {
        setShowError(false)

        // Le tenemos que pasar los providers que utilizamos
        await signIn("credentials", { email, password })

        // Autenticacion personalizada sin NextAuth
        // const isValidLogin = await loginUser(email, password)

        // if (!isValidLogin) {
        //     setShowError(true)
        //     setTimeout(() => {
        //         setShowError(false)
        //     }, 3000);
        //     return;
        // }
        // const destination = router.query.p?.toString() ||"/" //si el argumento no viene redireccionamos a la pagina de inicio
        // router.replace(destination); // el replace hace que el usuario no pueda volver a la pagina anterior
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
                            <NextLink legacyBehavior passHref href={`/auth/register?p=${router.query.p?.toString()}`}>
                                <Link underline="always">
                                    ¿No tienes cuenta?
                                </Link>
                            </NextLink>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider sx={{width:"100%", mb:2}} />
                            {/* con esta funcion, se obtienen de un objeto todos sus valores */}
                            {Object.values(providers).map((provider:any) => {
                                if (provider.id === "credentials") {
                                    return <div key={"crecentials"}></div>
                                }
                                return(
                                    <Button
                                    key={provider.id}
                                    variant='outlined'
                                    fullWidth
                                    color='primary'
                                    sx={{mb:1}}
                                    onClick={() => signIn(provider.id)}
                                    >
                                    {provider.name}
                                    </Button>
                                )
                            })}
                        </Grid>
                    </Grid>
                </Box>
            </form>
        </AuthLayout>
    )
}

// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
    const session = await getSession({ req })

    const { p = "/" } = query // si no hay query nos manda al inicio

    if (session) {
        return {
            redirect: {
                destination: p.toString(),
                permanent: false
            }
        }
    }

    return {
        props: {

        }
    }
}

export default LoginPage