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
import TruckReducer, { getTrucks } from 'src/reducer/TruckReducer'
import AttachmentReducer, { addFile } from 'src/reducer/AttachmentReducer'

// eslint-disable-next-line react/prop-types
const Breadcrumbs = ({
  // eslint-disable-next-line react/prop-types
  getDrivers,
  // eslint-disable-next-line react/prop-types
  addDrivers,
  // eslint-disable-next-line react/prop-types
  TruckReducer,
  // eslint-disable-next-line react/prop-types
  editDriver,
  // eslint-disable-next-line react/prop-types
  deleteDriver,
  // eslint-disable-next-line react/prop-types
  DriverReducer,
  // eslint-disable-next-line react/prop-types
  getTrucks,
  // eslint-disable-next-line react/prop-types
  AttachmentReducer,
  // eslint-disable-next-line react/prop-types
  addFile,
}) => {
  const [isModal, setIsModal] = useState(false)
  const [truckId, setTruckId] = useState(null)
  const toggle = () => setIsModal(!isModal)
  const [post, setPost] = useState({})

  const formInput = [
    {
      name: 'driverName',
      title: 'Name',
      type: 'text',
    },
    {
      name: 'driverPhone',
      title: 'Phone',
      type: 'number',
    },
    {
      name: 'driverEmail',
      title: 'Email',
      type: 'text',
    },
    {
      name: 'zipCode',
      title: 'Zip code',
      type: 'number',
    },
    {
      name: 'dateOfBirth',
      title: 'Birthdate',
      type: 'date',
    },
    {
      name: 'country',
      title: 'Country',
      type: 'text',
    },
    {
      name: 'city',
      title: 'City',
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
    {
      name: 'postalCode',
      title: 'PostalCode',
      type: 'text',
    },
  ]

  useEffect(() => {
    getDrivers()
    getTrucks()
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
    const data = new FormData()
    data.append('file', event.target.files[0])
    addFile(data)
  }

  function send() {
    const formData = new FormData()
    // formData.append("file", files);
    const data = {
      ...post,
      truckId,
      // eslint-disable-next-line react/prop-types
      photoId: AttachmentReducer.fileId,
      addressDto: {
        country: post.country,
        city: post.city,
        postalCode: post.postalCode,
        state: post.state,
        street: post.street,
      },
    }
    // formData.append("driverDto", JSON.stringify(data));
    addDrivers(data)
    toggle()
    console.log(files)
  }

  return (
    <div>
      <h1>Driver list</h1>
      <div className="w-25 float-end mb-5">
        <button onClick={toggle} className={'btn btn-success w-100 text-light float-end'}>
          + Add
        </button>
      </div>
      {/* eslint-disable-next-line react/prop-types */}
      {DriverReducer.drivers ? (
        <table className={'table rounded text-light bg-secondary table-hover table-striped'}>
          <thead>
            <th className={'text-center'}>T/R</th>
            <th className={'text-center'}>Name</th>
            <th className={'text-center'}>Email</th>
            <th className={'text-center'}>Phone</th>
            <th className={'text-center'}>Zip code</th>
            <th className={'text-center'}>Actions</th>
          </thead>
          <hr />
          <tbody>
            {/* eslint-disable-next-line react/prop-types */}
            {DriverReducer.drivers?.map((item, index) => (
              <tr key={index}>
                <td className={'text-center'}>{index + 1}</td>
                <td className={'text-center'}>{item?.driverName}</td>
                <td className={'text-center'}>{item?.driverEmail}</td>
                <td className={'text-center'}>{item?.driverPhone}</td>
                <td className={'text-center'}>{item?.zipCode}</td>
                <td className={'text-center d-flex justify-content-around'}>
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
        <h1 className={'text-center text-light bg-secondary-subtle mt-5 w-50 mx-auto'}>
          TABLE IS EMPTY
        </h1>
      )}
      {
        <Modal isOpen={isModal} toggle={toggle} size={'lg'} scrollable={true}>
          <ModalHeader>
            <h3 className={'text-info '}>Add Driver</h3>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              {formInput.map((item) => (
                // eslint-disable-next-line react/jsx-key
                <div className={'col-6'} key={item.name}>
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
                <label htmlFor="medical">Medical card</label>
                <input className={'form-control'} type="file" onChange={handleFile} />
              </div>
              <div className={'p-2'}>
                <label htmlFor="">Truck</label>
                <select
                  value={truckId}
                  onChange={(e) => setTruckId(e.target.value)}
                  id=""
                  className={'form-control'}
                >
                  <option value="choose">Choose truck</option>
                  {
                    // eslint-disable-next-line react/prop-types
                    TruckReducer.trucks ? (
                      // eslint-disable-next-line react/prop-types
                      TruckReducer?.trucks.map((item) => (
                        // eslint-disable-next-line react/jsx-key
                        <option value={item.id}>{item?.truckNumber}</option>
                      ))
                    ) : (
                      <option value="">NOT FIEND</option>
                    )
                  }
                </select>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            {truckId !== null && truckId !== 'choose' ? (
              <button onClick={send} className={'btn btn-success text-light w-25'}>
                Save
              </button>
            ) : (
              <button disabled onClick={send} className={'btn btn-warning text-light w-25'}>
                Save
              </button>
            )}
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
export default connect((DriverReducer, TruckReducer, AttachmentReducer), {
  getDrivers,
  addDrivers,
  editDriver,
  deleteDriver,
  getTrucks,
  addFile,
})(Breadcrumbs)
