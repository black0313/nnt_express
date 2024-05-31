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
      <table className={'table text-light table-bordered bg-dark table-hover cil-cursor'}>
        <thead>
          <th>#</th>
          <th>1</th>
          <th>2</th>
          <th>3</th>
          <th>3</th>
        </thead>
        <tbody>
          <td>#</td>
          <td>#</td>
          <td>#</td>
          <td>#</td>
          <td>#</td>
        </tbody>
      </table>
    </div>
  )
}

export default FormControl
