import React from "react"
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { dateFormat } from "../../utils/dateFormat";
import EditIcon from '@mui/icons-material/Edit';
import Image from "next/image";

export default function useDatatableColumns({ openEditDialogProduct, openDeleteDialogProduct }) {

    const columns = React.useMemo(() => [
        {
            name: "thumbnail",
            label: " ",
            options: {
                customBodyRender: (v) => {
                    var src = v === "/img/missing-available.jpg" || v === "" ? "/img/missing-available.jpg" : v
                    return <Avatar
                        sx={{ width: 60, height: 60 }}
                        variant="rounded"
                    >
                        <Image
                            src={src}
                            width={60}
                            height={60}
                            alt={v}
                        />
                    </Avatar>
                }
            }
        },
        {
            name: "name",
            label: "Nombre",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "categories",
            label: "Categoría",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (val) => val && val.length !== 0 && val[0].name
            }
        },
        {
            name: "price",
            label: "Precio",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "cost",
            label: "Costo",
            options: {
                filter: true,
                sort: true,
                display: false
            }
        },
        {
            name: "quantity",
            label: "Cantidad",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "qr",
            label: "Código",
            options: {
                filter: true,
                sort: false,
                display: false
            }
        },
        {
            name: "_id",
            label: "Acciones",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return <Stack direction="row" spacing={1}>
                        <IconButton color="success" aria-label="Editar" onClick={() => openEditDialogProduct(tableMeta.rowData)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="Eliminar" color="error" onClick={() => openDeleteDialogProduct(tableMeta.rowData)}>
                            <DeleteIcon />
                        </IconButton>
                    </Stack>
                }
            }
        },
    ], [openEditDialogProduct, openDeleteDialogProduct])

    return columns
}