import {Component} from 'react'
import Profile from '../Profile'
import Header from '../Header'
import FilterEmploymentType from '../FilterEmploymentType'
import SalaryItem from '../SalaryItem'
import JobsList from '../JobsList'

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

class Jobs extends Component {
  state = {
    selectedEmploymentTypes: [],
    salaryRange: '',
  }

  onCheckbox = value => {
    this.setState(prevState => {
      const isAlreadySelected = prevState.selectedEmploymentTypes.includes(
        value,
      )
      if (isAlreadySelected) {
        return {
          selectedEmploymentTypes: prevState.selectedEmploymentTypes.filter(
            type => type !== value,
          ),
        }
      }
      return {
        selectedEmploymentTypes: [...prevState.selectedEmploymentTypes, value],
      }
    })
  }

  updateSalaryState = value => this.setState({salaryRange: value})

  getEmpoymentTypeFilterSection = () => (
    <div>
      {employmentTypesList.map(eachItem => (
        <FilterEmploymentType
          item={eachItem}
          onCheckbox={this.onCheckbox}
          key={eachItem.employmentTypeId}
        />
      ))}
    </div>
  )

  getSalaryFilterSection = () => (
    <div>
      {salaryRangesList.map(eachItem => (
        <SalaryItem
          item={eachItem}
          updateSalaryState={this.updateSalaryState}
          key={eachItem.salaryRangeId}
        />
      ))}
    </div>
  )

  render() {
    const {selectedEmploymentTypes, salaryRange} = this.state
    return (
      <div className="jobs-container">
        <Header />
        <div className="jobs-content">
          <div className="filters-section">
            <Profile />
            <hr className="line" />
            <div className="filter-employment">
              <h1 className="type-heading">Type of Employment</h1>
              {this.getEmpoymentTypeFilterSection()}
            </div>
            <hr className="line" />
            <div className="filter-employment">
              <h1 className="type-heading">Salary Range</h1>
              {this.getSalaryFilterSection()}
            </div>
          </div>
          <JobsList
            salaryRange={salaryRange}
            selectedEmploymentTypes={selectedEmploymentTypes}
          />
        </div>
      </div>
    )
  }
}

export default Jobs
