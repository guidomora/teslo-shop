import { UiContext } from '@/Context/ui/UiContext'
import { ClearOutlined, SearchOutlined, ShoppingCartOutlined } from '@mui/icons-material'
import { AppBar, Badge, Box, Button, IconButton, Link, Toolbar, Typography, Input, InputAdornment } from '@mui/material';
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'

const NavBar = () => {
  const { isMenuOpen, toggleMenu } = useContext(UiContext)
  const [searchTerm, setSearchTerm] = useState("")
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const { asPath, push } = useRouter()

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return
    push(`/search/${searchTerm}`)
  }

  return (
    <AppBar>
      <Toolbar>
        <NextLink legacyBehavior href="/" passHref>
          <Link display="flex" alignItems="center">
            <Typography variant='h6'> Teslo |</Typography>
            <Typography sx={{ ml: 0.5 }}> Shop</Typography>
          </Link>
        </NextLink>
        <Box flex={1} />
        <Box sx={{ display: isSearchVisible ? "none" : { xs: "none", sm: "block" } }} className='fadeIn'>
          <NextLink legacyBehavior href="/category/men" passHref>
            <Link>
              <Button color={asPath === "/category/men" ? "primary" : "info"}>Hombres</Button>
            </Link>
          </NextLink>
          <NextLink legacyBehavior href="/category/women" passHref>
            <Link>
              <Button color={asPath === "/category/women" ? "primary" : "info"}>Mujeres</Button>
            </Link>
          </NextLink>
          <NextLink legacyBehavior href="/category/kid" passHref>
            <Link>
              <Button color={asPath === "/category/kid" ? "primary" : "info"}>Niños</Button>
            </Link>
          </NextLink>
        </Box>
        <Box flex={1} />
        {/* Pantalla grande */}
        {
          isSearchVisible ? (
            <Input
              sx={{ display: { xs: "none", sm: "block" } }}
              className='fadeIn'
              type='text'
              placeholder="Buscar..."
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus={true}
              onKeyUp={(e) => e.key === "Enter" ? onSearchTerm() : null} // Cuando la persona hace enter
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setIsSearchVisible(false)}
                  >
                    <ClearOutlined />
                  </IconButton>
                </InputAdornment>
              }
            />
          ) : (
            <IconButton
              onClick={() => setIsSearchVisible(true)}
              className='fadeIn'
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              <SearchOutlined />
            </IconButton>
          )
        }
        {/* Pantalla pequeña */}
        <IconButton
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={toggleMenu}
        >
          <SearchOutlined />
        </IconButton>
        <NextLink legacyBehavior href="/cart" passHref>
          <Link>
            <IconButton>
              <Badge badgeContent={2} color='secondary'>
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>
        <Button onClick={toggleMenu}>
          Menu
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar