import React from "react"
import { getSession } from "next-auth/react";
import JoinLayout from "./../../components/JoinLayout"
import MLink from "@mui/material/Link"
import Link from "next/link";
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useForm } from "react-hook-form";
import { useRouter } from "next/router"

function Register() {
    const [disableRegisterBtn, setDisableRegisterBtn] = React.useState(false)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [registerStatus, setRegisterStatus] = React.useState()
    const [openSnackError, setOpenSnackError] = React.useState(false);
    const router = useRouter()

    async function onSubmit(data) {
        setDisableRegisterBtn(true)
        const { username, email, password } = data
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                email,
                password,
                userType: 1
            }),
        })

        const resData = await response.json()
        if (resData.status === "error") {
            setRegisterStatus(resData.error)
            setOpenSnackError(true)
            setDisableRegisterBtn(false)
        } else {
            alert("Registro con éxito")
            router.push('/')
        }
    }

    return <JoinLayout title="Reg&iacute;strate">
        <Box
            component="form"
            sx={{
                border: 1,
                borderColor: "divider",
                p: 2,
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
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <AccountCircle />
                        </InputAdornment>
                    ),
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
                    errors.username?.type === "maxLength" && <span>M&aacute;ximo de car&aacute;cteres permitidos 20</span> ||
                    errors.username?.type === "minLength" && <span>M&iacute;nimo de car&aacute;cteres permitidos 5</span>
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
                    errors.password?.type === "maxLength" && <span>M&aacute;ximo de car&aacute;cteres permitidos 10</span> ||
                    errors.password?.type === "minLength" && <span>M&iacute;nimo de car&aacute;cteres permitidos 6</span>
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
                    errors.repeatPassword?.type === "maxLength" && <span>M&aacute;ximo de car&aacute;cteres permitidos 10</span> ||
                    errors.repeatPassword?.type === "minLength" && <span>M&iacute;nimo de car&aacute;cteres permitidos 6</span>
                }
            />

            <Button variant="contained" endIcon={<AppRegistrationIcon />} fullWidth type="submit" disabled={disableRegisterBtn}>
                Registrarme
            </Button>

            <Link href="/" passHref>
                <MLink>Ya tienes una cuenta ?</MLink>
            </Link>

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
        </Box>
    </JoinLayout>
}

export async function getServerSideProps(ctx) {
    const session = await getSession(ctx);
    if (session) {
        return {
            redirect: {
                destination: "/dashboard",
                permanent: false,
            },
        };
    }
    return {
        props: {},
    };
}

export default Register