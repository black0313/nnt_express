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
import RoleReducer, { getRoles } from 'src/reducer/RoleReducer'
import DispatchTeamReducer, {
  addDispatchTeam,
  deleteDispatchTeam,
  editDispatchTeam,
  getDispatchTeam,
  getDispatchTeams,
} from 'src/reducer/DispatchTeamReducer'
import DispatcherReducer, { getDispatchers } from 'src/reducer/DispatcherReducer'

// eslint-disable-next-line react/prop-types
const Collapses = ({
  // eslint-disable-next-line react/prop-types
  getDispatchTeams,
  // eslint-disable-next-line react/prop-types
  addDispatchTeam,
  // eslint-disable-next-line react/prop-types
  editDispatchTeam,
  // eslint-disable-next-line react/prop-types
  deleteDispatchTeam,
  // eslint-disable-next-line react/prop-types
  DispatchTeamReducer,
  // eslint-disable-next-line react/prop-types
  getDispatchers,
  // eslint-disable-next-line react/prop-types
  getDispatchTeam,
  // eslint-disable-next-line react/prop-types
  DispatcherReducer,
}) => {
  const [isModal, setIsModal] = useState(false)
  const [post, setPost] = useState({})
  const [teamId, setTeamId] = useState(null)
  const [roleId, setRoleId] = useState(null)
  useEffect(() => {
    getDispatchers()
    getDispatchTeams()
    // eslint-disable-next-line react/prop-types
  }, [DispatchTeamReducer.current])

  const formInput = [
    {
      name: 'name',
      title: 'Name',
      type: 'text',
    },
    {
      name: 'groupId ',
      title: 'Group',
      type: 'text',
    },
  ]

  function send() {
    if (teamId) {
      editDispatchTeam({
        id: teamId,
        name: post.name,
        groupId: post.groupId,
      })
    } else {
      addDispatchTeam({ ...post })
    }
    setTeamId(null)
    // eslint-disable-next-line react/prop-types
    toggle()
    setPost({})
  }

  function handleDelete(id) {
    deleteDispatchTeam(id)
  }

  function edit_(id) {
    getDispatchTeam(id)
    setTeamId(id)
    toggle()
  }

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line react/prop-types
      setPost(DispatchTeamReducer.team)
    }, 100)
    // eslint-disable-next-line react/prop-types
  }, [DispatchTeamReducer.current])

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line react/prop-types
      // setRoleId(UserReducer?.user?.role)
    }, 100)
    // eslint-disable-next-line react/prop-types
  }, [DispatchTeamReducer.current])
  const toggle = () => setIsModal(!isModal)
  return (
    <div>
      <h1>Dispatcher Team List</h1>
      <div className="w-25 float-end mb-3">
        <button onClick={toggle} className={'btn btn-success w-100 text-light float-end'}>
          + Add
        </button>
      </div>
      <br />
      {/* eslint-disable-next-line react/prop-types */}
      {DispatchTeamReducer.teams ? (
        <div>
          <table
            className={
              'table overflow-scroll rounded table-bordered text-light  table-hover table-striped'
            }
          >
            <thead className={'bg-secondary'}>
              <th className={'text-center'}>T/R</th>
              <th className={'text-center'}>Name</th>
              <th className={'text-center'}>Actions</th>
            </thead>
            <hr />
            <tbody>
              {/* eslint-disable-next-line react/prop-types */}
              {DispatchTeamReducer.teams.map((item, index) => (
                <tr key={index}>
                  <td className={'text-center'}>{index + 1}</td>
                  <td className={'text-center'}>{item?.name}</td>
                  <td className={'text-center'}>
                    <button onClick={() => edit_(item.id)} className={'btn btn-info text-light'}>
                      Edit
                    </button>
                    {/*<button*/}
                    {/*  onClick={() => handleDelete(item.id)}*/}
                    {/*  className={'btn btn-danger text-light ms-2'}*/}
                    {/*>*/}
                    {/*  Delete*/}
                    {/*</button>*/}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <h1 className={'text-center bg-secondary-subtle mt-5 text-light w-50 mx-auto'}>
          TABLE IS EMPTY
        </h1>
      )}
      {
        <Modal isOpen={isModal} toggle={toggle} size={'lg'} scrollable={true}>
          <ModalHeader>
            <h3 className={'text-info '}>{teamId ? 'Edit Team' : 'Add Team'}</h3>
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
                setTeamId(null)
                setPost({})
                setRoleId(null)
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
export default connect((UserReducer, DispatchTeamReducer, DispatcherReducer), {
  getDispatchTeams,
  addDispatchTeam,
  editDispatchTeam,
  deleteDispatchTeam,
  getDispatchers,
  getDispatchTeam,
})(Collapses)
