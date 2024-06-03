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

const Breadcrumbs = (getDrivers, addDrivers, editDriver, deleteDriver, DriverReducer) => {
  const [isModal, setIsModal] = useState(false)
  const toggle = () => setIsModal(!isModal)
  const [post, setPost] = useState([])
  function send() {}
  useEffect(() => {
    // console.log(DriverReducer.driver)
    // getDrivers()
  }, [])
  return (
    <div>
      <h1>Driver list</h1>
      <div className="w-25 float-end mb-3">
        <button onClick={toggle} className={'btn btn-success w-100 text-light float-end'}>
          + Add
        </button>
      </div>
      {
        <table className={'table rounded text-light bg-secondary table-hover table-striped'}>
          <thead>
            <th className={'text-center'}>T/R</th>
            <th className={'text-center'}>Name</th>
            <th className={'text-center'}>Number of load</th>
            <th className={'text-center'}>Gross Revenue</th>
            <th className={'text-center'}>Miles</th>
            <th className={'text-center'}>Dead Head</th>
            <th className={'text-center'}>Revenue Per Mile</th>
          </thead>
          <hr />
          <tbody></tbody>
        </table>
      }
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
                  onChange={(event) =>
                    setPost({ ...post, [event.target.name]: event.target.value })
                  }
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
