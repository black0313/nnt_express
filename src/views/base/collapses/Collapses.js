import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import axios from 'axios'
import { connect } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'
import UserReducer, {
  addUser,
  deleteUser,
  editUser,
  getUser,
  getUsers,
} from 'src/reducer/UserReducer'

// eslint-disable-next-line react/prop-types
const Collapses = ({ UserReducer, getUsers, addUser, editUser, deleteUser, getUser }) => {
  const [isModal, setIsModal] = useState(false)
  const [post, setPost] = useState({})
  const [userId, setUserId] = useState(null)
  useEffect(() => {
    getUsers()
    // eslint-disable-next-line react/prop-types
  }, [UserReducer.current])

  const formInput = [
    {
      name: 'firstname',
      title: 'First Name',
      type: 'text',
    },
    {
      name: 'lastname',
      title: 'Last Name',
      type: 'text',
    },
    {
      name: 'username',
      title: 'Username',
      type: 'text',
    },
    {
      name: 'password',
      title: 'Password',
      type: 'number',
    },
    {
      name: 'role',
      title: 'Role',
      type: 'text',
    },
  ]

  function send() {
    if (userId) {
      editUser({
        firstname: post.firstname,
        lastname: post.lastname,
        password: post.password,
        role: post.role,
        username: post.username,
        id: userId,
      })
    } else {
      addUser({ ...post })
    }
    setUserId(null)
    // eslint-disable-next-line react/prop-types
    toggle()
    setPost({})
  }

  function handleDelete(id) {
    deleteUser(id)
  }

  function edit_(id) {
    getUser(id)
    setUserId(id)
    toggle()
  }

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line react/prop-types
      setPost(UserReducer.user)
    }, 100)
    // eslint-disable-next-line react/prop-types
  }, [UserReducer.current])

  const toggle = () => setIsModal(!isModal)
  return (
    <div>
      <h1>User List</h1>
      <div className="w-25 float-end mb-3">
        <button onClick={toggle} className={'btn btn-success w-100 text-light float-end'}>
          + Add
        </button>
      </div>
      <br />
      {/* eslint-disable-next-line react/prop-types */}
      {UserReducer.users ? (
        <table
          className={
            'table overflow-scroll rounded table-bordered text-light  table-hover table-striped'
          }
        >
          <thead className={'bg-secondary'}>
            <th className={'text-center'}>T/R</th>
            <th className={'text-center'}>Name</th>
            <th className={'text-center'}>Last name</th>
            <th className={'text-center'}>Role</th>
            <th className={'text-center'}>Actions</th>
          </thead>
          <hr />
          <tbody>
            {/* eslint-disable-next-line react/prop-types */}
            {UserReducer.users.map((item, index) => (
              <tr key={index}>
                <td className={'text-center'}>{index + 1}</td>
                <td className={'text-center'}>{item?.firstname}</td>
                <td className={'text-center'}>{item?.lastname}</td>
                <td className={'text-center'}>{item?.role}</td>
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
            <h3 className={'text-info '}>{userId ? 'Edit User' : 'Add User'}</h3>
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
                setUserId(null)
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
export default connect(UserReducer, { getUsers, getUser, addUser, editUser, deleteUser })(Collapses)
