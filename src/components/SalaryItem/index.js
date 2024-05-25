import './index.css'

const SalaryItem = props => {
  const {item, updateSalaryState} = props
  const {salaryRangeId, label} = item
  const onRadio = () => {
    updateSalaryState(salaryRangeId)
  }
  return (
    <div className="emp-item">
      <input
        type="radio"
        value={salaryRangeId}
        name="salary"
        id={salaryRangeId}
        onChange={onRadio}
      />
      <label htmlFor={salaryRangeId} className="checkbox-label">
        {label}
      </label>
    </div>
  )
}

export default SalaryItem
