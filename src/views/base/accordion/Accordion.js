import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from '@coreui/react'
import { DocsExample } from 'src/components'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import axios from 'axios'

const Accordion = () => {
  const [isModal, setIsModal] = useState(false)
  const [post, setPost] = useState({
    title: 'hey',
    body: '',
  })
  useEffect(() => {
    axios.get('http://192.168.100.11:8081/api/trucks').then((res) => {
      console.log(res)
    })
    axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
      console.log(res)
    })
  }, [])

  function send() {
    axios
      .post('http://192.168.100.11:8081/api/trucks', post, {
        header: { 'Content-Type': 'application/json' },
      })
      .then((r) => {
        post
      })
    console.log(post)
  }
  function handleInput(event) {
    // setPost({ ...post, [event.target.name]: event.target.value })
    setPost({ ...post, [event.target.name]: event.target.value })
  }
  const toggle = () => setIsModal(!isModal)
  return (
    <div>
      <h1>Truck List</h1>
      <div className="w-25 float-end mb-3">
        <button onClick={toggle} className={'btn btn-success w-100 text-light float-end'}>
          + Add
        </button>
      </div>
      <table className={'table table-bordered bg-primary table-hover cil-cursor'}>
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
      {
        <Modal isOpen={isModal} toggle={toggle} size={'lg'} scrollable={true}>
          <ModalHeader>
            <h3 className={'text-info '}>Add Truck</h3>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-6">
                <label htmlFor="truckNumber">* Truck Number</label>
                <input
                  type="text"
                  name={'truckNumber'}
                  className={'form-control'}
                  required={true}
                  onChange={handleInput}
                />
                <label htmlFor="numberOfLoads">Number Of Loads</label>
                <input type="text" className={'form-control'} />
                <label htmlFor="grossRevenue">Gross Revenue</label>
                <input type="text" className={'form-control'} />
                <label htmlFor="expires">Expires</label>
                <input type="text" className={'form-control'} />
              </div>
              <div className="col-6">
                <label htmlFor="miles">Miles</label>
                <input type="text" className={'form-control'} />
                <label htmlFor="emptyMiles">Empty Miles</label>
                <input type="text" className={'form-control'} />
                <label htmlFor="revenuePerMile">Revenue PerMile</label>
                <input type="text" className={'form-control'} />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <button onClick={send} className={'btn btn-success text-light w-25'}>
              Save
            </button>
            <button onClick={toggle} className={'btn btn-danger w-25 text-light'}>
              Exit
            </button>
          </ModalFooter>
        </Modal>
      }
    </div>
  )
}

export default Accordion
