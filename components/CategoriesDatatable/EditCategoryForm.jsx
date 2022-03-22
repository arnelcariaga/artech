import React from "react"
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import CategoryIcon from '@mui/icons-material/Category';

function EditCategoryForm({ tableData, setOpenDialog, selectedCategoryId, setNewTableData }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [disableRegisterBtn, setDisableRegisterBtn] = React.useState(false)
    const [registerStatus, setRegisterStatus] = React.useState()
    const [openSnackError, setOpenSnackError] = React.useState(false);

    async function onSubmit(data) {
        setDisableRegisterBtn(true)
        const { name } = data

        const response = await fetch('/api/updateCategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
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
            setNewTableData({
                _id: selectedCategoryId,
                ...data
            })
        }
    }

    return <Box
        component="form"
        sx={{
            '& > :not(style)': { my: 1 },
        }}
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
    >
        <TextField
            id="name"
            label="Nombre de usuario"
            fullWidth
            defaultValue={tableData[0]}
            autoFocus
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <CategoryIcon />
                    </InputAdornment>
                ),
            }}
            {...register("name", {
                required: "Campo obligatorio",
                maxLength: 15
            })}
            variant="standard"
            error={errors.name && true}
            color={!errors.name ? "success" : ""}
            helperText={
                errors.name &&
                errors.name.message ||
                errors.name?.type === "maxLength" && "Máximo de carácteres permitidos 15"
            }

        />

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
        <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>
                Cancelar
            </Button>
            <Button variant="contained" type="submit" disabled={disableRegisterBtn}>
                Agregar
            </Button>
        </DialogActions>
    </Box>
}

export default EditCategoryForm