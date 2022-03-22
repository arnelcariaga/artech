import React from "react"
import Paper from '@mui/material/Paper';
import MUIDataTable from "mui-datatables";
import useDatatableOptions from "../../components/UsersDatatable/useDatatableOption";
import useDatatableColumns from "../../components/UsersDatatable/useDatatableColums";
import DialogEditUser from "../../components/UsersDatatable/DialogEditUser"
import DialogDeleteUser from "../../components/UsersDatatable/DialogDeleteUser";

function Content({ users }) {
  const [openEditDialog, setOpenEditDialog] = React.useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false)
  const [tableData, setTableData] = React.useState([])
  const [selectedUserId, setSelectedUserId] = React.useState()
  const [data, setData] = React.useState([])
  const setUser = (user) => setData(user)

  React.useEffect(() => setData(users), [users])

  const openEditDialogUser = (tableMeta) => {
    setSelectedUserId(tableMeta[5])
    setTableData(tableMeta)
    setOpenEditDialog(true)
  }

  const openDeleteDialogUser = (tableMeta) => {
    setSelectedUserId(tableMeta[5])
    setTableData(tableMeta)
    setOpenDeleteDialog(true)
  }

  const setNewTableData = (currentTableData) => {
    const newUser = users.map(p =>
      p._id === selectedUserId
        ? { ...p, ...currentTableData }
        : p
    )
    setData(newUser)
  }

  const setNewTableDataDeleted = (currentTableData) => {
    var uId = currentTableData[5]
    const newUser = data.filter(p => p._id !== uId)
    setData(newUser)
  }

  return (
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <MUIDataTable
        title="Lista de todos los usuarios"
        data={data}
        columns={useDatatableColumns({ openEditDialogUser, openDeleteDialogUser })}
        options={useDatatableOptions(users, setUser)}
      />
      <DialogEditUser openEditDialog={openEditDialog} setOpenDialog={(val) => setOpenEditDialog(val)} tableData={tableData} selectedUserId={selectedUserId} setNewTableData={(data) => setNewTableData(data)} />
      <DialogDeleteUser openDeleteDialog={openDeleteDialog} setOpenDialog={(val) => setOpenDeleteDialog(val)} tableData={tableData} selectedUserId={selectedUserId} setNewTableDataDeleted={(data) => setNewTableDataDeleted(data)} />
    </Paper>
  );
}

export default Content