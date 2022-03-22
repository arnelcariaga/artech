import Typography from "@mui/material/Typography"
import FavoriteIcon from '@mui/icons-material/Favorite';

function Footer() {
    return <Typography variant="body2">&copy; Artech {new Date().getFullYear()}. Developed with <FavoriteIcon color="error" fontSize="inherit" /> By Arnel Cariaga.</Typography>
}

export default Footer