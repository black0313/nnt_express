import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import axios from 'axios'
import { connect } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import LoadReducer, {
  addLoad,
  deleteLoad,
  editLoad,
  getLoad,
  getLoads,
} from 'src/reducer/LoadReducer'
import DriverReducer, { getDrivers } from 'src/reducer/DriverReducer'
import TruckReducer, { getTrucks } from 'src/reducer/TruckReducer'
import TrailerReducer, { getTrailer } from 'src/reducer/TrailerReducer'
import DispatcherReducer, { getDispatchers } from 'src/reducer/DispatcherReducer'
import BrokerReducer, { getBroker, getBrokers } from 'src/reducer/BrokerReducer'

// eslint-disable-next-line react/prop-types
const Loads = ({
  // eslint-disable-next-line react/prop-types
  LoadReducer,
  // eslint-disable-next-line react/prop-types
  getLoads,
  // eslint-disable-next-line react/prop-types
  addLoad,
  // eslint-disable-next-line react/prop-types
  editLoad,
  // eslint-disable-next-line react/prop-types
  deleteLoad,
  // eslint-disable-next-line react/prop-types
  getLoad,
  // eslint-disable-next-line react/prop-types
  getTrucks,
  // eslint-disable-next-line react/prop-types
  getTrailer,
  // eslint-disable-next-line react/prop-types
  getBrokers,
  // eslint-disable-next-line react/prop-types
  getDispatchers,
  // eslint-disable-next-line react/prop-types
  getDrivers,
  // eslint-disable-next-line react/prop-types
  DriverReducer,
  // eslint-disable-next-line react/prop-types
  TruckReducer,
  // eslint-disable-next-line react/prop-types
  TrailerReducer,
  // eslint-disable-next-line react/prop-types
  DispatcherReducer,
  // eslint-disable-next-line react/prop-types
  BrokerReducer,
}) => {
  const [isModal, setIsModal] = useState(false)
  const [post, setPost] = useState({})
  const [loadId, setLoadId] = useState(null)
  const [loadNumber, setLoadNumber] = useState('')
  const [driverId, setDriverId] = useState(null)
  const [truckId, setTruckId] = useState(null)
  const [trailerId, setTrailerId] = useState(null)
  const [dispatcherId, setDispatcherId] = useState(null)
  const [customsBrokerId, setCustomerBrokerId] = useState(null)
  const [shipperConsigneeDtoList, setShipperConsigneeDtoList] = useState([])
  useEffect(() => {
    getLoads()
    // eslint-disable-next-line react/prop-types
  }, [LoadReducer.current])

  const formInput = [
    {
      name: 'address',
      title: 'Adress',
      type: 'text',
    },
    {
      name: 'location',
      title: 'Location',
      type: 'text',
    },
    {
      name: 'date',
      title: 'Date ( UP )',
      type: 'date',
    },
    {
      name: 'date',
      title: 'Date ( DOWN )',
      type: 'date',
    },
    {
      name: 'description',
      title: 'Description P.O NUMBERS',
      type: 'text',
    },
    {
      name: 'weight',
      title: 'Weight',
      type: 'number',
    },
    {
      name: 'value',
      title: 'Price $',
      type: 'number',
    },
  ]

  function send() {
    if (loadId) {
      editLoad({
        firstname: post.firstname,
        lastname: post.lastname,
        password: post.password,
        username: post.username,
        id: loadId,
      })
    } else {
      addLoad({ ...post, trailerId, truckId, dispatcherId, customsBrokerId })
    }
    setLoadId(null)
    // eslint-disable-next-line react/prop-types
    toggle()
    setPost({})
  }

  function handleDelete(id) {
    deleteLoad(id)
  }

  function edit_(id) {
    getLoad(id)
    setLoadId(id)
    toggle()
  }

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line react/prop-types
      setPost(LoadReducer.load)
      getTrucks()
      getBrokers()
      getTrailer()
      getDispatchers()
      getDrivers()
    }, 100)
    // eslint-disable-next-line react/prop-types
  }, [LoadReducer.current])

  const toggle = () => setIsModal(!isModal)
  return (
    <div>
      <h1>Load List</h1>
      <div className="w-25 float-end mb-3">
        <button onClick={toggle} className={'btn btn-success w-100 text-light float-end'}>
          + Add
        </button>
      </div>
      <br />
      {/* eslint-disable-next-line react/prop-types */}
      {LoadReducer.loads ? (
        <table
          className={
            'table overflow-scroll rounded table-bordered text-light  table-hover table-striped'
          }
        >
          <thead className={'bg-secondary'}>
            <th className={'text-center'}>T/R</th>
            <th className={'text-center'}>Name</th>
            <th className={'text-center'}>Last name</th>
            <th className={'text-center'}>Actions</th>
          </thead>
          <hr />
          <tbody>
            {/* eslint-disable-next-line react/prop-types */}
            {LoadReducer.loads.map((item, index) => (
              <tr key={index}>
                <td className={'text-center'}>{index + 1}</td>
                <td className={'text-center'}>{item?.firstname}</td>
                <td className={'text-center'}>{item?.lastname}</td>
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
        <Modal isOpen={isModal} toggle={toggle} size={'xl'} scrollable={true}>
          <ModalHeader>
            <h3 className={'text-info '}>{loadId ? 'Edit Load' : 'Add Load'}</h3>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="p-3 d-flex justify-content-between align-items-center">
                <div className={'col-4'}>
                  <label htmlFor="">Load number</label>
                  <input
                    type="text"
                    className={'form-control mt-2'}
                    value={loadNumber}
                    onChange={(e) => setLoadNumber(e.target.value)}
                  />
                </div>
                <div className="col-3">
                  <label htmlFor="">Driver</label>
                  <select
                    value={driverId}
                    onChange={(e) => setDriverId(e.target.value)}
                    name=""
                    id=""
                    className={'form-control' + ' mt-2'}
                  >
                    <option value="choose">Choose driver</option>
                    {/* eslint-disable-next-line react/prop-types */}
                    {DriverReducer?.drivers ? (
                      // eslint-disable-next-line react/prop-types
                      DriverReducer?.drivers.map((item) => (
                        // eslint-disable-next-line react/jsx-key
                        <option value={item.id}>{item?.driverName}</option>
                      ))
                    ) : (
                      <option value="choose">NOT FOUND</option>
                    )}
                  </select>
                </div>
                <div className="col-3">
                  <label htmlFor="">Truck</label>
                  <select
                    value={truckId}
                    onChange={(e) => setTruckId(e.target.value)}
                    className={'form-control mt-2'}
                  >
                    <option value="choose">Choose truck</option>
                    {
                      // eslint-disable-next-line react/prop-types
                      TruckReducer.trucks ? (
                        // eslint-disable-next-line react/prop-types
                        TruckReducer?.trucks.map((item) => (
                          // eslint-disable-next-line react/jsx-key
                          <option value={item.id}>{item.truckNumber}</option>
                        ))
                      ) : (
                        <option value="choose">NOT FOUND</option>
                      )
                    }
                  </select>
                </div>
              </div>
              <div className={'d-flex justify-content-between'}>
                <div className="col-3">
                  <label htmlFor="">Trailer</label>
                  <select
                    value={trailerId}
                    onChange={(e) => setTrailerId(e.target.value)}
                    name=""
                    className={'form-control mt-2'}
                  >
                    <option value="choose">Choose trailer</option>
                    {/* eslint-disable-next-line react/prop-types */}
                    {TrailerReducer.trailers ? (
                      // eslint-disable-next-line react/prop-types
                      TrailerReducer?.trailers.map((item) => (
                        // eslint-disable-next-line react/jsx-key
                        <option value={item.id}>{item?.trailerNumber}</option>
                      ))
                    ) : (
                      <option value="choose">NOT FOUND</option>
                    )}
                  </select>
                </div>
                <div className="col-3">
                  <label htmlFor="">Broker</label>
                  <select
                    value={customsBrokerId}
                    onChange={(e) => setCustomerBrokerId(e.target.value)}
                    className={'form-control mt-2'}
                  >
                    <option value="choose">Choose broker</option>
                    {
                      // eslint-disable-next-line react/prop-types
                      BrokerReducer.brokers ? (
                        // eslint-disable-next-line react/prop-types
                        BrokerReducer?.brokers.map((item) => (
                          // eslint-disable-next-line react/jsx-key
                          <option value={item.id}>{item?.customerName}</option>
                        ))
                      ) : (
                        <option value="choose">NOT FOUND</option>
                      )
                    }
                  </select>
                </div>
                <div className="col-2">
                  <label htmlFor="">Shipper</label>
                  <select name="" className={'form-control mt-2'}>
                    <option value="true">Shipper</option>
                    <option value="false">Consignee</option>
                  </select>
                </div>
                <div className="col-3">
                  <label htmlFor="">Dispatcher</label>
                  <select
                    value={dispatcherId}
                    onChange={(e) => setDispatcherId(e.target.value)}
                    className={'form-control mt-2'}
                  >
                    <option value="choose">Choose dispatcher</option>
                    {
                      // eslint-disable-next-line react/prop-types
                      DispatcherReducer.dispatchers ? (
                        // eslint-disable-next-line react/prop-types
                        DispatcherReducer?.dispatchers.map((item) => (
                          // eslint-disable-next-line react/jsx-key
                          <option value={item.id}>{item?.firstname}</option>
                        ))
                      ) : (
                        <option value="choose">NOT FOUND</option>
                      )
                    }
                  </select>
                </div>
              </div>
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
            </div>
          </ModalBody>
          <ModalFooter>
            <button onClick={send} className={'btn btn-success text-light w-25'}>
              Save
            </button>
            <button
              onClick={() => {
                toggle()
                setLoadId(null)
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
export default connect(
  (LoadReducer, DriverReducer, TruckReducer, TrailerReducer, DispatcherReducer, BrokerReducer),
  {
    getLoads,
    getLoad,
    addLoad,
    editLoad,
    deleteLoad,
    getDrivers,
    getTrucks,
    getTrailer,
    getDispatchers,
    getBrokers,
  },
)(Loads)
