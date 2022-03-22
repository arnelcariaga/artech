export function dateFormat(dateTime) {
  var date = new Date(dateTime);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var dt = date.getDate();

  if (dt < 10) {
    dt = "0" + dt;
  }
  if (month < 10) {
    month = "0" + month;
  }

  return dt + "-" + month + "-" + year;
}
