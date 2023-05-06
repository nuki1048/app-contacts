class HomeIndicator {
   constructor(options) {
      this.HomeIndicator = document.querySelector(options.selector);
      this.lockScreen = document.querySelector(options.sectionOne);
      this.homeScreen = document.querySelector(options.sectionTwo);
   }

   render() {
      try {
         this.HomeIndicator.addEventListener("click", () => {
            this.lockScreen.classList.remove("animate__fadeIn");
            this.lockScreen.classList.add("animate__fadeOutUp");
            setTimeout(() => {
               this.lockScreen.style.display = "none";
               this.homeScreen.style.display = "block";
               this.homeScreen.classList.add("animate__fadeIn");
            });
         });
      } catch (error) {
         /* empty */
      }
   }
}
export default HomeIndicator;
