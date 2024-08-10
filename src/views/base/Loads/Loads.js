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
import PickUpAdressReducer, { getPicks } from 'src/reducer/PickUpAdressReducer'
import FacilityReducer, { getFacilities } from 'src/reducer/FacilityReducer'
import DispatchTeamReducer, { getDispatchTeams } from 'src/reducer/DispatchTeamReducer'

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
  // eslint-disable-next-line react/prop-types
  getPicks,
  // eslint-disable-next-line react/prop-types
  PickUpAdressReducer,
  // eslint-disable-next-line react/prop-types
  getFacilities,
  // eslint-disable-next-line react/prop-types
  FacilityReducer,
  // eslint-disable-next-line react/prop-types
  DispatchTeamReducer,
  // eslint-disable-next-line react/prop-types
  getDispatchTeams,
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
  const [addressId, setAdressId] = useState(null)
  const [facilityId, setFacilityId] = useState(null)
  const [shipper, setShipper] = useState('true')
  const [dispatcherTeamId, setDispatcherTeamId] = useState(null)
  const [shipperConsigneeDtoList, setShipperConsigneeDtoList] = useState([])
  useEffect(() => {
    getLoads()
    getPicks()
    getFacilities()
    getDispatchTeams()
    // eslint-disable-next-line react/prop-types
  }, [LoadReducer.current])

  const [data, setData] = useState([
    { pickDate: '', deliveryDate: '', description: '', weight: '', value: '', shipper: true },
  ])

  const formInput = [
    // {
    //   name: 'date',
    //   title: 'Date ( GET )',
    //   type: 'date',
    // },
    // {
    //   name: 'date',
    //   title: 'Date ( DELIVERY )',
    //   type: 'date',
    // },
    // {
    //   name: 'description',
    //   title: 'Description P.O NUMBERS',
    //   type: 'text',
    // },
    // {
    //   name: 'value',
    //   title: 'Price $',
    //   type: 'number',
    // },
  ]

  function send() {
    if (loadId) {
      editLoad({
        firstname: post.firstname,
        lastname: post.lastname,
        password: post.password,
        username: post.username,
        id: loadId,
        brokerId: customsBrokerId,
      })
    } else {
      addLoad({
        shipperConsigneeDtoList: [...data],
        trailerId,
        truckId,
        dispatcherId,
        brokerId: customsBrokerId,
        facilityId,
        addressId,
        dispatcherTeamId,
        driverId,
        internalLoadNumber: loadNumber,
      })
    }
    setLoadId(null)
    // eslint-disable-next-line react/prop-types
    toggle()
    setPost({})
  }

  function handleChange(e, i) {
    const { name, value } = e.target
    const onChangeVal = [...data]
    onChangeVal[i][name] = value
    setData(onChangeVal)
    console.log(onChangeVal)
  }

  function handleDelete(id) {
    deleteLoad(id)
  }

  function handleClick() {
    const newData = [
      ...data,
      {
        pickDate: null,
        deliveryDate: null,
        description: null,
        weight: null,
        value: null,
      },
    ]
    setData(newData)
  }

  function handleDeleteInput(i) {
    const deleteVal = [...data]
    deleteVal.splice(i, 1)
    setData(deleteVal)
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
                {/*<div className="col-2">*/}
                {/*  <label htmlFor="">Shipper</label>*/}
                {/*  <select name="" className={'form-control mt-2'}>*/}
                {/*    <option value="true">Shipper</option>*/}
                {/*    <option value="false">Consignee</option>*/}
                {/*  </select>*/}
                {/*</div>*/}
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
              <div className="col-8 offset-2">
                <label htmlFor="">Dispatcher</label>
                <select
                  value={dispatcherTeamId}
                  onChange={(e) => setDispatcherTeamId(e.target.value)}
                  className={'form-control mt-2'}
                >
                  <option value="choose">Choose Team</option>
                  {
                    // eslint-disable-next-line react/prop-types
                    DispatchTeamReducer.teams ? (
                      // eslint-disable-next-line react/prop-types
                      DispatchTeamReducer?.teams.map((item) => (
                        // eslint-disable-next-line react/jsx-key
                        <option value={item.id}>{item?.name}</option>
                      ))
                    ) : (
                      <option value="choose">NOT FOUND</option>
                    )
                  }
                </select>
              </div>
              <hr className={'mt-4'} />
              <div className={'d-flex'}>
                <h3>Shipper</h3>
                <button
                  onClick={handleClick}
                  className="btn ms-2 rounded rounded-bottom-circle btn-secondary"
                >
                  +
                </button>
              </div>
              <div className="col-6">
                <label htmlFor="">Address</label>
                <select
                  value={addressId}
                  onChange={(e) => setAdressId(e.target.value)}
                  className={'form-control mt-2'}
                >
                  <option value="choose">Choose address</option>
                  {
                    // eslint-disable-next-line react/prop-types
                    PickUpAdressReducer?.pickups ? (
                      // eslint-disable-next-line react/prop-types
                      PickUpAdressReducer?.pickups.map((item) => (
                        // eslint-disable-next-line react/jsx-key
                        <option value={item.id}>{item?.address}</option>
                      ))
                    ) : (
                      <option value="choose">NOT FOUND</option>
                    )
                  }
                </select>
              </div>
              <div className="col-6">
                <label htmlFor="">Facility</label>
                <select
                  value={facilityId}
                  onChange={(e) => setFacilityId(e.target.value)}
                  className={'form-control mt-2'}
                >
                  <option value="choose">Choose facility</option>
                  {
                    // eslint-disable-next-line react/prop-types
                    FacilityReducer?.facilities ? (
                      // eslint-disable-next-line react/prop-types
                      FacilityReducer?.facilities.map((item) => (
                        // eslint-disable-next-line react/jsx-key
                        <option value={item.id}>{item?.name}</option>
                      ))
                    ) : (
                      <option value="choose">NOT FOUND</option>
                    )
                  }
                </select>
              </div>
              {console.log(data)}
              {
                // eslint-disable-next-line react/jsx-key
                data?.map((val, i) => (
                  // eslint-disable-next-line react/jsx-key
                  <div className={'col-12 mt-2'}>
                    <div className="row">
                      <div className="col-3">
                        <label htmlFor="">Pick date</label>
                        <input
                          name={'pickDate'}
                          value={val.pickDate}
                          onChange={(e) => handleChange(e, i)}
                          type="datetime-local"
                          className={'form-control'}
                        />
                      </div>
                      <div className="col-3">
                        <label htmlFor="">Delivery date</label>
                        <input
                          value={val.deliveryDate}
                          name={'deliveryDate'}
                          onChange={(e) => handleChange(e, i)}
                          type="datetime-local"
                          className={'form-control'}
                        />
                      </div>
                      <div className="col-3">
                        <label htmlFor="">Description P.O</label>
                        <input
                          value={val.description}
                          name={'description'}
                          onChange={(e) => handleChange(e, i)}
                          type="text"
                          className={'form-control'}
                        />
                      </div>
                      <div className="col-3">
                        <label htmlFor="">Weight</label>
                        <input
                          value={val.weight}
                          name={'weight'}
                          onChange={(e) => handleChange(e, i)}
                          type="text"
                          className={'form-control'}
                        />
                      </div>
                      <div className="col-3">
                        <label>Price $</label>
                        <input
                          name={'value'}
                          value={val.value}
                          onChange={(e) => handleChange(e, i)}
                          type="text"
                          className={'form-control'}
                        />
                      </div>
                      <div className="col-3">
                        <label>Shipper</label>
                        <select
                          name={'shipper'}
                          value={shipper}
                          onChange={(e) => setShipper(e.target.value)}
                          className={'form-control'}
                        >
                          <option value={'true'}>SHIPPER</option>
                          <option value={'false'}>CONSIGNEE</option>
                        </select>
                      </div>
                      <div className="col-4">
                        <button
                          onClick={() => handleDeleteInput(i)}
                          className={'btn mt-4 btn-danger text-light'}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              }
              {/*{formInput.map((item) => (*/}
              {/*  // eslint-disable-next-line react/jsx-key*/}
              {/*  <div className={'col-6'}>*/}
              {/*    <label htmlFor={item.name}>{item.title}</label>*/}
              {/*    <input*/}
              {/*      type={item.type}*/}
              {/*      name={item.name}*/}
              {/*      value={post?.[item.name]}*/}
              {/*      className={'form-control'}*/}
              {/*      onChange={(event) =>*/}
              {/*        setPost({ ...post, [event.target.name]: event.target.value })*/}
              {/*      }*/}
              {/*    />*/}
              {/*  </div>*/}
              {/*))}*/}
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
  (LoadReducer,
  DriverReducer,
  TruckReducer,
  TrailerReducer,
  DispatcherReducer,
  BrokerReducer,
  FacilityReducer,
  DispatchTeamReducer,
  PickUpAdressReducer),
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
    getPicks,
    getFacilities,
    getDispatchTeams,
  },
)(Loads)
