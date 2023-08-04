import ShopLayout from '@/Components/layout/ShopLayout'
import { Box, Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import React, { useContext } from 'react'
import { GetServerSideProps } from 'next'
import { isValidToken } from '../../utils/jwt';
import { countries } from '@/utils/countries';
import { useForm } from 'react-hook-form';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { CartContext } from '@/Context/cart/CartContext';

type FormData = {
    firstName: string;
    lastName: string;
    adress: string;
    adress2?: string;
    zip: string;
    city: string;
    country: string;
    phone: string;
}

const getAdressFromCookies = ():FormData => {
    return {
        firstName:Cookies.get("firstName") || "",
        lastName:Cookies.get("lastName") || "",
        adress:Cookies.get("adress") || "",
        adress2:Cookies.get("adress2" || "") || "",
        zip:Cookies.get("zip") || "",
        city:Cookies.get("city") || "",
        country:Cookies.get("country") || "",
        phone:Cookies.get("phone") || "",
    }
}

const adress = () => {
    const {updateAdress} = useContext(CartContext)
    const router = useRouter()
    const { register, handleSubmit, formState: { errors }, } = useForm<FormData>({
        defaultValues: getAdressFromCookies()
    })


    const onSubmitAdress = (data: FormData) => {
        updateAdress(data)
        router.push("/checkout/summary")
    }

    return (
        <ShopLayout title='Dirección' pageDescription='Confirmar direccion del destino'>
            <Typography variant='h1' component="h1">Dirección</Typography>
            <form onSubmit={handleSubmit(onSubmitAdress)}>
                <Grid container spacing={2} mt={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Nombre"
                            variant='filled'
                            fullWidth
                            type="firstName"
                            {...register("firstName", {
                                required: "Este campo es requerido",
                                minLength: { value: 2, message: "Minimo 2 caracteres" }
                            })}
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Apellido"
                            variant='filled'
                            fullWidth
                            type="lastName"
                            {...register("lastName", {
                                required: "Este campo es requerido",
                                minLength: { value: 2, message: "Minimo 2 caracteres" }
                            })}
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Dirección"
                            variant='filled'
                            fullWidth
                            type="adress"
                            {...register("adress", {
                                required: "Este campo es requerido",
                                minLength: { value: 2, message: "Minimo 2 caracteres" }
                            })}
                            error={!!errors.adress}
                            helperText={errors.adress?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Dirección2"
                            variant='filled'
                            fullWidth
                            type="adress2"
                            {...register("adress2", {
                                minLength: { value: 2, message: "Minimo 2 caracteres" }
                            })}
                            error={!!errors.adress2}
                            helperText={errors.adress2?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Código Postal"
                            variant='filled'
                            fullWidth
                            type="zip"
                            {...register("zip", {
                                required: "Este campo es requerido",
                                minLength: { value: 2, message: "Minimo 2 caracteres" }
                            })}
                            error={!!errors.zip}
                            helperText={errors.zip?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Ciudad"
                            variant='filled'
                            fullWidth
                            type="city"
                            {...register("city", {
                                required: "Este campo es requerido",
                                minLength: { value: 2, message: "Minimo 2 caracteres" }
                            })}
                            error={!!errors.city}
                            helperText={errors.city?.message}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <TextField
                                select
                                variant='filled'
                                label="País"
                                type="country"
                                defaultValue={Cookies.get("country") || countries[0].code}
                                {...register("country", {
                                    required: "Este campo es requerido",
                                })}
                                error={!!errors.country}
                            // helperText={errors.country?.message}

                            >
                                {countries.map(country => (
                                    <MenuItem key={country.code}
                                        value={country.code}>{country.name}</MenuItem>
                                ))}
                            </TextField>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Teléfono"
                            variant='filled'
                            fullWidth
                            type="phone"
                            {...register("phone", {
                                required: "Este campo es requerido",
                                minLength: { value: 2, message: "Minimo 2 caracteres" }
                            })}
                            error={!!errors.phone}
                            helperText={errors.phone?.message}
                        />
                    </Grid>
                    <Box sx={{ mt: 5 }} display={'flex'} justifyContent={'center'}>
                        <Button type='submit' color='secondary' className='circular-btn' size="large">
                            Revisar Pedido
                        </Button>
                    </Box>
                </Grid>
            </form>

        </ShopLayout>
    )
}






export const getServerSideProps: GetServerSideProps = async ({ req }) => {

    const { token = "" } = req.cookies
    let isValidTokenn = false

    try {
        await isValidToken(token)
        isValidTokenn = true
    } catch (error) {
        isValidTokenn = false
    }

    if (!isValidTokenn) {
        return {
            redirect: {
                destination: "/auth/login?p=/checkout/adress",
                permanent: false
            }
        }
    }

    return {
        props: {

        }
    }
}




export default adress