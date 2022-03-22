import DashboardLayout from "../../components/DashboardLayout"
import Content from './Content'
import { getSession } from "next-auth/react";
import connectDB from "./../../middleware/mongoDB";
const User = require("./../../utils/models/user.model");

function Users({ users }) {
  return <DashboardLayout title="Usuarios">
    <Content users={users} />
  </DashboardLayout>
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx)
  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  connectDB()

  const users = await User.find({});
  return {
    props: {
      users: JSON.parse(JSON.stringify(users))
    }
  }
}

export default Users