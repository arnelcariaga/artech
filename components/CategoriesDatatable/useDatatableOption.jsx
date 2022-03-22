import React from "react"
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import CategoryIcon from '@mui/icons-material/Category';

export default function useDatatableOptions(users, setUser) {
    const [openDialog, setOpenDialog] = React.useState(false)
    const [disableRegisterBtn, setDisableRegisterBtn] = React.useState(false)
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [registerStatus, setRegisterStatus] = React.useState()
    const [openSnackError, setOpenSnackError] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const options = React.useMemo(() => {
        const opts = {
            filterType: 'checkbox',
            selectableRows: 'none',
            filter: false,
            tableId: "kasmdlakms9jfw0ecrmw0eirvme0",
            sortOrder: {
                name: "_id",
                direction: "desc"
            },
            textLabels: {
                body: {
                    noMatch: "Lo sentimos, no se encontraron resultados",
                    toolTip: "Sort",
                    columnHeaderTooltip: column => `Ordenar por ${column.label}`
                },
                pagination: {
                    next: "Página siguiente",
                    previous: "Página anterior",
                    rowsPerPage: "Filas por página:",
                    displayRows: "de",
                },
                toolbar: {
                    search: "Buscar",
                    downloadCsv: "Descargar CSV",
                    print: "Imprimir",
                    viewColumns: "Ver columnas",
                },
                viewColumns: {
                    title: "Mostrar columnas",
                }
            },
            customToolbar: () => {

                async function onSubmit(data) {
                    setDisableRegisterBtn(true)
                    const { name } = data

                    const response = await fetch('/api/addCategory', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            name
                        }),
                    })

                    const resData = await response.json()
                    if (resData.status === "error") {
                        setRegisterStatus(resData.error)
                        setOpenSnackError(true)
                        setDisableRegisterBtn(false)
                    } else {

                        users.unshift({
                            ...resData.data
                        })

                        setUser(users)

                        reset()
                        setOpenDialog(false)
                        setDisableRegisterBtn(false)
                    }
                }

                return <>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={() => setOpenDialog(true)}>
                        Agregar categor&iacute;a
                    </Button>
                    <Dialog
                        fullScreen={fullScreen}
                        open={openDialog}
                        onClose={() => setOpenDialog(false)}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">
                            Agregar categor&iacute;a
                        </DialogTitle>
                        <DialogContent>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { my: 1 },
                                }}
                                noValidate
                                autoComplete="off"
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <TextField
                                    id="name"
                                    label="Nombre de la categor&iacute;a"
                                    fullWidth
                                    autoFocus
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <CategoryIcon />
                                            </InputAdornment>
                                        )
                                    }}
                                    {...register("name", {
                                        required: "Campo obligatorio",
                                        maxLength: 15,
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
                                    <Button autoFocus onClick={() => setOpenDialog(false)}>
                                        Cancelar
                                    </Button>
                                    <Button variant="contained" type="submit" disabled={disableRegisterBtn}>
                                        Agregar
                                    </Button>
                                </DialogActions>
                            </Box>
                        </DialogContent>
                    </Dialog>
                </>
            }
        };

        return opts
    }, [disableRegisterBtn, errors.name, fullScreen, handleSubmit, openDialog, openSnackError, register, registerStatus, reset, setUser, users])

    return options
}