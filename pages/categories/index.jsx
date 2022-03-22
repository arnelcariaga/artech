import DashboardLayout from "../../components/DashboardLayout"
import Content from './Content'
import { getSession } from "next-auth/react";
import connectDB from "./../../middleware/mongoDB";
const Category = require("./../../utils/models/category.model");

function Categories({ categories }) {
  return <DashboardLayout title="Categor&iacute;as">
    <Content categories={categories} />
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

  const categories = await Category.find({});
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories))
    }
  }
}

export default Categories