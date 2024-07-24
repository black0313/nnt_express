import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import RoleReducer, { deleteRole, editRole, getRoles } from 'src/reducer/RoleReducer'
import { Link } from 'react-router-dom'

// eslint-disable-next-line react/prop-types
const Role = ({ RoleReducer, getRoles, editRole, deleteRole, getRole }) => {
  const [isModal, setIsModal] = useState(false)
  const [post, setPost] = useState({})
  const [roleId, setRoleId] = useState(null)
  const [owner, setOwner] = useState(null)
  const [statusvalue, setStatusvalue] = useState(false)
  useEffect(() => {
    getRoles()
    // eslint-disable-next-line react/prop-types
  }, [RoleReducer.current])

  function handleDelete(id) {
    deleteRole(id)
  }

  function edit_(id) {
    getRole(id)
    setRoleId(id)
  }

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line react/prop-types
      setPost(RoleReducer.role)
    }, 100)
    // eslint-disable-next-line react/prop-types
  }, [RoleReducer?.current])

  // eslint-disable-next-line react/prop-types
  console.log(RoleReducer.role)
  // const toggle = () => setIsModal(!isModal)
  return (
    <div>
      <h1>Role List</h1>
      <div className="w-25 float-end mb-3">
        <Link to={'/roles'}>
          <button className={'btn btn-success w-100 text-light float-end'}>+ Add</button>
        </Link>
      </div>
      <br />
      {/* eslint-disable-next-line react/prop-types */}
      {RoleReducer.roles ? (
        <table className={'table rounded table-bordered text-light  table-hover table-striped'}>
          <thead className={'bg-secondary'}>
            <th className={'text-center'}>T/R</th>
            <th className={'text-center'}>Role</th>
            <th className={'text-center'}>Description</th>
            <th className={'text-center'}>Actions</th>
          </thead>
          <hr />
          <tbody>
            {/* eslint-disable-next-line react/prop-types */}
            {RoleReducer.roles.map((item, index) => (
              <tr key={index}>
                <td className={'text-center'}>{index + 1}</td>
                <td className={'text-center'}>{item?.name}</td>
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
    </div>
  )
}

export default connect(RoleReducer, { getRoles, editRole, deleteRole })(Role)
