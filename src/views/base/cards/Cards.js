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
  addTrailer,
  deleteTrailer,
  editTrailer,
  getTrailer,
  getTrailerOne,
} from 'src/reducer/TrailerReducer'

// eslint-disable-next-line react/prop-types
const Cards = ({
  // eslint-disable-next-line react/prop-types
  TrailerReducer,
  // eslint-disable-next-line react/prop-types
  getTrailer,
  // eslint-disable-next-line react/prop-types
  addTrailer,
  // eslint-disable-next-line react/prop-types
  editTrailer,
  // eslint-disable-next-line react/prop-types
  deleteTrailer,
  // eslint-disable-next-line react/prop-types
  getTrailerOne,
}) => {
  const [isModal, setIsModal] = useState(false)
  const [post, setPost] = useState({})
  const [trailerId, setTrailerId] = useState(null)
  useEffect(() => {
    getTrucks()
    // eslint-disable-next-line react/prop-types
  }, [TrailerReducer.current])

  const formInput = [
    {
      name: 'trailerNumber',
      title: 'Trailer Number',
      type: 'text',
    },
    {
      name: 'trailerType',
      title: 'Trailer type',
      type: 'text',
    },
    {
      name: 'expiryDate',
      title: 'Expiry date',
      type: 'date',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
    },
  ]

  function send() {
    if (trailerId) {
      editTrailer({ ...post, id: trailerId })
    } else {
      addTrailer({ ...post })
    }
    setTrailerId(null)
    // eslint-disable-next-line react/prop-types
    toggle()
    setPost({})
  }

  function handleDelete(id) {
    deleteTrailer(id)
  }

  function edit_(id) {
    getTrailerOne(id)
    setTrailerId(id)
    toggle()
  }

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line react/prop-types
      setPost(TrailerReducer.trailer)
    }, 100)
    getTrailer()
    // eslint-disable-next-line react/prop-types
  }, [TrailerReducer?.current])

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
            <th className={'text-center'}>Truck type</th>
            <th className={'text-center'}>Expiry date</th>
            <th className={'text-center'}>Description</th>
            <th className={'text-center'}>Actions</th>
          </thead>
          <hr />
          <tbody>
            {/* eslint-disable-next-line react/prop-types */}
            {TrailerReducer.trailers.map((item, index) => (
              <tr key={index}>
                <td className={'text-center'}>{index + 1}</td>
                <td className={'text-center'}>{item?.trailerNumber}</td>
                <td className={'text-center'}>{item?.trailerType}</td>
                <td className={'text-center'}>{item?.expiryDate}</td>
                <td className={'text-center'}>{item?.description}</td>
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
            <h3 className={'text-info '}>{trailerId ? 'Edit Trailer' : 'Add Trailer'}</h3>
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
                setTrailerId(null)
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
export default connect(TrailerReducer, {
  getTrailer,
  addTrailer,
  editTrailer,
  deleteTrailer,
  getTrailerOne,
})(Cards)
