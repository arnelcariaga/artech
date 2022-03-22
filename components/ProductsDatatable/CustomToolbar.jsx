import React from "react"
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DescriptionIcon from '@mui/icons-material/Description';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import Stack from '@mui/material/Stack';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import NumberFormat from 'react-number-format';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useForm } from "react-hook-form";
import Image from "next/image";
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';

const NumberFormatCustom = React.forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;
    return <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={values => {
            onChange({
                target: {
                    name: props.name,
                    value: values.value
                }
            });
        }}
        thousandSeparator
    // isNumericString
    />
});

function CustomToolbar({ products, setProduct }) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [openDialog, setOpenDialog] = React.useState(false)
    const [disableRegisterBtn, setDisableRegisterBtn] = React.useState(false)
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();
    const [registerStatus, setRegisterStatus] = React.useState()
    const [price, setPrice] = React.useState()
    const [cost, setCost] = React.useState()
    const [openSnackError, setOpenSnackError] = React.useState(false);
    const [categories, setCategories] = React.useState([]);
    const [selectPT, setSelectPT] = React.useState("/img");
    const [pTData, setPTData] = React.useState("");

    React.useEffect(() => {
        async function fetchCategoriesFunc() {
            const fetchCategories = await fetch("http://localhost:3000/api/allCategories")
            const { data } = await fetchCategories.json()
            setCategories(data)
        }
        fetchCategoriesFunc()
    }, [])

    const onChangePrice = (e) => {
        const { value } = e.target
        setPrice(value);
    }

    const onChangeCost = (e) => {
        const { value } = e.target
        setCost(value);
    }

    const onChangePT = (e) => {
        let file = e.target.files[0]
        const picturePreview = URL.createObjectURL(file)
        setSelectPT(picturePreview)
        setPTData(file)
    }

    const deleteProductThumbnail = () => {
        setSelectPT("/img")
        setPTData("/img/missing-available.jpg")
    }

    async function onSubmit(data) {
        setDisableRegisterBtn(true)
        let myData = {
            ...data,
            thumbnail: pTData
        }

        var fd = new FormData();

        for (let index = 0; index < 8; index++) {
            var name = Object.keys(myData)[index]
            var value = myData[Object.keys(myData)[index]]
            fd.append(name, value)
        }

        const response = await fetch('/api/addProduct', {
            method: 'POST',
            body: fd,
        })

        const resData = await response.json()

        if (resData.status === "error") {
            setRegisterStatus(resData.msg)
            setOpenSnackError(true)
            setDisableRegisterBtn(false)
        } else {

            products.unshift({
                _id: resData.data._id,
                ...resData.data
            })

            setProduct(products)

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
            Agregar producto
        </Button>
        <Dialog
            fullScreen={fullScreen}
            open={openDialog}
            onClose={() => setOpenDialog(false)}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">
                Agregar producto
            </DialogTitle>
            <DialogContent>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { my: 1.5 },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                >

                    <Stack direction="row" spacing={3} sx={{ alignItems: "center", justifyContent: "center" }}>
                        <label htmlFor="contained-button-file">
                            <input accept="image/*" id="contained-button-file" type="file" hidden onChange={onChangePT} onClick={(e) => e.target.value = null} />
                            <Button variant="contained" component="span">
                                {selectPT === "/img" ? "Subir imagen del producto" : "Cambiar imagen"}
                            </Button>
                        </label>

                        {
                            selectPT === "/img" ? null :
                                <Badge
                                    overlap="circular"
                                    badgeContent={
                                        <IconButton
                                            aria-label="Editar"
                                            sx={{ bgcolor: "#fff", p: 0, ":hover": { bgcolor: "#fff" } }}
                                            onClick={deleteProductThumbnail}
                                        >
                                            <ClearIcon
                                                color="error"
                                            />
                                        </IconButton>
                                    }
                                >
                                    <Avatar
                                        sx={{ width: 125, height: 125 }}
                                        variant="square"
                                    >
                                        <Image
                                            src={selectPT}
                                            width={125}
                                            height={125}
                                            alt=""
                                        />
                                    </Avatar>
                                </Badge>


                        }
                    </Stack>

                    <TextField
                        id="name"
                        label="Nombre del producto"
                        fullWidth
                        autoFocus
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <NoteAltIcon />
                                </InputAdornment>
                            )
                        }}
                        {...register("name", {
                            required: "Campo obligatorio",
                            maxLength: 500,
                        })}
                        variant="standard"
                        error={errors.name && true}
                        color={!errors.name ? "success" : ""}
                        helperText={
                            errors.name &&
                            errors.name.message ||
                            errors.name?.type === "maxLength" && "Máximo de carácteres permitidos 500"
                        }

                    />

                    <TextField
                        id="price"
                        label="Precio para vender el producto"
                        fullWidth
                        value={price}
                        onChange={onChangePrice}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AttachMoneyIcon />
                                </InputAdornment>
                            ),
                            inputComponent: NumberFormatCustom
                        }}
                        {...register("price", {
                            required: "Campo obligatorio",
                            maxLength: 200,
                        })}
                        variant="standard"
                        error={errors.price && true}
                        color={!errors.price ? "success" : ""}
                        helperText={
                            errors.price &&
                            errors.price.message ||
                            errors.price?.type === "maxLength" && "Máximo de carácteres permitidos 200"
                        }
                    />

                    <TextField
                        id="cost"
                        label="Costo del producto"
                        fullWidth
                        value={cost}
                        onChange={onChangeCost}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AttachMoneyIcon />
                                </InputAdornment>
                            ),
                            inputComponent: NumberFormatCustom
                        }}
                        {...register("cost", {
                            required: "Campo obligatorio",
                            maxLength: 200,
                        })}
                        variant="standard"
                        error={errors.cost && true}
                        color={!errors.cost ? "success" : ""}
                        helperText={
                            errors.cost &&
                            errors.cost.message ||
                            errors.cost?.type === "maxLength" && "Máximo de carácteres permitidos 200"
                        }
                    />

                    <TextField
                        id="quantity"
                        label="Cantidad del producto disponible"
                        fullWidth
                        type="number"
                        defaultValue={0}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <ProductionQuantityLimitsIcon />
                                </InputAdornment>
                            )
                        }}
                        {...register("quantity", {
                            required: "Campo obligatorio",
                            maxLength: 200,
                        })}
                        variant="standard"
                        error={errors.quantity && true}
                        color={!errors.quantity ? "success" : ""}
                        helperText={
                            errors.quantity &&
                            errors.quantity.message ||
                            errors.quantity?.type === "maxLength" && "Máximo de carácteres permitidos 200"
                        }
                    />

                    <TextField
                        id="qr"
                        label="Codigo de barras"
                        fullWidth
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <QrCode2Icon />
                                </InputAdornment>
                            )
                        }}
                        {...register("qr", {
                            maxLength: 50,
                        })}
                        variant="standard"
                        error={errors.qr && true}
                        color={!errors.qr ? "success" : ""}
                        helperText={
                            errors.qr &&
                            errors.qr?.type === "maxLength" && "Máximo de carácteres permitidos 50"
                        }
                    />

                    <FormControl fullWidth>
                        <InputLabel variant="standard" htmlFor="uncontrolled-native">
                            Categor&iacute;a
                        </InputLabel>
                        <NativeSelect
                            inputProps={{
                                name: 'category',
                                id: 'uncontrolled-native',
                            }}
                            {...register("category", {
                                required: "Campo obligatorio",
                            })}
                            error={errors.category && true}
                            color={!errors.category ? "success" : ""}
                            helperext={errors.category && errors.category.message}
                        >
                            {
                                categories.length === 0
                                    ?
                                    <span>kklk</span>
                                    :
                                    categories.map(({ _id, name }) => <option key={_id} value={_id}>{name}</option>)
                            }
                        </NativeSelect>
                    </FormControl>

                    <TextField
                        id="standard-multiline-static"
                        label="Descripci&oacute;n del producto"
                        multiline
                        fullWidth
                        rows={4}
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <DescriptionIcon />
                                </InputAdornment>
                            )
                        }}
                        {...register("description")}
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

export default CustomToolbar