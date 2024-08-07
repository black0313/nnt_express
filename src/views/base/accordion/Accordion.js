import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import axios from 'axios'
import { connect } from 'react-redux'
import TruckReducer, {
  addTrucks,
  deleteTrucks,
  editTrucks,
  getTruck,
  getTrucks,
} from 'src/reducer/TruckReducer'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// eslint-disable-next-line react/prop-types
const Accordion = ({ TruckReducer, getTruck, addTrucks, editTrucks, deleteTrucks, getTrucks }) => {
  const [isModal, setIsModal] = useState(false)
  const [post, setPost] = useState({})
  const [truckId, setTruckId] = useState(null)
  const [owner, setOwner] = useState(null)
  const [statusvalue, setStatusvalue] = useState(false)
  useEffect(() => {
    getTrucks()
    // eslint-disable-next-line react/prop-types
  }, [TruckReducer.current])

  const formInput = [
    {
      name: 'truckNumber',
      title: 'Truck Number',
      type: 'text',
    },
    {
      name: 'truckType',
      title: 'Truck type',
      type: 'text',
    },
    {
      name: 'plateExpiry',
      title: 'Plate Expiry',
      type: 'date',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ]

  function send() {
    if (truckId) {
      editTrucks({ ...post, active: statusvalue, ownershipIsPrivate: owner, id: truckId })
    } else {
      addTrucks({ ...post, active: statusvalue, ownershipIsPrivate: owner })
    }
    setTruckId(null)
    // eslint-disable-next-line react/prop-types
    toggle()
    setPost({})
  }

  function handleDelete(id) {
    deleteTrucks(id)
  }

  function edit_(id) {
    getTruck(id)
    setTruckId(id)
    toggle()
  }

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line react/prop-types
      setPost(TruckReducer.truck)
      // eslint-disable-next-line react/prop-types
      setOwner(TruckReducer.truck?.ownershipIsPrivate)
      // eslint-disable-next-line react/prop-types
      setStatusvalue(TruckReducer.truck?.active)
    }, 100)
    // eslint-disable-next-line react/prop-types
  }, [TruckReducer?.current])

  // eslint-disable-next-line react/prop-types
  console.log(TruckReducer.truck)
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
            <th className={'text-center'}>Truck type</th>
            <th className={'text-center'}>Expiry</th>
            <th className={'text-center'}>Owner</th>
            <th className={'text-center'}>Description</th>
            <th className={'text-center'}>Status</th>
            <th className={'text-center'}>Actions</th>
          </thead>
          <hr />
          <tbody>
            {/* eslint-disable-next-line react/prop-types */}
            {TruckReducer.trucks.map((item, index) => (
              <tr key={index}>
                <td className={'text-center'}>{index + 1}</td>
                <td className={'text-center'}>{item?.truckNumber}</td>
                <td className={'text-center'}>{item?.truckType}</td>
                <td className={'text-center'}>{item?.plateExpiry}</td>
                <td className={'text-center'}>{item?.ownershipIsPrivate ? 'OWNER' : 'COMPANY'}</td>
                <td className={'text-center'}>{item?.description}</td>
                <td className={'text-center'}>
                  {item?.active === true ? (
                    <button className="btn btn-outline-success">Active</button>
                  ) : (
                    <button className={'btn btn-outline-danger'}>No active</button>
                  )}
                </td>
                <td className={'text-center'}>
                  <button onClick={() => edit_(item.id)} className={'btn btn-info text-light'}>
                    Edit
                  </button>
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
            <h3 className={'text-info '}>{truckId ? 'Edit Truck' : 'Add Truck'}</h3>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              {formInput.map((item) => (
                // eslint-disable-next-line react/jsx-key
                <div className={'col-6'}>
                  <label htmlFor={item.name}>{item.title}</label>
                  <input
                    type={item.type}
                    name={item.name}
                    value={post?.[item.name]}
                    className={'form-control'}
                    onChange={(event) =>
                      setPost({ ...post, [event.target.name]: event.target.value })
                    }
                  />
                </div>
              ))}
              <label htmlFor="status">Status</label>
              <select
                onChange={(e) => setStatusvalue(e.target.value)}
                value={statusvalue}
                className={'w-50 ms-2 form-control'}
                name="status"
                id="status"
              >
                <option value="true">Active</option>
                <option value="false">No active</option>
              </select>
              <label htmlFor="status">Owner</label>
              <select
                onChange={(e) => setOwner(e.target.value)}
                value={owner}
                className={'w-50 ms-2 form-control'}
                name="status"
                id="status"
              >
                <option value="false">Not owner</option>
                <option value="true">Owner</option>
              </select>
            </div>
          </ModalBody>
          {console.log(statusvalue)}
          <ModalFooter>
            <button onClick={send} className={'btn btn-success text-light w-25'}>
              Save
            </button>
            <button
              onClick={() => {
                toggle()
                setTruckId(null)
                setPost({})
              }}
              className={'btn btn-danger w-25 text-light'}
            >
              Exit
            </button>
          </ModalFooter>
        </Modal>
      }
    </div>
  )
}

// export default Accordion
export default connect(TruckReducer, { getTrucks, getTruck, addTrucks, editTrucks, deleteTrucks })(
  Accordion,
)
