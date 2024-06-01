import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import axios from 'axios'
import { connect } from 'react-redux'
import TruckReducer, {
  addTrucks,
  deleteTrucks,
  editTrucks,
  getTrucks,
} from 'src/reducer/TruckReducer'

// eslint-disable-next-line react/prop-types
const Accordion = ({ TruckReducer, addTrucks, editTrucks, deleteTrucks, getTrucks }) => {
  const [isModal, setIsModal] = useState(false)
  const [post, setPost] = useState([])
  useEffect(() => {
    getTrucks()
  }, [])

  function send() {
    // addTrucks({
    //   numberOfLoads: 222,
    //   truckNumber: '2',
    //   grossRevenue: 13,
    //   miles: 33,
    //   emptyMiles: 0,
    //   revenuePerMile: 1,
    //   expires: true,
    // })
    console.log(post)
  }
  function handleInput(event) {
    // setPost({ ...post, [event.target.name]: event.target.value })
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
                  onChange={(event) =>
                    setPost({ ...post, [event.target.name]: event.target.value })
                  }
                />
                <label htmlFor="numberOfLoads">Number Of Loads</label>
                <input
                  type="text"
                  className={'form-control'}
                  name={'numberOfLoads'}
                  onChange={(event) =>
                    setPost({ ...post, [event.target.name]: event.target.value })
                  }
                />
                <label htmlFor="grossRevenue">Gross Revenue</label>
                <input
                  name={'grossRevenue'}
                  onChange={(event) =>
                    setPost({ ...post, [event.target.name]: event.target.value })
                  }
                  type="text"
                  className={'form-control'}
                />
                <label htmlFor="expires">Expires</label>
                <input
                  name={'expires'}
                  onChange={(event) =>
                    setPost({ ...post, [event.target.name]: event.target.value })
                  }
                  type="text"
                  className={'form-control'}
                />
              </div>
              <div className="col-6">
                <label htmlFor="miles">Miles</label>
                <input
                  name={'miles'}
                  onChange={(event) =>
                    setPost({ ...post, [event.target.name]: event.target.value })
                  }
                  type="text"
                  className={'form-control'}
                />
                <label htmlFor="emptyMiles">Empty Miles</label>
                <input
                  name={'emptyMiles'}
                  onChange={(event) =>
                    setPost({ ...post, [event.target.name]: event.target.value })
                  }
                  type="text"
                  className={'form-control'}
                />
                <label htmlFor="revenuePerMile">Revenue PerMile</label>
                <input
                  name={'revenuePerMile'}
                  onChange={(event) =>
                    setPost({ ...post, [event.target.name]: event.target.value })
                  }
                  type="text"
                  className={'form-control'}
                />
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

// export default Accordion
export default connect(TruckReducer, { getTrucks, addTrucks, editTrucks, deleteTrucks })(Accordion)
