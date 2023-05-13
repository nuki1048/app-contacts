import Clock from "./modules/clock/clock";

import DateHome from "./modules/date/Date";

import HomeIndicator from "./modules/homeIndicator/homeIndicator";
import Tabs from "./modules/tabs/Tabs";

import PhoneDirectory from "./modules/phoneDirectory/PhoneDirectory";

document.addEventListener("DOMContentLoaded", () => {
  const statusBarTimeClock = new Clock("[data-timeClock]");
  setInterval(() => {
    try {
      const lockScreenTimeClock = new Clock("[data-timeLock]");
      if (
        window.getComputedStyle(
          document.querySelector("[data-timeLock]").parentNode
        ).display !== "none"
      ) {
        lockScreenTimeClock.render();
      } else {
        statusBarTimeClock.render();
      }
    } catch (error) {
      /* empty */
      statusBarTimeClock.render();
    }
  }, 500);
  const date = new DateHome(".lock__screen_date");
  date.render();

  const home = new HomeIndicator({
    selector: "[data-homeIndicator]",
    sectionOne: ".lock__screen",
    sectionTwo: ".main__screen",
  });

  home.render(); // Ці два класса зроблені чисто для UI
  try {
    Tabs(
      ".contacts__bottomActions",
      ".icon__contactsBottomAction",
      ".tab__selector",
      "icon__contactsBottomAction-active"
    );
  } catch (e) {
    /* empty */
  }
  const telephone = new PhoneDirectory("IPHONE_14", "mobile");
  telephone.render();
});
