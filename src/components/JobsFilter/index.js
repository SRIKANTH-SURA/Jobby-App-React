import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const JobsFilter = props => {
  const renderEmploymentTypeList = () => {
    const {selectEmploymentType} = props

    return (
      <>
        <h1 className="employment-type-heading">Type of Employment</h1>
        <ul className="employment-type-list">
          {employmentTypesList.map(each => (
            <li className="employment-type-item" key={each.employmentTypeId}>
              <input
                className="employment-type-checkbox"
                id={each.employmentTypeId}
                type="checkbox"
                value={each.employmentTypeId}
                onChange={event => selectEmploymentType(event)}
              />
              <label
                className="employment-type-label"
                htmlFor={each.employmentTypeId}
              >
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </>
    )
  }

  const renderSalaryRangeList = () => {
    const {selectSalaryRange} = props
    return (
      <>
        <h1 className="salary-range-heading">Salary Range</h1>
        <ul className="salary-range-list">
          {salaryRangesList.map(each => (
            <li className="salary-range-item" key={each.salaryRangeId}>
              <input
                className="salary-range-checkbox"
                id={each.salaryRangeId}
                name="salaryRange"
                type="radio"
                value={each.salaryRangeId}
                onChange={() => selectSalaryRange(each.salaryRangeId)}
              />
              <label
                className="salary-range-label"
                htmlFor={each.salaryRangeId}
              >
                {each.label}
              </label>
            </li>
          ))}
        </ul>
      </>
    )
  }

  return (
    <div className="jobs-filters-container">
      {renderEmploymentTypeList()}
      {renderSalaryRangeList()}
    </div>
  )
}

export default JobsFilter
