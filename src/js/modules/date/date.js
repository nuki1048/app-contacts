/* eslint-disable class-methods-use-this */
class DateLockScreen {
  constructor() {
    this.dateSelector = document.querySelector(".lock__screen_date");
    this.date = new Date();
  }

  monthToString(monthNum) {
    switch (monthNum) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "Not found";
    }
  }

  dayToString(dayNum) {
    switch (dayNum) {
      case 1:
        return "Monday";
      case 2:
        return "Tuesday";
      case 3:
        return "Wednesday";
      case 4:
        return "Thursday";
      case 5:
        return "Friday";
      case 6:
        return "Saturday";
      case 8:
        return "Sunday";
      default:
        return "Not found";
    }
  }

  render() {
    const day = this.dayToString(this.date.getDay());
    const month = this.monthToString(this.date.getMonth() + 1);
    const dayOfMonth = this.date.getDate();
    this.dateSelector.textContent = `${day}, ${month} ${dayOfMonth}`;
  }
}
export default DateLockScreen;
