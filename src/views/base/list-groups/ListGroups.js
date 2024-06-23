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
import BrokerReducer, {
  addBroker,
  deleteBroker,
  editBroker,
  getBroker,
  getBrokers,
} from 'src/reducer/BrokerReducer'

// eslint-disable-next-line react/prop-types
const ListGroup = ({
  // eslint-disable-next-line react/prop-types
  BrokerReducer,
  // eslint-disable-next-line react/prop-types
  addBroker,
  // eslint-disable-next-line react/prop-types
  getBrokers,
  // eslint-disable-next-line react/prop-types
  getBroker,
  // eslint-disable-next-line react/prop-types
  editBroker,
  // eslint-disable-next-line react/prop-types
  deleteBroker,
}) => {
  const [isModal, setIsModal] = useState(false)
  const [post, setPost] = useState({})
  const [brokerId, setBrokerId] = useState(null)
  const [statusvalue, setStatusvalue] = useState(false)
  useEffect(() => {
    getBrokers()
    // eslint-disable-next-line react/prop-types
  }, [BrokerReducer.current])

  const formInput = [
    {
      name: 'name',
      title: 'Name',
      type: 'text',
    },
  ]

  function send() {
    if (brokerId) {
      editBroker({ ...post, id: brokerId })
    } else {
      addBroker({ ...post })
    }
    setBrokerId(null)
    // eslint-disable-next-line react/prop-types
    toggle()
    setPost({})
  }

  function handleDelete(id) {
    deleteBroker(id)
  }

  function edit_(id) {
    getBroker(id)
    setBrokerId(id)
    toggle()
  }

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line react/prop-types
      setPost(BrokerReducer.broker)
    }, 100)
    // eslint-disable-next-line react/prop-types
  }, [BrokerReducer?.current])

  const toggle = () => setIsModal(!isModal)
  return (
    <div>
      <h1>Broker List</h1>
      <div className="w-25 float-end mb-3">
        <button onClick={toggle} className={'btn btn-success w-100 text-light float-end'}>
          + Add
        </button>
      </div>
      <br />
      {/* eslint-disable-next-line react/prop-types */}
      {BrokerReducer.brokers ? (
        <table className={'table rounded table-bordered text-light  table-hover table-striped'}>
          <thead className={'bg-secondary'}>
            <th className={'text-center'}>T/R</th>
            <th className={'text-center'}>Name</th>
            <th className={'text-center'}>Status</th>
            <th className={'text-center'}>Actions</th>
          </thead>
          <hr />
          <tbody>
            {/* eslint-disable-next-line react/prop-types */}
            {BrokerReducer.brokers.map((item, index) => (
              <tr key={index}>
                <td className={'text-center'}>{index + 1}</td>
                <td className={'text-center'}>{item?.name}</td>
                <td className={'text-center'}>
                  {item?.expires === true ? (
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
            <h3 className={'text-info '}>{brokerId ? 'Edit Truck' : 'Add Truck'}</h3>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              {formInput.map((item) => (
                // eslint-disable-next-line react/jsx-key
                <div className={'col-12'}>
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
            </div>
          </ModalBody>
          <ModalFooter>
            <button onClick={send} className={'btn btn-success text-light w-25'}>
              Save
            </button>
            <button
              onClick={() => {
                toggle()
                setBrokerId(null)
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
export default connect(BrokerReducer, {
  getBrokers,
  getBroker,
  addBroker,
  editBroker,
  deleteBroker,
})(ListGroup)
