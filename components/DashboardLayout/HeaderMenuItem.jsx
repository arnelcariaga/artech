import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import Home from '@mui/icons-material/Home';
import ComputerIcon from '@mui/icons-material/Computer';
import { useRouter } from 'next/router';
import Link from 'next/link';

export default function HeaderMenuItem({ title }) {
    const route = useRouter()

    return (
        <>
            <ListItemButton sx={{ p: 3 }}>
                <ListItemIcon sx={{ fontSize: 20 }}><ComputerIcon /></ListItemIcon>
                <ListItemText
                    sx={{ my: 0 }}
                    primary="Artech"
                    primaryTypographyProps={{
                        fontSize: 20,
                        fontWeight: 'medium',
                        letterSpacing: 0,
                    }}
                />
            </ListItemButton>
            <Divider />
            <ListItem component="div" disablePadding>
                <Link href="/dashboard" passHref>
                    <ListItemButton sx={{ height: 56 }} selected={route.pathname === "/"}>
                        <ListItemIcon>
                            <Home color="primary" />
                        </ListItemIcon>
                        <ListItemText
                            primary="Panel de control"
                            primaryTypographyProps={{
                                color: 'primary',
                                fontWeight: 'medium',
                                variant: 'body2',
                            }}
                        />
                    </ListItemButton>
                </Link>
            </ListItem>
            <Divider />
        </>
    );
}
