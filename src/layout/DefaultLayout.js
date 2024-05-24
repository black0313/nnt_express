import React, { useEffect } from 'react'
import { AppContent, AppSidebar, AppFooter, AppHeader } from '../components/index'

const DefaultLayout = () => {
  useEffect(() => {
    console.log(
      // location.href === 'http://localhost:3000/#/dashboard' ? console.log(13) : console.log(14),
      // location.href === 'http://localhost:3000/#/dashboard' ? console.log(13) : console.log(14),
      console.log(location),
    )
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
