import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import RoleReducer, { addRole, editRole } from 'src/reducer/RoleReducer'
import { useNavigate } from 'react-router-dom'

function Roles({ addRole, editRole, RoleReducer }) {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [post, setPost] = useState([])
  const [name, setName] = useState([])
  const [description, setDescription] = useState([])
  const [formInput, setFormInput] = useState([
    {
      name: 'GET_USER',
      title: 'VIEW USER',
      checked: false,
    },
    {
      name: 'ADD_USER',
      title: 'ADD USER',
      checked: false,
    },
    {
      name: 'GET_ROLE',
      title: 'VIEW ROLE',
      checked: false,
    },
    {
      name: 'ADD_ROLE',
      title: 'ADD ROLE',
      checked: false,
    },
    {
      name: 'GET_LOAD',
      title: 'VIEW LOAD',
      checked: false,
    },
    {
      name: 'ADD_LOAD',
      title: 'ADD LOAD',
      checked: false,
    },
    {
      name: 'GET_DISPATCHERS',
      title: 'VIEW DISPATCHERS',
      checked: false,
    },
    {
      name: 'ADD_DISPATCHERS',
      title: 'ADD DISPATCHERS',
      checked: false,
    },
    {
      name: 'GET_ADDRESS',
      title: 'VIEW ADDRESS',
      checked: false,
    },
    {
      name: 'ADD_ADDRESS',
      title: 'ADD ADDRESS',
      checked: false,
    },
    {
      name: 'GET_BROKER',
      title: 'VIEW BROKER',
      checked: false,
    },
    {
      name: 'ADD_BROKER',
      title: 'ADD BROKER',
      checked: false,
    },
    {
      name: 'GET_DRIVER',
      title: 'VIEW DRIVER',
      checked: false,
    },
    {
      name: 'ADD_DRIVER',
      title: 'ADD DRIVER',
      checked: false,
    },
    {
      name: 'GET_TRUCK',
      title: 'VIEW TRUCK',
      checked: false,
    },
    {
      name: 'ADD_TRUCK',
      title: 'ADD TRUCK',
      checked: false,
    },
  ])

  const handleCheckboxChange = (event) => {
    const arr = formInput.map((item) => {
      if (item.name === event.target.name) {
        item.checked = event.target.checked
      }
      return item
    })
    setFormInput(arr)
  }

  function send() {
    formInput.map((item) => {
      if (item.checked) {
        // addRole(item)
        post.push(item.name)
      }
    })
    addRole({ ...post, name, description })
    setLoading(true)
  }

  useEffect(() => {
    // eslint-disable-next-line react/prop-types
    if (RoleReducer.roleBoolean) {
      setDescription('')
      navigate('/role')
      setLoading(false)
    }
    // eslint-disable-next-line react/prop-types
  }, [RoleReducer.current])

  return (
    <div className={'row'}>
      <h1>ADD ROLE</h1>
      <div className="col-12 mt-4">
        <div className="col-md-8 mb-4 d-flex justify-content-between offset-2">
          <div className="col-5">
            <label htmlFor="">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              className={'form-control'}
            />
          </div>
          <div className="col-5">
            <label htmlFor="">Description</label>
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              className={'form-control'}
            />
          </div>
        </div>
        {formInput.map((item) => (
          // eslint-disable-next-line react/jsx-key
          <div className={'d-flex justify-content-between col-8 offset-2'}>
            <label htmlFor={item.name}>{item.title}</label>
            <input
              type={'checkbox'}
              name={item.name}
              checked={item.checked}
              id={item.name}
              // value={post?.[item.name]}
              onChange={handleCheckboxChange}
              // onChange={(event) => setPost({ ...post, [event.target.name]: event.target.value })}
            />
          </div>
        ))}

        <div className={'d-flex justify-content-center'}>
          <button
            className={
              'd-flex align-items-center justify-content-center gap-2 btn btn-success w-25 mt-4 text-light'
            }
            onClick={send}
          >
            SEND
            {loading && (
              <div className="spinner-border" role="status">
                <span className="sr-only"></span>
              </div>
            )}
          </button>
        </div>
      </div>
      {console.log(formInput)}
    </div>
  )
}

export default connect(RoleReducer, { addRole, editRole })(Roles)
