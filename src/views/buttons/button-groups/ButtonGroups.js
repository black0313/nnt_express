import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { connect } from 'react-redux'
import FacilityReducer, {
  addFacility,
  deleteFacility,
  editFacility,
  getFacilities,
  getFacility,
} from 'src/reducer/FacilityReducer'
// eslint-disable-next-line react/prop-types
function ButtonGroup({
  // eslint-disable-next-line react/prop-types
  FacilityReducer,
  // eslint-disable-next-line react/prop-types
  getFacilities,
  // eslint-disable-next-line react/prop-types
  getFacility,
  // eslint-disable-next-line react/prop-types
  addFacility,
  // eslint-disable-next-line react/prop-types
  editFacility,
  // eslint-disable-next-line react/prop-types
  deleteFacility,
}) {
  const [isModal, setIsModal] = useState(false)
  const [post, setPost] = useState({})
  const [facilityId, setFacilityId] = useState(null)
  const [statusvalue, setStatusvalue] = useState(false)
  useEffect(() => {
    getFacilities()
    // eslint-disable-next-line react/prop-types
  }, [FacilityReducer.current])

  const formInput = [
    {
      name: 'name',
      title: 'Name',
      type: 'text',
    },
  ]

  function send() {
    if (facilityId) {
      editFacility({ ...post, id: facilityId })
    } else {
      addFacility({ ...post })
    }
    setFacilityId(null)
    // eslint-disable-next-line react/prop-types
    toggle()
    setPost({})
  }

  function handleDelete(id) {
    deleteFacility(id)
  }

  function edit_(id) {
    getFacility(id)
    setFacilityId(id)
    toggle()
  }

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line react/prop-types
      setPost(FacilityReducer.facility)
    }, 100)
    // eslint-disable-next-line react/prop-types
  }, [FacilityReducer?.current])
  const toggle = () => setIsModal(!isModal)
  return (
    <div>
      <h1>Facility List</h1>

      <div className="w-25 float-end mb-3">
        <button onClick={toggle} className={'btn btn-success w-100 text-light float-end'}>
          + Add
        </button>
      </div>
      <div className={'table-wrapper-scroll-y my-custom-scrollbar'}>
        {/* eslint-disable-next-line react/prop-types */}
        {FacilityReducer.facilities ? (
          <table className={'table rounded text-light bg-primary table-hover table-striped'}>
            <thead>
              <th className={'text-center'}>T/R</th>
              <th className={'text-center'}>Name</th>
              <th className={'text-center'}>Actions</th>
            </thead>
            <hr />
            <tbody>
              {
                // eslint-disable-next-line react/prop-types
                FacilityReducer.facilities.map((item, index) => (
                  <tr key={index}>
                    <td className={'text-center'}>{index + 1}</td>
                    <td className={'text-center'}>{item.name}</td>
                    <td className={'text-center'}>
                      <button onClick={() => edit_(item.id)} className="btn btn-secondary">
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn text-light ms-2 btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        ) : (
          <h1 className={'text-center bg-secondary-subtle mt-5 text-light w-50 mx-auto'}>
            TABLE IS EMPTY
          </h1>
        )}
      </div>

      {
        <Modal isOpen={isModal} toggle={toggle} size={'lg'} scrollable={true}>
          <ModalHeader>
            <h3 className={'text-info '}>Add Facility</h3>
          </ModalHeader>
          <ModalBody>
            <div className={'row'}>
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
            <button onClick={toggle} className={'btn btn-danger w-25 text-light'}>
              Exit
            </button>
          </ModalFooter>
        </Modal>
      }
    </div>
  )
}

export default connect(FacilityReducer, {
  getFacilities,
  getFacility,
  addFacility,
  editFacility,
  deleteFacility,
})(ButtonGroup)
