import './index.css'

const FilterEmploymentType = props => {
  const {item, onCheckbox} = props
  const {employmentTypeId, label} = item

  const onCheck = () => {
    onCheckbox(employmentTypeId)
  }

  return (
    <div className="emp-item">
      <input
        onChange={onCheck}
        type="checkbox"
        id={employmentTypeId}
        className="checkbox"
        value={employmentTypeId}
      />
      <label htmlFor={employmentTypeId} className="checkbox-label">
        {label}
      </label>
    </div>
  )
}

export default FilterEmploymentType
