try {
  setInterval(() => {
    try {
      document
        .querySelector(".lock__screen")
        .classList.remove("animate__fadeIn");
      document
        .querySelector(".lock__screen")
        .classList.add("animate__fadeOutUp");
      setInterval(() => {
        document.querySelector(".lock__screen").style.display = "none";
        document.querySelector(".main__screen").style.display = "block";
        document
          .querySelector(".main__screen")
          .classList.add("animate__fadeIn");
      }, 500);
    } catch (error) {
      /* empty */
    }
  }, 2000);
} catch (error) {
  /* empty */
}
