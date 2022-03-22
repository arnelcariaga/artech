import React from "react"
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import DeleteIcon from '@mui/icons-material/Delete';
import { dateFormat } from "../../utils/dateFormat";
import EditIcon from '@mui/icons-material/Edit';

export default function useDatatableColumns({ openEditDialogCategory, openDeleteDialogCategory }) {

    const columns = React.useMemo(() => [
        {
            name: "name",
            label: "Nombre",
            options: {
                filter: true,
                sort: true
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
                        <IconButton color="success" aria-label="Editar" onClick={() => openEditDialogCategory(tableMeta.rowData)}>
                            <EditIcon />
                        </IconButton>
                        <IconButton aria-label="Eliminar" color="error" onClick={() => openDeleteDialogCategory(tableMeta.rowData)}>
                            <DeleteIcon />
                        </IconButton>
                    </Stack>
                }
            }
        },
    ], [openEditDialogCategory, openDeleteDialogCategory])

    return columns
}