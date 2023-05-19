import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobItemData: {},
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  updateJobDetails = data => ({
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    lifeAtCompany: {
      description: data.life_at_company.description,
      imageUrl: data.life_at_company.image_url,
    },
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    skills: data.skills.map(each => ({
      imageUrl: each.image_url,
      name: each.name,
    })),
    title: data.title,
  })

  getJobItemDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const apiURL = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiURL, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      //   console.log(fetchedData)
      const updatedData = {
        jobDetails: this.updateJobDetails(fetchedData.job_details),
        similarJobs: fetchedData.similar_jobs.map(each => ({
          companyLogoUrl: each.company_logo_url,
          employmentType: each.employment_type,
          id: each.id,
          jobDescription: each.job_description,
          location: each.location,
          rating: each.rating,
          title: each.title,
        })),
      }
      //   console.log(updatedData)
      this.setState({
        jobItemData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobItemData = () => {
    const {jobItemData} = this.state
    const {jobDetails, similarJobs} = jobItemData
    console.log(jobItemData)
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
      skills,
      lifeAtCompany,
    } = jobDetails
    const {description, imageUrl} = lifeAtCompany
    // const {} = similarJobs

    return (
      <>
        <div className="job-item-details-container">
          <div className="company-logo-container">
            <img
              className="company-logo-img"
              src={companyLogoUrl}
              alt="job details company logo"
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
          <div className="company-website-link">
            <h1 className="job-description-heading">Description</h1>
            <a href={companyWebsiteUrl} target="_blank" rel="noreferrer">
              Visit
              <FaExternalLinkAlt className="link-icon" />
            </a>
          </div>
          <p className="job-description">{jobDescription}</p>
          <div className="skills-container">
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-list">
              {skills.map(each => (
                <li className="skill-item" key={each.name}>
                  <img
                    className="skill-img"
                    src={each.imageUrl}
                    alt={each.name}
                  />
                  <p className="skill-name">{each.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="company-life-container">
            <h1 className="company-life-heading">Life at Company</h1>
            <div className="company-life-card">
              <p className="company-life-card-description">{description}</p>
              <img
                className="company-life-card-img"
                src={imageUrl}
                alt="life at company"
              />
            </div>
          </div>
        </div>
        <h1 className="similar-jobs-heading">Similar Jobs</h1>
        <div className="similar-jobs-container">
          {similarJobs.map(eachJob => (
            <SimilarJobs key={eachJob.id} jobDetails={eachJob} />
          ))}
        </div>
      </>
    )
  }

  onClickRetryBtn = () => {
    this.getJobItemDetails()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        className="failure-view-img"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-btn"
        type="button"
        onClick={this.onClickRetryBtn}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemData()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        {this.renderJobDetails()}
      </>
    )
  }
}

export default JobItemDetails
