import DashboardLayout from "../../components/DashboardLayout"
import Content from './Content'
import { getSession } from "next-auth/react";
import connectDB from "./../../middleware/mongoDB";
const Product = require("./../../utils/models/product.model");

function Products({ products }) {
  return <DashboardLayout title="Productos">
    <Content products={products} />
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

  const productCategories = await Product.aggregate([{
    $lookup: {
      from: "categorydatas",
      localField: "category",
      foreignField: "_id",
      as: "categories"
    }
  }, {
    $project: {
      category: 0, //exclude category field
    }
  }])

  return {
    props: {
      products: JSON.parse(JSON.stringify(productCategories))
    }
  }

}

export default Products