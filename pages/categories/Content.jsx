import React from "react"
import Paper from '@mui/material/Paper';
import MUIDataTable from "mui-datatables";
import useDatatableOptions from "../../components/CategoriesDatatable/useDatatableOption";
import useDatatableColumns from "../../components/CategoriesDatatable/useDatatableColums";
import DialogEditCategory from "../../components/CategoriesDatatable/DialogEditCategory"
import DialogDeleteCategory from "../../components/CategoriesDatatable/DialogDeleteCategory"

export default function Content({ categories }) {
  const [data, setData] = React.useState([])
  const [openEditDialog, setOpenEditDialog] = React.useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
  const [tableData, setTableData] = React.useState([])
  const [selectedCategoryId, setSelectedCategoryId] = React.useState()
  const setUser = (category) => setData(category)

  React.useEffect(() => setData(categories), [categories])

  const openEditDialogCategory = (tableMeta) => {
    setSelectedCategoryId(tableMeta[1])
    setTableData(tableMeta)
    setOpenEditDialog(true)
  }

  const openDeleteDialogCategory = (tableMeta) => {
    setSelectedCategoryId(tableMeta[1])
    setTableData(tableMeta)
    setOpenDeleteDialog(true)
  }

  const setNewTableData = (currentTableData) => {
    const newCategory = categories.map(p =>
      p._id === selectedCategoryId
        ? { ...p, ...currentTableData }
        : p
    )
    setData(newCategory)
  }

  const setNewTableDataDeleted = (currentTableData) => {
    var cId = currentTableData[1]
    const newUser = data.filter(p => p._id !== cId)
    setData(newUser)
  }

  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <MUIDataTable
        title="Lista de todas las categor&iacute;as"
        data={data}
        columns={useDatatableColumns({ openEditDialogCategory, openDeleteDialogCategory })}
        options={useDatatableOptions(categories, setUser)}
      />
      <DialogEditCategory openEditDialog={openEditDialog} setOpenDialog={(val) => setOpenEditDialog(val)} tableData={tableData} selectedCategoryId={selectedCategoryId} setNewTableData={(data) => setNewTableData(data)} />
      <DialogDeleteCategory openDeleteDialog={openDeleteDialog} setOpenDialog={(val) => setOpenDeleteDialog(val)} tableData={tableData} selectedCategoryId={selectedCategoryId} setNewTableDataDeleted={(data) => setNewTableDataDeleted(data)} />
    </Paper>
  );
}
