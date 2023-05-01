/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
export default class Clock {
  constructor(timeAttribute, lockScreenTimeAttribute) {
    this.timeSelector = document.querySelector(timeAttribute);
    this.lockScreenSelector = document.querySelector(lockScreenTimeAttribute);
    this.dateStart = new Date();
  }

  getZero(num) {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    }
    return num;
  }

  updateClock(selector) {
    this.dateStart = new Date();
    const hours = this.getZero(this.dateStart.getHours());
    const minutes = this.getZero(this.dateStart.getMinutes());
    selector.textContent = "";
    selector.textContent = `${hours}:${minutes}`;
  }

  checkScreens = () => {
    if (
      window.getComputedStyle(this.lockScreenSelector.parentNode).display !==
      "none"
    ) {
      setInterval(() => {
        this.updateClock(this.lockScreenSelector);
      }, 1000);
    } else {
      setInterval(() => {
        this.updateClock(this.timeSelector);
      }, 1000);
    }
  };

  render() {
    setInterval(this.checkScreens, 500);
  }
}
