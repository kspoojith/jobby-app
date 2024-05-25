import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaStar, FaExternalLinkAlt} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INTIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    lac: {},
    similarJobs: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobDetails()
  }

  onRetry = () => {
    this.getJobDetails()
  }

  getJobDetails = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = {
      jobDetails: data.job_details,
      similarJobs: data.similar_jobs,
    }
    const {jobDetails, similarJobs} = updatedData
    const updatedDataJobDetails = {
      id: jobDetails.id,
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      jobDescription: jobDetails.job_description,
      lifeAtCompany: jobDetails.life_at_company,
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      skills: jobDetails.skills
        ? jobDetails.skills.map(skill => ({
            imageUrl: skill.image_url,
            name: skill.name,
          }))
        : [],
      title: jobDetails.title,
    }
    const {lifeAtCompany} = updatedDataJobDetails
    console.log(lifeAtCompany)
    if (response.ok === true) {
      this.setState({
        jobDetails: updatedDataJobDetails,
        lac: lifeAtCompany,
        similarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderJobDetails = () => {
    const {jobDetails, lac, similarJobs} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      skills,
      title,
    } = jobDetails
    return (
      <div className="job-details-container">
        <div className="job-details-content">
          <div className="company-head">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div className="naming">
              <h1 className="company-title">{title}</h1>
              <div className="rating-line">
                <FaStar className="star" />
                <p className="rating-txt">{rating}</p>
              </div>
            </div>
          </div>
          <div className="job-points">
            <div className="job-type">
              <IoLocationSharp className="map-icon" />
              <p className="job-location">{location}</p>
              <BsBriefcaseFill className="job-icon" />
              <p className="job-location">{employmentType}</p>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="job-line" />
          <div className="description-box">
            <h1 className="description-heading">Description</h1>
            <a className="visit-link" href={companyWebsiteUrl}>
              <p>Visit</p>
              <FaExternalLinkAlt />
            </a>
          </div>
          <p className="life-at-company-description">{jobDescription}</p>
          <h1 className="skill-heading">Skills</h1>
          <ul className="skills-container">
            {skills &&
              skills.map(eachItem => (
                <li className="skill-card" key={eachItem.name}>
                  <img
                    src={eachItem.imageUrl}
                    className="skill-img"
                    alt={eachItem.name}
                  />
                  <p className="skill-name">{eachItem.name}</p>
                </li>
              ))}
          </ul>
          <h1 className="skill-heading">Life At Company</h1>
          <div className="life-at-company">
            <p className="life-at-company-description">{lac.description}</p>
            <img
              src={lac.image_url}
              className="lac-img"
              alt="life at company"
            />
          </div>
        </div>
        <div className="similar-jobs-container">
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <ul className="similar-jobs-content">
            {similarJobs.map(eachItem => (
              <SimilarJobCard item={eachItem} key={eachItem.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderLoading = () => (
    <div className="loader-container jobs-loading" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureCase = () => (
    <div className="jobs-failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png "
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-hed">Oops! Something Went Wrong</p>
      <p className="failure-txt">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" onClick={this.onRetry} className="retry-btn">
        Retry
      </button>
    </div>
  )

  renderDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderFailureCase()
      case apiStatusConstants.inProgress:
        return this.renderLoading()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-details-container">
        <Header />
        {this.renderDetails()}
      </div>
    )
  }
}

export default JobItemDetails
