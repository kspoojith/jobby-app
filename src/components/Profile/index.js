import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstans = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN PROGRESS',
  failure: 'FAILURE',
}

class Profile extends Component {
  state = {profileDetails: {}, apiStatus: apiStatusConstans.initial}

  componentDidMount() {
    this.getProfileDetalis()
  }

  getProfileDetalis = async () => {
    this.setState({apiStatus: apiStatusConstans.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const profileDetails = data.profile_details
    const updatedDetails = {
      name: profileDetails.name,
      profileImageUrl: profileDetails.profile_image_url,
      shortBio: profileDetails.short_bio,
    }
    if (response.ok === true) {
      this.setState({
        profileDetails: updatedDetails,
        apiStatus: apiStatusConstans.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstans.failure})
    }
  }

  getProfileSection = () => {
    const {profileDetails} = this.state
    const {name, profileImageUrl, shortBio} = profileDetails
    return (
      <div className="profile-section">
        <img src={profileImageUrl} alt="profile" className="profile-img" />
        <p className="profile-name">{name}</p>
        <p className="bio">{shortBio}</p>
      </div>
    )
  }

  renderLoading = () => (
    <div className="loader-container failure-btn" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureCase = () => (
    <div className="failure-btn">
      <button type="button" className="retry-btn">
        Retry
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    let value
    switch (apiStatus) {
      case apiStatusConstans.success:
        value = this.getProfileSection()
        break
      case apiStatusConstans.inProgress:
        value = this.renderLoading()
        break
      case apiStatusConstans.failure:
        value = this.renderFailureCase()
        break
      default:
        value = null
    }
    return <div className="profile-container">{value}</div>
  }
}

export default Profile
