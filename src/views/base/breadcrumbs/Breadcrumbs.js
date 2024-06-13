import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import DriverReducer, {
  addDrivers,
  deleteDriver,
  editDriver,
  getDrivers,
} from 'src/reducer/DriverReducer'
import { connect } from 'react-redux'
import 'react-toastify/dist/ReactToastify.css'

// eslint-disable-next-line react/prop-types
const Breadcrumbs = ({ getDrivers, addDrivers, editDriver, deleteDriver, DriverReducer }) => {
  const [isModal, setIsModal] = useState(false)
  const toggle = () => setIsModal(!isModal)
  const [post, setPost] = useState([])

  useEffect(() => {
    getDrivers()
    // eslint-disable-next-line react/prop-types
  }, [DriverReducer.current])
  function handleDelete(id) {
    deleteDriver(id)
  }
  const [files, setFile] = useState(null)
  const [fileName, setFilename] = useState('')
  const [fileSize, setFileSize] = useState('')
  function handleFile(event) {
    console.log(event.target.files[0])
    setFile(event.target.files[0])
    setFilename(event.target.files[0].name)
    setFileSize(event.target.files[0].size)
  }

  function send() {
    const formData = new FormData()
    formData.append('file', files)
    formData.append('driver', JSON.stringify(post))
    addDrivers(formData)
    toggle()
  }

  return (
    <div>
      <h1>Driver list</h1>
      <div className="w-25 float-end mb-3">
        <button onClick={toggle} className={'btn btn-success w-100 text-light float-end'}>
          + Add
        </button>
      </div>
      {/* eslint-disable-next-line react/prop-types */}
      {DriverReducer.driver ? (
        <table className={'table rounded text-light bg-secondary table-hover table-striped'}>
          <thead>
            <th className={'text-center'}>T/R</th>
            <th className={'text-center'}>Name</th>
            <th className={'text-center'}>Number of load</th>
            <th className={'text-center'}>Gross Revenue</th>
            <th className={'text-center'}>Miles</th>
            <th className={'text-center'}>Actions</th>
          </thead>
          <hr />
          <tbody>
            {/* eslint-disable-next-line react/prop-types */}
            {DriverReducer.driver.map((item, index) => (
              <tr key={index}>
                <td className={'text-center'}>{index + 1}</td>
                <td className={'text-center'}>{item.name}</td>
                <td className={'text-center'}>{item.numberOfLoads}</td>
                <td className={'text-center'}>{item.grossRevenue}</td>
                <td className={'text-center'}>{item.miles}</td>
                <td className={'text-center'}>
                  <button className={'btn btn-primary'}>Edit</button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className={'btn text-light btn-danger ms-2'}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h1 className={'text-center text-light mt-5'}>TABLE IS EMPTY</h1>
      )}
      {
        <Modal isOpen={isModal} toggle={toggle} size={'lg'} scrollable={true}>
          <ModalHeader>
            <h3 className={'text-info '}>Add Driver</h3>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              <div className="col-6">
                <label htmlFor="name">* Name</label>
                <input
                  name={'name'}
                  onChange={(event) =>
                    setPost({ ...post, [event.target.name]: event.target.value })
                  }
                  type="text"
                  className={'form-control'}
                  required={true}
                />
                <label htmlFor="numberOfLoads">Number Of Loads</label>
                <input
                  name={'numberOfLoads'}
                  onChange={(event) =>
                    setPost({ ...post, [event.target.name]: event.target.value })
                  }
                  type="text"
                  className={'form-control'}
                />
                <label htmlFor="grossRevenue">Gross Revenue</label>
                <input
                  name={'grossRevenue'}
                  onChange={(event) =>
                    setPost({ ...post, [event.target.name]: event.target.value })
                  }
                  type="text"
                  className={'form-control'}
                />
                <label htmlFor="expires">Expires</label>
                <input
                  name={'expires'}
                  // onChange={(event) =>
                  //   setPost({ ...post, [event.target.name]: event.target.value })
                  // }
                  type="text"
                  className={'form-control'}
                />
              </div>
              <div className="col-6">
                <label htmlFor="miles">Miles</label>
                <input
                  name={'miles'}
                  onChange={(event) =>
                    setPost({ ...post, [event.target.name]: event.target.value })
                  }
                  type="text"
                  className={'form-control'}
                />
                <label htmlFor="emptyMiles">Empty Miles</label>
                <input
                  name={'emptyMiles'}
                  onChange={(event) =>
                    setPost({ ...post, [event.target.name]: event.target.value })
                  }
                  type="text"
                  className={'form-control'}
                />
                <label htmlFor="revenuePerMile">Revenue PerMile</label>
                <input
                  name={'revenuePerMile'}
                  onChange={(event) =>
                    setPost({ ...post, [event.target.name]: event.target.value })
                  }
                  type="text"
                  className={'form-control'}
                />
                <label htmlFor="medical">Medical card</label>
                <input className={'form-control'} type="file" onChange={handleFile} />
              </div>
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

// export default Breadcrumbs
export default connect(DriverReducer, { getDrivers, addDrivers, editDriver, deleteDriver })(
  Breadcrumbs,
)
