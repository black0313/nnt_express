import React from 'react'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CForm,
  CFormInput,
  CFormLabel,
  CFormTextarea,
  CRow,
} from '@coreui/react'
import { DocsExample } from 'src/components'

const FormControl = () => {
  return (
    <div>
      <h1>Account list</h1>
      <div className="w-25 float-end mb-3">
        {/*<button onClick={toggle} className={'btn btn-success w-100 text-light float-end'}>*/}
        {/*  + Add*/}
        {/*</button>*/}
      </div>
      <table className={'table rounded text-light bg-primary table-hover table-striped'}>
        <thead>
          <th className={'text-center'}>T/R</th>
          <th className={'text-center'}>Number Truck</th>
          <th className={'text-center'}>Number of load</th>
          <th className={'text-center'}>Gross Revenue</th>
          <th className={'text-center'}>Miles</th>
          <th className={'text-center'}>Dead Head</th>
          <th className={'text-center'}>Revenue Per Mile</th>
        </thead>
        <hr />
        <tbody></tbody>
      </table>
    </div>
  )
}

export default FormControl
