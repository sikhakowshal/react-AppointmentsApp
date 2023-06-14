import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleStar} = props
  const {appointmentId, titleInput, date, isStarSelected} = appointmentDetails

  const starImgSrc = isStarSelected
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleStar(appointmentId)
  }

  return (
    <li className="appointment-item">
      <div className="title-container">
        <h1 className="appointment-item-title">{titleInput}</h1>
        <button
          className="star-btn"
          type="button"
          data-testid="star"
          onClick={onClickStar}
        >
          <img src={starImgSrc} alt="star" className="star-img" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
