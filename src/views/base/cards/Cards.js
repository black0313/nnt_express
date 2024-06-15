import React, { useEffect, useState } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { addTr, deleteTrailer, editTrailer, getTrailer } from 'src/reducer/TrailerReducer'
import { connect } from 'react-redux'
import TrailerReducer from 'src/reducer/TrailerReducer'

const Trailer = (TrailerReducer, getTrailer, editTrailer, deleteTrailer, addTr) => {
  const [isModal, setIsModal] = useState(false)
  const [post, setPost] = useState({})
  const toggle = () => setIsModal(!isModal)
  const formInput = [
    {
      name: 'truckNumber',
      title: 'Truck Number',
      type: 'text',
    },
    {
      name: 'numberOfLoads',
      title: 'Number Of Loads',
      type: 'number',
    },
    {
      name: 'grossRevenue',
      title: 'Gross Revenue',
      type: 'number',
    },
    {
      name: 'revenuePerMile',
      title: 'Revenue Per Mile',
      type: 'number',
    },
  ]
  function send() {
    addTr({ ...post, expires: true })
  }

  return (
    <div>
      <h1>Trailer list</h1>
      <div className="w-25 float-end mb-3">
        <button className={'btn btn-success w-100 text-light float-end'} onClick={toggle}>
          + Add
        </button>
      </div>
      <table className={'table rounded text-light bg-info table-hover table-striped'}>
        <thead>
          <th className={'text-center'}>T/R</th>
          <th className={'text-center'}>Trailer number</th>
          <th className={'text-center'}>Number of load</th>
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
            <h3 className={'text-info '}>Add Driver</h3>
          </ModalHeader>
          <ModalBody>
            <div className="row">
              {/*<div className="col-6">*/}
              {/*  <label htmlFor="truckNumber">* Name</label>*/}
              {/*  <input type="text" className={'form-control'} required={true} />*/}
              {/*  <label htmlFor="numberOfLoads">Number Of Loads</label>*/}
              {/*  <input type="text" className={'form-control'} />*/}
              {/*  <label htmlFor="grossRevenue">Gross Revenue</label>*/}
              {/*  <input type="text" className={'form-control'} />*/}
              {/*  <label htmlFor="expires">Expires</label>*/}
              {/*  <input type="text" className={'form-control'} />*/}
              {/*</div>*/}
              {/*<div className="col-6">*/}
              {/*  <label htmlFor="miles">Miles</label>*/}
              {/*  <input type="text" className={'form-control'} />*/}
              {/*  <label htmlFor="emptyMiles">Empty Miles</label>*/}
              {/*  <input type="text" className={'form-control'} />*/}
              {/*  <label htmlFor="revenuePerMile">Revenue PerMile</label>*/}
              {/*  <input type="text" className={'form-control'} />*/}
              {/*</div>*/}
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
            <button onClick={toggle} className={'btn btn-danger w-25 text-light'}>
              Exit
            </button>
          </ModalFooter>
        </Modal>
      }
    </div>
  )
}

export default connect(TrailerReducer, {
  getTrailer,
  editTrailer,
  addTr,
  deleteTrailer,
})(Trailer)
