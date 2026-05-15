const calculateTotalHours = (clockIn, clockOut) => {
  return Number(((clockOut - clockIn) / (1000 * 60 * 60)).toFixed(2))
}

export default calculateTotalHours
