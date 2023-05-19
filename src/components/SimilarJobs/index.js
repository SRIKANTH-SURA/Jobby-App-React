import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobs = props => {
  const {jobDetails} = props
  console.log(jobDetails)
  const {
    companyLogoUrl,
    title,
    rating,
    jobDescription,
    location,
    employmentType,
  } = jobDetails
  return (
    <div className="similar-jobs-item">
      <div className="company-logo-container">
        <img
          className="company-logo-img"
          src={companyLogoUrl}
          alt="similar job company logo"
        />
        <div className="job-title-rating-container">
          <h1 className="job-title">{title}</h1>
          <p className="job-rating">
            <AiFillStar className="star-icon" />
            {rating}
          </p>
        </div>
      </div>
      <div>
        <h1 className="job-description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </div>
      <div className="job-location-container">
        <p className="job-location">
          <MdLocationOn className="location-icon" />
          {location}
        </p>
        <p className="job-type">
          <BsFillBriefcaseFill className="job-type-icon" />
          {employmentType}
        </p>
      </div>
    </div>
  )
}

export default SimilarJobs
