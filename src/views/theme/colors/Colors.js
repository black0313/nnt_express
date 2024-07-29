import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { connect } from 'react-redux'
import DispatcherReducer, {
  addDispatcher,
  deleteDispatcher,
  editDispatcher,
  getDispatcher,
  getDispatchers,
} from 'src/reducer/DispatcherReducer'
import UserReducer, { getUserDispatchers, getUsers } from 'src/reducer/UserReducer'
import DispatchTeamReducer, { getDispatchTeams } from 'src/reducer/DispatchTeamReducer'
// eslint-disable-next-line react/prop-types
function Colors({
  // eslint-disable-next-line react/prop-types
  UserReducer,
  // eslint-disable-next-line react/prop-types
  getUsers,
  // eslint-disable-next-line react/prop-types
  DispatcherReducer,
  // eslint-disable-next-line react/prop-types
  getDispatcher,
  // eslint-disable-next-line react/prop-types
  getDispatchers,
  // eslint-disable-next-line react/prop-types
  addDispatcher,
  // eslint-disable-next-line react/prop-types
  editDispatcher,
  // eslint-disable-next-line react/prop-types
  deleteDispatcher,
  // eslint-disable-next-line react/prop-types
  getDispatchTeams,
  // eslint-disable-next-line react/prop-types
  DispatchTeamReducer,
}) {
  const [isModal, setIsModal] = useState(false)
  const [post, setPost] = useState({})
  const [dispatcherId, setDispatcherId] = useState(null)
  const [statusvalue, setStatusvalue] = useState(false)
  const [userId, setUserId] = useState(null)
  const [dispatchersTeamId, setDispatchersTeamId] = useState(null)
  useEffect(() => {
    getDispatchers()
    // getUsers()
    getDispatchTeams()
    getUsers()
    // eslint-disable-next-line react/prop-types
  }, [DispatcherReducer.current])

  const formInput = [
    {
      name: 'firstName',
      title: 'First name',
      type: 'text',
    },
    {
      name: 'lastName',
      title: 'Last name',
      type: 'text',
    },
    {
      name: 'phone',
      title: 'Phone',
      type: 'number',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'text',
    },
    {
      name: 'postalCode',
      title: 'Postal code',
      type: 'text',
    },
    {
      name: 'city',
      title: 'City',
      type: 'text',
    },
    {
      name: 'country',
      title: 'country',
      type: 'text',
    },
    {
      name: 'state',
      title: 'State',
      type: 'text',
    },
    {
      name: 'street',
      title: 'Street',
      type: 'text',
    },
  ]

  function send() {
    if (dispatcherId) {
      editDispatcher({ ...post, id: dispatcherId, userId, dispatchersTeamId })
    } else {
      addDispatcher({ ...post, userId, dispatchersTeamId })
    }
    setDispatcherId(null)
    // eslint-disable-next-line react/prop-types
    toggle()
    setPost({})
  }

  function handleDelete(id) {
    deleteDispatcher(id)
  }

  function edit_(id) {
    getDispatcher(id)
    setDispatcherId(id)
    toggle()
  }

  useEffect(() => {
    setTimeout(() => {
      // eslint-disable-next-line react/prop-types
      setPost(DispatcherReducer.dispatcher)
    }, 100)
    // eslint-disable-next-line react/prop-types
  }, [DispatcherReducer?.current])
  const toggle = () => setIsModal(!isModal)
  return (
    <div>
      <h1>Dispatcher List</h1>

      <div className="w-25 float-end mb-3">
        <button onClick={toggle} className={'btn btn-success w-100 text-light float-end'}>
          + Add
        </button>
      </div>
      {/* eslint-disable-next-line react/prop-types */}
      {DispatcherReducer.dispatchers ? (
        <table className={'table rounded text-light bg-primary table-hover table-striped'}>
          <thead>
            <th className={'text-center'}>T/R</th>
            <th className={'text-center'}>Name</th>
            <th className={'text-center'}>Last name</th>
            <th className={'text-center'}>Team</th>
            <th className={'text-center'}>Phone</th>
            <th className={'text-center'}>Email</th>
            <th className={'text-center'}>City</th>
            <th className={'text-center'}>Country</th>
            <th className={'text-center'}>Actions</th>
          </thead>
          <hr />
          <tbody>
            {
              // eslint-disable-next-line react/prop-types
              DispatcherReducer.dispatchers.map((item, index) => (
                <tr key={index}>
                  <td className={'text-center'}>{index + 1}</td>
                  <td className={'text-center'}>{item.firstname}</td>
                  <td className={'text-center'}>{item.lastname}</td>
                  <td className={'text-center'}>{item?.dispatchersTeam?.name}</td>
                  <td className={'text-center'}>{item?.phone}</td>
                  <td className={'text-center'}>{item?.email}</td>
                  <td className={'text-center'}>{item?.address?.city}</td>
                  <td className={'text-center'}>{item?.address?.country}</td>
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

      {
        <Modal isOpen={isModal} toggle={toggle} size={'lg'} scrollable={true}>
          <ModalHeader>
            <h3 className={'text-info '}>Add Dispatcher</h3>
          </ModalHeader>
          <ModalBody>
            <div className={'row'}>
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
              <div className="col-6">
                <label htmlFor="">Choose dispatcher</label>
                <select onChange={(e) => setUserId(e.target.value)} className={'form-control'}>
                  <option value="choose">Choose user</option>
                  {
                    // eslint-disable-next-line react/prop-types
                    UserReducer.users ? (
                      // eslint-disable-next-line react/prop-types
                      UserReducer.users?.map((i) => (
                        // eslint-disable-next-line react/jsx-key
                        <option value={i.id}>{i.firstname}</option>
                      ))
                    ) : (
                      <option value="choose">NOT FOUND</option>
                    )
                  }
                </select>
              </div>
              <div className="col-6">
                <label htmlFor="">Choose Team</label>
                <select
                  value={dispatchersTeamId}
                  onChange={(e) => setDispatchersTeamId(e.target.value)}
                  className={'form-control'}
                >
                  <option value="choose">Choose team</option>
                  {
                    // eslint-disable-next-line react/prop-types
                    DispatchTeamReducer.teams ? (
                      // eslint-disable-next-line react/prop-types
                      DispatchTeamReducer.teams?.map((i) => (
                        // eslint-disable-next-line react/jsx-key
                        <option value={i.id}>{i.name}</option>
                      ))
                    ) : (
                      <option value="choose">NOT FOUND</option>
                    )
                  }
                </select>
              </div>
            </div>
          </ModalBody>
          {console.log(userId)}
          <ModalFooter>
            {userId === null || userId === 'choose' ? (
              <button onClick={send} disabled className={'btn btn-success text-light w-25'}>
                Save
              </button>
            ) : (
              <button onClick={send} className={'btn btn-success text-light w-25'}>
                Save
              </button>
            )}
            {/*<button onClick={send} className={'btn btn-success text-light w-25'}>*/}
            {/*  Save*/}
            {/*</button>*/}
            <button onClick={toggle} className={'btn btn-danger w-25 text-light'}>
              Exit
            </button>
          </ModalFooter>
        </Modal>
      }
    </div>
  )
}

export default connect((DispatcherReducer, UserReducer, DispatchTeamReducer), {
  getUsers,
  getUserDispatchers,
  getDispatchers,
  getDispatcher,
  addDispatcher,
  editDispatcher,
  deleteDispatcher,
  getDispatchTeams,
})(Colors)
