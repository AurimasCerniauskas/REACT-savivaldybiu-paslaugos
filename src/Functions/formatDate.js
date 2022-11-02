const formatDate = (dateString)=>{
  const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'}
  return new Date(dateString).toLocaleDateString('lt-LT', options)
}

export default formatDate;