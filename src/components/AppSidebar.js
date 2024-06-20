import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'

import { logo } from 'src/assets/brand/logo'
import { sygnet } from 'src/assets/brand/sygnet'

// sidebar nav config
import navigation from '../_nav'

const AppSidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebarShow)

  return (
    <CSidebar
      className="border-end"
      // colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarOpen}
      onVisibleChange={(visible) => {
        setSidebarOpen(visible)
      }}
    >
      <CSidebarHeader className="border-bottom">
        <img
          style={{ width: '50px', height: '50px' }}
          src="https://as1.ftcdn.net/v2/jpg/04/33/16/10/1000_F_433161079_0XUHPHcv0nzzyk3w7bgXDDrLtlrDn5Cd.jpg"
          alt=""
        />
        <h6 className={'ms-3'}>NNT EXPRESS</h6>
        {/*<CSidebarBrand className={'text-decoration-underline'} to="/">*/}
        {/*  <h4 className={'form-control'}>NNT EXPRESS</h4>*/}
        {/*  /!*<CIcon customClassName="sidebar-brand-narrow" icon={sygnet} height={32} />*!/*/}
        {/*</CSidebarBrand>*/}
        <CCloseButton className="d-lg-none" dark onClick={() => setSidebarOpen(false)} />
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler onClick={() => setSidebarOpen(false)} />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
