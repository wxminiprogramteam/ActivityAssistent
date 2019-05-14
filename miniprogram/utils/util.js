function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  var hour = date.getHours()
  var minute = date.getMinutes()
  if (minute < 10) minute = "0" + minute
  return month + "月" + day + "日 " + hour + ":" + minute;
}

module.exports = {
  formatTime: formatTime
}