import {Link} from 'react-router-dom'
import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const JobItem = props => {
  const {item} = props
  const {
    companyLogoUrl,
    id,
    employmentType,
    location,
    packagePerAnnum,
    jobDescription,
    rating,
    title,
  } = item
  return (
    <Link className="nav-link" to={`/jobs/${id}`}>
      <li className="li">
        <div className="company-head">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <h1 className="description-heading">Description</h1>
        <p className="description">{jobDescription}</p>
      </li>
    </Link>
  )
}
export default JobItem
