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
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// eslint-disable-next-line react/prop-types
const Accordion = ({ TruckReducer, addTrucks, editTrucks, deleteTrucks, getTrucks }) => {
  const [isModal, setIsModal] = useState(false)
  const [post, setPost] = useState([])
  useEffect(() => {
    getTrucks()
    // eslint-disable-next-line react/prop-types
  }, [TruckReducer.current])

  function send() {
    addTrucks(post)
    // eslint-disable-next-line react/prop-types
    toggle()
  }
  function handleDelete(id) {
    deleteTrucks(id)
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
      <br />
      {/* eslint-disable-next-line react/prop-types */}
      {TruckReducer.trucks ? (
        <table className={'table rounded table-bordered text-light  table-hover table-striped'}>
          <thead className={'bg-secondary'}>
            <th className={'text-center'}>T/R</th>
            <th className={'text-center'}>Number Truck</th>
            <th className={'text-center'}>Number of load</th>
            <th className={'text-center'}>Gross Revenue</th>
            <th className={'text-center'}>Miles</th>
            <th className={'text-center'}>Dead Head</th>
            <th className={'text-center'}>Revenue Per Mile</th>
            <th className={'text-center'}>Actions</th>
          </thead>
          <hr />
          <tbody>
            {/* eslint-disable-next-line react/prop-types */}
            {TruckReducer.trucks.map((item, index) => (
              <tr key={index}>
                <td className={'text-center'}>{index + 1}</td>
                <td className={'text-center'}>{item?.truckNumber}</td>
                <td className={'text-center'}>{item?.numberOfLoads}</td>
                <td className={'text-center'}>{item?.grossRevenue}</td>
                <td className={'text-center'}>{item?.miles}</td>
                <td className={'text-center'}>{item?.emptyMiles}</td>
                <td className={'text-center'}>{item?.revenuePerMile}</td>
                <td className={'text-center'}>
                  <button className={'btn btn-info text-light'}>Edit</button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className={'btn btn-danger text-light ms-2'}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className={'text-center bg-secondary-subtle mt-5 text-light w-50 mx-auto'}>
          TABLE IS EMPTY
        </h1>
      )}
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
                  type="number"
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
                  type="number"
                  className={'form-control'}
                />
                <label htmlFor="expires">Expires</label>
                <input name={'expires'} type="text" className={'form-control'} />
              </div>
              <div className="col-6">
                <label htmlFor="miles">Miles</label>
                <input
                  name={'miles'}
                  onChange={(event) =>
                    setPost({ ...post, [event.target.name]: event.target.value })
                  }
                  type="number"
                  className={'form-control'}
                />
                <label htmlFor="emptyMiles">Empty Miles</label>
                <input
                  name={'emptyMiles'}
                  onChange={(event) =>
                    setPost({ ...post, [event.target.name]: event.target.value })
                  }
                  type="number"
                  className={'form-control'}
                />
                <label htmlFor="revenuePerMile">Revenue PerMile</label>
                <input
                  name={'revenuePerMile'}
                  onChange={(event) =>
                    setPost({ ...post, [event.target.name]: event.target.value })
                  }
                  type="number"
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
