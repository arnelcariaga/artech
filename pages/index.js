import React from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import Link from "next/link";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import MLink from "@mui/material/Link";
import { useForm } from "react-hook-form";
import JoinLayout from "../components/JoinLayout";
import Divider from "@mui/material/Divider";
import { useRouter } from "next/router";
import { signIn, getSession } from "next-auth/react";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [values, setValues] = React.useState({
    showPassword: false,
  });
  const [loginStatus, setLoginStatus] = React.useState();
  const [openSnackError, setOpenSnackError] = React.useState(false);
  const [disableLoginBtn, setDisableLoginBtn] = React.useState(false);
  const router = useRouter();

  const handleClickShowPassword = (e) => {
    e.preventDefault();
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  async function onSubmit(data) {
    setDisableLoginBtn(true);
    const { email, password } = data;

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (!result.error) {
      router.push("/dashboard");
    } else {
      setLoginStatus(result.error);
      setOpenSnackError(true);
      setDisableLoginBtn(false);
    }
  }

  return (
    <JoinLayout title="Iniciar sesi&oacute;n">
      <Box
        component="form"
        sx={{
          border: 1,
          borderColor: "divider",
          p: 2,
          "& > :not(style)": { my: 1 },
        }}
        noValidate
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          id="email"
          label="Correo electr&oacute;nico"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            ),
          }}
          {...register("email", {
            required: "Campo obligatorio",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Correo electrónico no es correcto",
            },
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
          type={values.showPassword ? "text" : "password"}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  sx={{
                    ml: 0,
                    pl: 0,
                    pr: 0,
                  }}
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
          {...register("password", {
            required: "Campo obligatorio",
            maxLength: 10,
            minLength: 6,
          })}
          variant="standard"
          error={errors.password && true}
          color={!errors.password ? "success" : ""}
          helperText={
            (errors.password && errors.password.message) ||
            (errors.password?.type === "maxLength" && (
              <span>M&aacute;ximo de car&aacute;cteres permitidos 10</span>
            )) ||
            (errors.password?.type === "minLength" && (
              <span>M&iacute;nimo de car&aacute;cteres permitidos 6</span>
            ))
          }
        />

        <Button
          variant="contained"
          endIcon={<LoginIcon />}
          fullWidth
          type="submit"
          disabled={disableLoginBtn}
        >
          Entrar al sistema
        </Button>

        <Link href="/register" passHref>
          <MLink>No tienes una cuenta ?</MLink>
        </Link>
        <Divider />
        <Link href="#" passHref>
          <MLink>Olvidaste la contrase&ntilde;a ?</MLink>
        </Link>

        <Snackbar
          open={openSnackError}
          autoHideDuration={3000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setOpenSnackError(false)}
        >
          <Alert
            onClose={() => setOpenSnackError(!openSnackError)}
            severity="error"
            sx={{ width: "100%" }}
          >
            {loginStatus}
          </Alert>
        </Snackbar>
      </Box>
    </JoinLayout>
  );
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

export default Login;
