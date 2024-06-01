import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
function Colors(props) {
  useEffect(() => {
    console.log(location)
    axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
      console.log(res.data)
    })
  }, [])
  const [isModal, setIsModal] = useState(false)
  const toggle = () => setIsModal(!isModal)
  return (
    <div>
      <h1>User List</h1>

      <div className="w-25 float-end mb-3">
        <button onClick={toggle} className={'btn btn-success w-100 text-light float-end'}>
          + Add
        </button>
      </div>
      <table className={'table rounded text-light bg-primary table-hover table-striped'}>
        <thead>
          <th className={'text-center'}>T/R</th>
          <th className={'text-center'}>Name</th>
          <th className={'text-center'}>Dispatch team</th>
          <th className={'text-center'}>Gross Revenue</th>
          <th className={'text-center'}>Miles</th>
          <th className={'text-center'}>Dead Head</th>
          <th className={'text-center'}>Revenue Per Mile</th>
        </thead>
        <hr />
        <tbody></tbody>
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
                <input type="text" className={'form-control'} required={true} />
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
            <button className={'btn btn-success text-light w-25'}>Save</button>
            <button onClick={toggle} className={'btn btn-danger w-25 text-light'}>
              Exit
            </button>
          </ModalFooter>
        </Modal>
      }
    </div>
  )
}

export default Colors
