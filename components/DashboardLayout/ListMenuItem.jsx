import React from 'react'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import Box from '@mui/material/Box';
import CategoryIcon from '@mui/icons-material/Category';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Link from 'next/link';
import { useRouter } from 'next/router';

const menuListItem = [
    {
        id: 'Usuarios',
        description: 'Admistrar, ver usuarios',
        icon: <PeopleIcon />,
        url: "/users"
    },
    {
        id: 'Categorías',
        description: 'Administrar categorías',
        icon: <CategoryIcon />,
        url: "/categories"
    },
    {
        id: 'Productos',
        description: 'Ver, eliminar, modificar los productos, etc...',
        icon: <Inventory2Icon />,
        url: "/products"
    },
    {
        id: 'Ventas',
        description: 'Consultar y realizar ventas',
        icon: <ShoppingCartIcon />,
        url: "/sales"
    },
]

export default function ListMenuItem() {
    const route = useRouter()

    return (
        <Box>
            {menuListItem.map(({ id, description, icon, url }) => {
                return <Box key={id}>
                    <Link href={url} passHref>
                        <ListItemButton
                            alignItems="flex-start"
                            sx={{
                                px: 3,
                                pt: 2.5,
                                pb: 2.5,
                            }}
                            selected={route.pathname === url}
                        >
                            <ListItemIcon sx={{ color: 'inherit' }}>
                                {icon}
                            </ListItemIcon>
                            <ListItemText
                                primary={id}
                                primaryTypographyProps={{
                                    fontSize: 15,
                                    fontWeight: 'medium',
                                    lineHeight: '20px',
                                    mb: '2px',
                                }}
                                secondary={description}
                                secondaryTypographyProps={{
                                    noWrap: true,
                                    fontSize: 12,
                                    lineHeight: '16px',
                                    color: 'rgba(255,255,255,0.5)',
                                }}
                                sx={{ my: 0 }}
                            />
                        </ListItemButton>
                    </Link>
                </Box>
            })}

        </Box>
    );
}
