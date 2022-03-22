import DashboardLayout from "../../components/DashboardLayout"
import Content from './Content'
import { getSession } from "next-auth/react";

function Sales() {
  return <DashboardLayout title="Ventas">
    <Content />
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
  return {
    props: {}
  }
}

export default Sales