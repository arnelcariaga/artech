import React from "react"
import Paper from '@mui/material/Paper';
import MUIDataTable from "mui-datatables";
import useDatatableOptions from "../../components/ProductsDatatable/useDatatableOption";
import useDatatableColumns from "../../components/ProductsDatatable/useDatatableColums";
import DialogEditProduct from "../../components/ProductsDatatable/DialogEditProduct"
import DialogDeleteProduct from "../../components/ProductsDatatable/DialogDeleteProduct"

export default function Content({ products }) {
  const [data, setData] = React.useState([])
  const [openEditDialog, setOpenEditDialog] = React.useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
  const [tableData, setTableData] = React.useState([])
  const [selectedProductId, setSelectedProduct] = React.useState()
  const setProduct = (product) => setData(product)

  React.useEffect(() => setData(products), [products])

  const openEditDialogProduct = (tableMeta) => {
    setSelectedProduct(tableMeta[1])
    setTableData(tableMeta)
    setOpenEditDialog(true)
  }

  const openDeleteDialogProduct = (tableMeta) => {
    setSelectedProduct(tableMeta[1])
    setTableData(tableMeta)
    setOpenDeleteDialog(true)
  }

  const setNewTableData = (currentTableData) => {
    const newProduct = products.map(p =>
      p._id === selectedProductId
        ? { ...p, ...currentTableData }
        : p
    )
    setData(newProduct)
  }

  const setNewTableDataDeleted = (currentTableData) => {
    var cId = currentTableData[1]
    const newUser = data.filter(p => p._id !== cId)
    setData(newUser)
  }

  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <MUIDataTable
        title="Lista de todos los productos"
        data={data}
        columns={useDatatableColumns({ openEditDialogProduct, openDeleteDialogProduct })}
        options={useDatatableOptions(products, setProduct)}
      />
      <DialogEditProduct openEditDialog={openEditDialog} setOpenDialog={(val) => setOpenEditDialog(val)} tableData={tableData} selectedProductId={selectedProductId} setNewTableData={(data) => setNewTableData(data)} />
      <DialogDeleteProduct openDeleteDialog={openDeleteDialog} setOpenDialog={(val) => setOpenDeleteDialog(val)} tableData={tableData} selectedProductId={selectedProductId} setNewTableDataDeleted={(data) => setNewTableDataDeleted(data)} />
    </Paper>
  );
}
