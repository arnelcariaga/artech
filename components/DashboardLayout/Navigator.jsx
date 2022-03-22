import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import HeaderMenuItem from './HeaderMenuItem';
import ListMenuItem from './ListMenuItem';

const Nav = styled(List)({
  '& .MuiListItemButton-root': {
    paddingLeft: 12,
    paddingRight: 24,
  },
  '& .MuiListItemIcon-root': {
    minWidth: 0,
    marginRight: 16,
  },
  '& .MuiSvgIcon-root': {
    fontSize: 20,
  },
});

export default function Navigator(props) {
  const { title, ...other } = props;

  return (
    <Drawer variant="permanent" {...other}>
      <Box sx={{ display: 'flex' }}>
        <ThemeProvider
          theme={createTheme({
            palette: {
              mode: 'dark',
              primary: { main: 'rgb(102, 157, 246)' },
              background: { paper: 'rgb(5, 30, 52)' },
            },
          })}
        >
          <Paper elevation={0} sx={{ maxWidth: 256, overflowX: 'hidden' }}>
            <Nav component="nav" disablePadding>
              <HeaderMenuItem />
              <ListMenuItem title={title} />
            </Nav>
          </Paper>
        </ThemeProvider>
      </Box>
    </Drawer>
  );
}
