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
import TrailerReducer, {
  addTr,
  deleteTrailer,
  editTrailer,
  getTrailer,
} from 'src/reducer/TrailerReducer'

// eslint-disable-next-line react/prop-types
const Cards = ({ TrailerReducer, getTrailer, addTrailer, editTrailer, deleteTrailer }) => {
  const [isModal, setIsModal] = useState(false)
  const [post, setPost] = useState({})
  const [truckId, setTruckId] = useState(null)
  useEffect(() => {
    getTrucks()
    // eslint-disable-next-line react/prop-types
  }, [TrailerReducer.current])

  const formInput = [
    {
      name: 'truckNumber',
      title: 'Truck Number',
      type: 'text',
    },
    {
      name: 'numberOfLoads',
      title: 'Number Of Loads',
      type: 'number',
    },
    {
      name: 'grossRevenue',
      title: 'Gross Revenue',
      type: 'number',
    },
    {
      name: 'revenuePerMile',
      title: 'Revenue Per Mile',
      type: 'number',
    },
  ]

  function send() {
    if (truckId) {
      editTrucks({ ...post, expires: true, id: truckId })
    } else {
      addTrucks({ ...post, expires: true })
    }
    setTruckId(null)
    // eslint-disable-next-line react/prop-types
    toggle()
    setPost({})
  }

  function handleDelete(id) {
    deleteTrucks(id)
  }

  function handleInput(event) {
    // setPost({ ...post, [event.target.name]: event.target.value })
  }

  function edit_(id) {
    getTruck(id)
    setTruckId(id)
    toggle()
  }

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line react/prop-types
      setPost(TrailerReducer.trailers)
    }, 100)
    // eslint-disable-next-line react/prop-types
  }, [TrailerReducer?.current])

  // eslint-disable-next-line react/prop-types
  console.log(TrailerReducer.trailers)
  const toggle = () => setIsModal(!isModal)
  return (
    <div>
      <h1>Trailer List</h1>
      <div className="w-25 float-end mb-3">
        <button onClick={toggle} className={'btn btn-success w-100 text-light float-end'}>
          + Add
        </button>
      </div>
      <br />
      {/* eslint-disable-next-line react/prop-types */}
      {TrailerReducer.trailers ? (
        <table className={'table rounded table-bordered text-light  table-hover table-striped'}>
          <thead className={'bg-secondary'}>
            <th className={'text-center'}>T/R</th>
            <th className={'text-center'}>Number Truck</th>
            <th className={'text-center'}>Number of load</th>
            <th className={'text-center'}>Gross Revenue</th>
            <th className={'text-center'}>Revenue Per Mile</th>
            <th className={'text-center'}>Actions</th>
          </thead>
          <hr />
          <tbody>
            {/* eslint-disable-next-line react/prop-types */}
            {TrailerReducer.trailers.map((item, index) => (
              <tr key={index}>
                <td className={'text-center'}>{index + 1}</td>
                <td className={'text-center'}>{item?.truckNumber}</td>
                <td className={'text-center'}>{item?.numberOfLoads}</td>
                <td className={'text-center'}>{item?.grossRevenue}</td>
                <td className={'text-center'}>{item?.miles}</td>
                <td className={'text-center'}>{item?.emptyMiles}</td>
                <td className={'text-center'}>{item?.revenuePerMile}</td>
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
            </div>
          </ModalBody>
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
export default connect(TrailerReducer, { getTrailer, addTr, editTrailer, deleteTrailer })(Cards)
