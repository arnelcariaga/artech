import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import EditUserForm from "./EditUserForm"


function DialogEditUser({ openEditDialog, setOpenDialog, tableData, selectedUserId, setNewTableData }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    return <Dialog
        fullScreen={fullScreen}
        open={openEditDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="responsive-dialog-title"
    >
        <DialogTitle id="responsive-dialog-title">
            Editar usuario
        </DialogTitle>
        <DialogContent>
            <EditUserForm tableData={tableData} setOpenDialog={(val) => setOpenDialog(val)} selectedUserId={selectedUserId} setNewTableData={(data) => setNewTableData(data)} />
        </DialogContent>
    </Dialog>
}

export default DialogEditUser