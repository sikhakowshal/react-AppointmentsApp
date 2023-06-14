import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    date: '',
    dateInput: '',
    isStarredActive: false,
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    const dateString = event.target.value
    const date = new Date(dateString)
    const formattedDate = format(date, 'dd MMMM yyyy, EEEE')
    this.setState({date: formattedDate, dateInput: event.target.value})
  }

  addAppointment = event => {
    event.preventDefault()
    const {titleInput, date} = this.state

    const newAppointment = {
      appointmentId: v4(),
      titleInput,
      date,
      isStarSelected: false,
    }

    this.setState(preState => ({
      appointmentsList: [...preState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onClickStarredButton = () => {
    this.setState(preState => ({
      isStarredActive: !preState.isStarredActive,
    }))
  }

  toggleStar = id => {
    this.setState(preState => ({
      appointmentsList: preState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.appointmentId === id) {
          return {
            ...eachAppointment,
            isStarSelected: !eachAppointment.isStarSelected,
          }
        }
        return eachAppointment
      }),
    }))
  }

  render() {
    const {
      appointmentsList,
      titleInput,
      dateInput,
      isStarredActive,
    } = this.state

    let filteredList
    if (isStarredActive) {
      filteredList = appointmentsList.filter(
        each => each.isStarSelected === true,
      )
    } else {
      filteredList = appointmentsList
    }

    const starredButtonActive = isStarredActive ? 'active' : ''

    return (
      <div className="bg-container">
        <div className="app-container">
          <div className="form-img-container">
            <form className="form" onSubmit={this.addAppointment}>
              <h1 className="app-title">Add Appointment</h1>
              <label className="input-label" htmlFor="nameInput">
                TITLE
              </label>
              <input
                type="text"
                id="nameInput"
                className="name-input"
                value={titleInput}
                placeholder="Title"
                onChange={this.onChangeTitleInput}
              />
              <label className="input-label" htmlFor="dateInput">
                DATE
              </label>
              <input
                type="date"
                id="dateInput"
                className="date-input"
                value={dateInput}
                placeholder="dd/mm/yy"
                onChange={this.onChangeDateInput}
              />
              <button className="add-btn" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="app-img"
            />
          </div>
          <hr className="line" />
          <div className="appointments-heading-container">
            <h1 className="heading">Appointments</h1>
            <button
              className={`starred-btn ${starredButtonActive}`}
              type="button"
              onClick={this.onClickStarredButton}
            >
              Starred
            </button>
          </div>
          <ul className="appointments-list">
            {filteredList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.appointmentId}
                appointmentDetails={eachAppointment}
                toggleStar={this.toggleStar}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
