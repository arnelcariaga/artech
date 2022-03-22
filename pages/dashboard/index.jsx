import DashboardLayout from "../../components/DashboardLayout"
import Content from './Content'
import { getSession } from "next-auth/react";

function Dashboard() {
  return <DashboardLayout title="Panel de control">
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

export default Dashboard