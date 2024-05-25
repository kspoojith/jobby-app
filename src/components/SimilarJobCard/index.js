import {FaStar} from 'react-icons/fa'
import {IoLocationSharp} from 'react-icons/io5'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobCard = props => {
  const {item} = props
  const updatedData = {
    companyLogoUrl: item.company_logo_url,
    employmentType: item.employment_type,
    id: item.id,
    jobDescription: item.job_description,
    location: item.location,
    rating: item.rating,
    title: item.title,
  }
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = updatedData
  return (
    <li className="similar-item">
      <div className="company-head">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
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
      <h1 className="description-heading">Description</h1>
      <p className="description">{jobDescription}</p>
      <div className="job-type">
        <IoLocationSharp className="map-icon" />
        <p className="job-location">{location}</p>
        <BsBriefcaseFill className="job-icon" />
        <p className="job-location">{employmentType}</p>
      </div>
    </li>
  )
}

export default SimilarJobCard
