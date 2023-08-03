import { Box, Divider, Drawer, IconButton, Input, InputAdornment, List, ListItem, ListItemButton, ListItemIcon, ListItemText, ListSubheader } from "@mui/material"
import { AccountCircleOutlined, AdminPanelSettings, CategoryOutlined, ConfirmationNumberOutlined, EscalatorWarningOutlined, FemaleOutlined, LoginOutlined, MaleOutlined, SearchOutlined, VpnKeyOutlined } from "@mui/icons-material"
import { UiContext } from "@/Context/ui/UiContext"
import { useContext, useState } from "react"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { AuthContext } from "@/Context/auth/AuthContext"


export const SideMenu = () => {
    const { isMenuOpen, toggleMenu } = useContext(UiContext)
    const { user, isLoggedIn, logout } = useContext(AuthContext)


    // busqueda
    const [searchTerm, setSearchTerm] = useState("")
    const router = useRouter()

    const navigateTo = (url: string) => {
        toggleMenu()
        router.push(url)
    }

    const onSearchTerm = () => {
        if (searchTerm.trim().length === 0) return
        // reutilizamos la funcion
        navigateTo(`/search/${searchTerm}`)
    }



    return (
        <Drawer
            open={isMenuOpen}
            onClose={toggleMenu}
            anchor='right'
            sx={{ backdropFilter: 'blur(4px)', transition: 'all 0.5s ease-out' }}
        >
            <Box sx={{ width: 250, paddingTop: 5 }}>
                <List>
                    <ListItem>
                        <Input
                            type='text'
                            placeholder="Buscar..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            autoFocus={true}
                            onKeyUp={(e) => e.key === "Enter" ? onSearchTerm() : null} // Cuando la persona hace enter
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        onClick={onSearchTerm}
                                    >
                                        <SearchOutlined />
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </ListItem>
                    {isLoggedIn && <>
                        <ListItemButton >
                            <ListItemIcon>
                                <AccountCircleOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Perfil'} />
                        </ListItemButton>
                        <ListItemButton>
                            <ListItemIcon>
                                <ConfirmationNumberOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Mis Ordenes'} />
                        </ListItemButton>
                    </>}
                    <ListItemButton sx={{ display: { xs: '', sm: 'none' } }} onClick={() => navigateTo('/category/men')}>
                        <ListItemIcon>
                            <MaleOutlined />
                            <ListItemText primary={'Hombres'} sx={{ ml: 4, color: "black" }} />
                        </ListItemIcon>
                    </ListItemButton>

                    <ListItemButton sx={{ display: { xs: '', sm: 'none' } }} onClick={() => navigateTo('/category/women')}>
                        <ListItemIcon>
                            <FemaleOutlined />
                            <ListItemText primary={'Mujeres'} sx={{ ml: 4, color: "black" }} />
                        </ListItemIcon>
                    </ListItemButton>

                    <ListItemButton sx={{ display: { xs: '', sm: 'none' } }} onClick={() => navigateTo('/category/kid')}>
                        <ListItemIcon>
                            <EscalatorWarningOutlined />
                            <ListItemText primary={'Niños'} sx={{ ml: 4, color: "black" }} />
                        </ListItemIcon>
                    </ListItemButton>

                    {isLoggedIn ?
                        <ListItemButton onClick={logout}>
                            <ListItemIcon>
                                <LoginOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Salir'} />
                        </ListItemButton>
                        // obtiene el path actual y lo agrega al que nos vamos a dirigir
                        : <ListItemButton onClick={() => navigateTo(`/auth/login?p=${router.asPath}`)}> 
                            <ListItemIcon>
                                <VpnKeyOutlined />
                            </ListItemIcon>
                            <ListItemText primary={'Ingresar'} />
                        </ListItemButton>
                    }
                    {
                        user?.role === "admin" && <>
                            <Divider />
                            <ListSubheader>Admin Panel</ListSubheader>

                            <ListItem button>
                                <ListItemIcon>
                                    <CategoryOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Productos'} />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <ConfirmationNumberOutlined />
                                </ListItemIcon>
                                <ListItemText primary={'Ordenes'} />
                            </ListItem>

                            <ListItem button>
                                <ListItemIcon>
                                    <AdminPanelSettings />
                                </ListItemIcon>
                                <ListItemText primary={'Usuarios'} />
                            </ListItem>
                        </>
                    }
                </List>
            </Box>
        </Drawer>
    )
}