import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import UserProfile from '../UserProfile'
import JobsFilter from '../JobsFilter'
import JobCard from '../JobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    jobsList: [],
    apiStatus: apiStatusConstants.initial,
    selectedEmployTypes: [],
    activeSalaryRangeId: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getJobsList()
  }

  getJobsList = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {selectedEmployTypes, activeSalaryRangeId, searchInput} = this.state
    const employmentTypes = selectedEmployTypes.join(',')
    console.log(employmentTypes)

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentTypes}&minimum_package=${activeSalaryRangeId}&search=${searchInput}`

    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(eachJob => ({
        id: eachJob.id,
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))

      this.setState({
        jobsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderNoJobsView = () => (
    <div className="no-jobs-container">
      <img
        className="no-jobs-img"
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-description">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderJobsList = () => {
    const {jobsList} = this.state
    return jobsList.length === 0 ? (
      this.renderNoJobsView()
    ) : (
      <div className="jobs-list-container">
        {jobsList.map(eachJob => (
          <JobCard key={eachJob.id} jobDetails={eachJob} />
        ))}
      </div>
    )
  }

  onClickRetryBtn = () => {
    this.getJobsList()
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
        We cannot seem to find the page you are looking for
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

  renderJobsListComponent = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  selectEmploymentType = event => {
    const {value} = event.target
    const {selectedEmployTypes} = this.state
    let currentList = selectedEmployTypes

    if (event.target.checked) {
      currentList.push(value)
    } else {
      currentList = selectedEmployTypes.filter(each => each !== value)
    }

    // console.log(currentList)
    this.setState({selectedEmployTypes: currentList}, this.getJobsList)
  }

  selectSalaryRange = value => {
    // console.log(value)
    this.setState({activeSalaryRangeId: value}, this.getJobsList)
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchIcon = () => {
    this.getJobsList()
  }

  render() {
    const {searchInput} = this.state
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="jobs-page">
            <div className="profile-filters-container">
              <div className="search-mobile-input-container">
                <input
                  className="search-input"
                  type="search"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
                <button
                  className="search-icon-btn"
                  type="button"
                  data-testid="searchButton"
                  onClick={this.onClickSearchIcon}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              <div className="user-profile-container">
                <UserProfile />
              </div>
              <JobsFilter
                selectEmploymentType={this.selectEmploymentType}
                selectSalaryRange={this.selectSalaryRange}
              />
            </div>

            <div className="jobs-list-section">
              <div className="search-desktop-input-container">
                <input
                  className="search-input"
                  type="search"
                  placeholder="Search"
                  value={searchInput}
                  onChange={this.onChangeSearchInput}
                />
                <button
                  className="search-icon-btn"
                  type="button"
                  data-testid="searchButton"
                  onClick={this.onClickSearchIcon}
                >
                  <BsSearch className="search-icon" />
                </button>
              </div>
              {this.renderJobsListComponent()}
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
