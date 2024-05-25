import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaSearch} from 'react-icons/fa'
import JobItem from '../JobItem'
import './index.css'

const apiStatusConstants = {
  initial: 'INTIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
}

class JobsList extends Component {
  state = {
    jobsList: [],
    searchValue: '',
    originalSearchValue: '',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobsList()
  }

  componentDidUpdate(prevProps) {
    const {salaryRange, selectedEmploymentTypes} = this.props
    if (
      prevProps.salaryRange !== salaryRange ||
      prevProps.selectedEmploymentTypes !== selectedEmploymentTypes
    ) {
      this.getJobsList()
    }
  }

  getJobsList = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const {salaryRange, selectedEmploymentTypes} = this.props
    const {originalSearchValue} = this.state
    const employs = selectedEmploymentTypes.join(',')
    const token = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employs}&minimum_package=${salaryRange}&search=${originalSearchValue}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const updatedData = data.jobs.map(eachItem => ({
      companyLogoUrl: eachItem.company_logo_url,
      employmentType: eachItem.employment_type,
      id: eachItem.id,
      location: eachItem.location,
      packagePerAnnum: eachItem.package_per_annum,
      jobDescription: eachItem.job_description,
      rating: eachItem.rating,
      title: eachItem.title,
    }))
    if (response.ok && updatedData.length > 0) {
      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  onSearch = event => {
    event.preventDefault()
    const {searchValue} = this.state
    this.setState({originalSearchValue: searchValue}, this.getJobsList)
  }

  onChangeSearchValue = event =>
    this.setState({searchValue: event.target.value})

  onRetry = () => {
    this.getJobsList()
  }

  renderJobsList = () => {
    const {jobsList} = this.state
    return (
      <ul className="job-cards-section">
        {jobsList.map(eachItem => (
          <JobItem item={eachItem} key={eachItem.id} />
        ))}
      </ul>
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

  renderJobs = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
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
      <div className="joblist-container">
        <form className="search-container" onSubmit={this.onSearch}>
          <input
            type="search"
            placeholder="search"
            onChange={this.onChangeSearchValue}
            className="input-search"
          />
          <button
            data-testid="searchButton"
            type="submit"
            className="search-btn"
            aria-label="Search"
          >
            <FaSearch />
          </button>
        </form>
        {this.renderJobs()}
      </div>
    )
  }
}

export default JobsList
