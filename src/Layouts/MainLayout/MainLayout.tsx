import  Footer  from '../../Components/Footer/Footer'
import { Header } from '../../Components/Header/Header'

interface Props {
  children: React.ReactNode
}

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}

export default MainLayout
