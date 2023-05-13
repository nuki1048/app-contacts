class DateHome {
   #dateSelector;

   #date;

   constructor(DateSelector) {
      this.#dateSelector = document.querySelector(DateSelector);
      this.#date = new Date();
   }

   // eslint-disable-next-line class-methods-use-this
   #dayToString(dayNum) {
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
         case 7:
            return "Sunday";
         default:
            return "Not Found";
      }
   }

   #monthToString(monthNum) {
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
            return "Not Found";
      }
   }

   render() {
      const day = this.#dayToString(this.#date.getDay());
      const month = this.#monthToString(this.#date.getMonth() + 1);
      const date = this.#date.getDate();
      try {
         this.#dateSelector.textContent = `${day}, ${month} ${date}`;
      } catch (error) {
         /* empty */
      }
   }
}
export default DateHome;
