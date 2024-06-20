import React, { useEffect, useState } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useNavigate } from 'react-router-dom'

const DefaultLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    // console.log(
    //   location.href === 'http://localhost:3000/dashboard' ? console.log(13) : console.log(14),
    // )
    // if (location.href == 'http://localhost:3000/dashboard') {
    //   navigate('/login')
    //   console.log(1333)
    // }
  }, [])

  return (
    <div>
      <AppSidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
