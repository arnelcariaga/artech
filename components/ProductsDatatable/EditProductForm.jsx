import React from "react"
import { useForm } from "react-hook-form";
import Button from '@mui/material/Button';
import DialogActions from '@mui/material/DialogActions';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import QrCode2Icon from '@mui/icons-material/QrCode2';
import DescriptionIcon from '@mui/icons-material/Description';
import Stack from '@mui/material/Stack';
import Image from "next/image";
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import NumberFormatCustom from "../../utils/NumberFormatCustom";

function EditProductForm({ tableData, setOpenDialog, selectedCategoryId, setNewTableData }) {
    console.log(tableData)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [disableRegisterBtn, setDisableRegisterBtn] = React.useState(false)
    const [registerStatus, setRegisterStatus] = React.useState()
    const [openSnackError, setOpenSnackError] = React.useState(false);

    const [price, setPrice] = React.useState(tableData[3])
    const [cost, setCost] = React.useState(tableData[4])
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
            defaultValue={tableData[1]}
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
            defaultValue={tableData[5]}
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
            defaultValue={tableData[6]}
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
                defaultValue={tableData[7]}
                color={!errors.category ? "success" : ""}
                helperext={errors.category && errors.category.message}
            >
                {
                    categories.length === 0
                        ?
                        null
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
            <Button onClick={() => setOpenDialog(false)}>
                Cancelar
            </Button>
            <Button variant="contained" type="submit" disabled={disableRegisterBtn}>
                Agregar
            </Button>
        </DialogActions>
    </Box>
}

export default EditProductForm