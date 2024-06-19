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
// eslint-disable-next-line react/prop-types
function Colors({
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
}) {
  const [isModal, setIsModal] = useState(false)
  const [post, setPost] = useState({})
  const [dispatcherId, setDispatcherId] = useState(null)
  const [statusvalue, setStatusvalue] = useState(false)
  useEffect(() => {
    getDispatchers()
    // eslint-disable-next-line react/prop-types
  }, [DispatcherReducer.current])

  const formInput = [
    {
      name: 'name',
      title: 'Name',
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
      name: 'openLoads',
      title: 'Loads',
      type: 'number',
    },
  ]

  function send() {
    if (dispatcherId) {
      editDispatcher({ ...post, id: dispatcherId })
    } else {
      addDispatcher({ ...post })
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
      <table className={'table rounded text-light bg-primary table-hover table-striped'}>
        <thead>
          <th className={'text-center'}>T/R</th>
          <th className={'text-center'}>Name</th>
          <th className={'text-center'}>Dispatch team</th>
          <th className={'text-center'}>Gross Revenue</th>
          <th className={'text-center'}>Miles</th>
          <th className={'text-center'}>Dead Head</th>
          <th className={'text-center'}>Revenue Per Mile</th>
        </thead>
        <hr />
        <tbody></tbody>
      </table>

      {
        <Modal isOpen={isModal} toggle={toggle} size={'lg'} scrollable={true}>
          <ModalHeader>
            <h3 className={'text-info '}>Add Truck</h3>
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
            </div>
          </ModalBody>
          <ModalFooter>
            <button className={'btn btn-success text-light w-25'}>Save</button>
            <button onClick={toggle} className={'btn btn-danger w-25 text-light'}>
              Exit
            </button>
          </ModalFooter>
        </Modal>
      }
    </div>
  )
}

export default connect(DispatcherReducer, {
  getDispatchers,
  getDispatcher,
  addDispatcher,
  editDispatcher,
  deleteDispatcher,
})(Colors)
