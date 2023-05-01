import Clock from "./modules/clock/clock";
import HomeIndicator from "./modules/homeIndicator/homeIndicator";

document.addEventListener("DOMContentLoaded", () => {
   const mainClock = new Clock("[data-timeClock]", "[data-timeLock]");
   const home = new HomeIndicator({
      selector: "[data-homeIndicator]",
      sectionOne: ".lock__screen",
      sectionTwo: ".main__screen",
   });
   mainClock.render();
   home.render();
});
