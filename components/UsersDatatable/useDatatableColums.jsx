import React from "react"
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { dateFormat } from "../../utils/dateFormat";
import EditIcon from '@mui/icons-material/Edit';

export default function useDatatableColumns({ openEditDialogUser, openDeleteDialogUser }) {

    const columns = React.useMemo(() => [
        {
            name: "userProfile",
            label: " ",
            options: {
                customBodyRender: (val) => <Avatar alt={val} src={val} />
            }
        },
        {
            name: "username",
            label: "Nombre",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "email",
            label: "Contacto",
            options: {
                filter: true,
                sort: false
            }
        },
        {
            name: "userType",
            label: "Tipo usuario",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (val) => val == "1" ? "Usuario" : val == "2" ? "Cliente" : val == "3" ? "Administrador" : null
            }
        },
        {
            name: "createdAt",
            label: "Fecha creación",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => dateFormat(value)
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
                        <IconButton color="success" aria-label="Editar" onClick={() => openEditDialogUser(tableMeta.rowData)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="Eliminar" color="error" onClick={() => openDeleteDialogUser(tableMeta.rowData)}>
                            <DeleteIcon />
                        </IconButton>
                    </Stack>
                }
            }
        },
    ], [openEditDialogUser, openDeleteDialogUser])

    return columns
}