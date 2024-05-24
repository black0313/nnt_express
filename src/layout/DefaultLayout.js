import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'
import { useNavigate } from 'react-router-dom'

const DefaultLayout = () => {
  const navigate = useNavigate();


  useEffect(() => {
    console.log(
      location.href === 'http://localhost:3000/dashboard' ? console.log(13) : console.log(14),
    )
    if (location.href == 'http://localhost:3000/dashboard') {
      navigate('/login')
      console.log(1333)
    }
  }, [])

  return (
    <div>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
    </div>
  )
}

export default DefaultLayout
