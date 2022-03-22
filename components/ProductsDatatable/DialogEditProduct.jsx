import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import EditProductForm from "./EditProductForm"


function DialogEditProduct({ openEditDialog, setOpenDialog, tableData, selectedCategoryId, setNewTableData }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return <Dialog
        fullScreen={fullScreen}
        open={openEditDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="responsive-dialog-title"
    >
        <DialogTitle id="responsive-dialog-title">
            Editar categor&iacute;a
        </DialogTitle>
        <DialogContent>
            <EditProductForm tableData={tableData} setOpenDialog={(val) => setOpenDialog(val)} selectedCategoryId={selectedCategoryId} setNewTableData={(data) => setNewTableData(data)} />
        </DialogContent>
    </Dialog>
}

export default DialogEditProduct