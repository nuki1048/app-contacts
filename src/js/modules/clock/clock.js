/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
export default class Clock {
   #clockAttribute;

   #date;

   constructor(clockAttribute) {
      try {
         this.#clockAttribute = document.querySelector(clockAttribute);
      } catch (error) {
         /* empty */
      }
      this.#date = new Date();
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

   render() {
      this.updateClock(this.#clockAttribute);
      setInterval(() => {
         this.updateClock(this.#clockAttribute);
      }, 1000);
   }
}
