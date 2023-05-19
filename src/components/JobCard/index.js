import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const JobCard = props => {
  const {jobDetails} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <Link className="job-card-link" to={`/jobs/${id}`}>
      <div className="job-card">
        <div className="company-logo-container">
          <img
            className="company-logo-img"
            src={companyLogoUrl}
            alt="company logo"
          />
          <div className="job-title-rating-container">
            <h1 className="job-title">{title}</h1>
            <p className="job-rating">
              <AiFillStar className="star-icon" />
              {rating}
            </p>
          </div>
        </div>

        <div className="job-location-salary-container">
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
          <p className="job-package">{packagePerAnnum}</p>
        </div>

        <div>
          <h1 className="job-description-heading">Description</h1>
          <p className="job-description">{jobDescription}</p>
        </div>
      </div>
    </Link>
  )
}

export default JobCard
