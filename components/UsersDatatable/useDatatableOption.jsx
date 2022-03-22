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
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

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
                name: "createdAt",
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
                    const { username, email, password, userType } = data

                    const response = await fetch('/api/auth/register', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            username,
                            email,
                            password,
                            userType: Number(userType),
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
                        Agregar usuario
                    </Button>
                    <Dialog
                        fullScreen={fullScreen}
                        open={openDialog}
                        onClose={() => setOpenDialog(false)}
                        aria-labelledby="responsive-dialog-title"
                    >
                        <DialogTitle id="responsive-dialog-title">
                            Agregar usuario
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
                                    label="Nombre de usuario"
                                    fullWidth
                                    autoFocus
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <AccountCircle />
                                            </InputAdornment>
                                        )
                                    }}
                                    {...register("username", {
                                        required: "Campo obligatorio",
                                        maxLength: 20,
                                        minLength: 5
                                    })}
                                    variant="standard"
                                    error={errors.username && true}
                                    color={!errors.username ? "success" : ""}
                                    helperText={
                                        errors.username &&
                                        errors.username.message ||
                                        errors.username?.type === "maxLength" && "Máximo de carácteres permitidos 20" ||
                                        errors.username?.type === "minLength" && "Mínimo de carácteres permitidos 5"
                                    }

                                />
                                <TextField
                                    id="email"
                                    label="Correo electr&oacute;nico"
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <ContactMailIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    {...register("email", {
                                        required: "Campo obligatorio",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: 'Correo electrónico no es correcto'
                                        }
                                    })}
                                    variant="standard"
                                    error={errors.email && true}
                                    color={!errors.email ? "success" : ""}
                                    helperText={errors.email && errors.email.message}
                                />
                                <TextField
                                    id="password"
                                    label="Contrase&ntilde;a"
                                    fullWidth
                                    type='password'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    {...register("password", {
                                        required: "Campo obligatorio",
                                        maxLength: 10,
                                        minLength: 6
                                    })}
                                    variant="standard"
                                    error={errors.password && true}
                                    color={!errors.password ? "success" : ""}
                                    helperText={
                                        errors.password &&
                                        errors.password.message ||
                                        errors.password?.type === "maxLength" && "Máximo de carácteres permitidos 10" ||
                                        errors.password?.type === "minLength" && "Mínimo de carácteres permitidos 6"
                                    }
                                />

                                <TextField
                                    id="repeatPassword"
                                    label="Repita la contrase&ntilde;a"
                                    fullWidth
                                    type='password'
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <LockIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    {...register("repeatPassword", {
                                        required: "Campo obligatorio",
                                        validate: (value) => value === watch('password') || "Las contraseñas no coinciden",
                                        maxLength: 10,
                                        minLength: 6
                                    })}
                                    variant="standard"
                                    error={errors.repeatPassword && true}
                                    color={!errors.repeatPassword ? "success" : ""}
                                    helperText={
                                        errors.repeatPassword && errors.repeatPassword.message ||
                                        errors.repeatPassword?.type === "maxLength" && "Máximo de carácteres permitidos 10" ||
                                        errors.repeatPassword?.type === "minLength" && "Mínimo de carácteres permitidos 6"
                                    }
                                />

                                <FormControl fullWidth>
                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Tipo de usuario
                                    </InputLabel>
                                    <NativeSelect
                                        inputProps={{
                                            name: 'userType',
                                            id: 'uncontrolled-native',
                                        }}
                                        {...register("userType", {
                                            required: "Campo obligatorio",
                                        })}
                                        error={errors.userType && true}
                                        color={!errors.userType ? "success" : ""}
                                        helpertext={errors.userType && errors.userType.message}
                                    >
                                        <option value={1}>Usuario</option>
                                        <option value={2}>Cliente</option>
                                        <option value={3}>Administrador</option>
                                    </NativeSelect>
                                </FormControl>

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
    }, [disableRegisterBtn, errors.email, errors.password, errors.repeatPassword, errors.userType, errors.username, fullScreen, handleSubmit, openDialog, openSnackError, register, registerStatus, reset, setUser, users, watch])

    return options
}