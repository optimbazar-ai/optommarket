import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ChatWidget from './ChatWidget'
import InstallPWA from './InstallPWA'

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
      <ChatWidget />
      <InstallPWA />
    </div>
  )
}

export default Layout
