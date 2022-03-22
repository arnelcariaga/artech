import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


function DialogDeleteCategory({ openDeleteDialog, setOpenDialog, tableData, selectedCategoryId, setNewTableDataDeleted }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [disableRegisterBtn, setDisableRegisterBtn] = React.useState(false)
    const [registerStatus, setRegisterStatus] = React.useState()
    const [openSnackError, setOpenSnackError] = React.useState(false);


    const deleteFunc = async () => {
        setDisableRegisterBtn(true)

        const response = await fetch('/api/deleteCategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                selectedCategoryId
            }),
        })

        const resData = await response.json()

        if (resData.status === "error") {
            setRegisterStatus(resData.msg)
            setOpenSnackError(true)
            setDisableRegisterBtn(false)
        } else {
            setOpenDialog(false)
            setNewTableDataDeleted(tableData)
            setDisableRegisterBtn(false)
        }

    }

    return <Dialog
        fullScreen={fullScreen}
        open={openDeleteDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="responsive-dialog-title"
    >
        <DialogTitle id="responsive-dialog-title" color="error">
            ¿Estas segur@ que quieres eliminar la categor&iacute;a {tableData[0]} ?
            Esta acci&oacute;n no se puede deshacer.
        </DialogTitle>
        <DialogContent>
            <DialogActions>
                <Button onClick={() => setOpenDialog(false)}>
                    Cancelar
                </Button>
                <Button variant="contained" type="submit" disabled={disableRegisterBtn} color="error" onClick={deleteFunc}>
                    Eliminar
                </Button>
            </DialogActions>
        </DialogContent>

        <Snackbar
            open={openSnackError}
            autoHideDuration={3000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={() => setOpenSnackError(false)}
        >
            <Alert onClose={() => setOpenSnackError(!openSnackError)} severity="error" sx={{ width: '100%' }}>
                {registerStatus}
            </Alert>
        </Snackbar>

    </Dialog>
}

export default DialogDeleteCategory