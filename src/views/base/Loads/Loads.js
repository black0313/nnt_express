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

// eslint-disable-next-line react/prop-types
const Loads = ({ LoadReducer, getLoads, addLoad, editLoad, deleteLoad, getLoad }) => {
  const [isModal, setIsModal] = useState(false)
  const [post, setPost] = useState({})
  const [loadId, setLoadId] = useState(null)
  useEffect(() => {
    getLoads()
    // eslint-disable-next-line react/prop-types
  }, [LoadReducer.current])

  const formInput = [
    {
      name: 'loadNumber',
      title: 'Load number',
      type: 'text',
    },
    {
      name: 'address',
      title: 'Address',
      type: 'text',
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
      addLoad({ ...post })
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
        <Modal isOpen={isModal} toggle={toggle} size={'lg'} scrollable={true}>
          <ModalHeader>
            <h3 className={'text-info '}>{loadId ? 'Edit Load' : 'Add Load'}</h3>
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
            <button disabled onClick={send} className={'btn btn-success text-light w-25'}>
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
export default connect(LoadReducer, { getLoads, getLoad, addLoad, editLoad, deleteLoad })(Loads)
