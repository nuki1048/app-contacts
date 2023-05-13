const Tabs = (tabHeader, tabsSelector, tabsContentSelector, activeClass) => {
  const tabs = document.querySelectorAll(tabsSelector);
  const header = document.querySelector(tabHeader);
  const tabsContent = document.querySelectorAll(tabsContentSelector);

  function hideTabContent() {
    tabsContent.forEach((item) => {
      // eslint-disable-next-line no-param-reassign
      item.style.display = "none";
    });
    tabs.forEach((item) => {
      item.classList.remove(activeClass);
    });
  }
  function showTabContent(i = 0) {
    tabsContent[i].style.display = "block";
    tabs[i].classList.add(activeClass);
  }
  hideTabContent();
  showTabContent();
  header.addEventListener("click", (e) => {
    const { target } = e;
    if (
      (target && target.classList.contains(tabsSelector.slice(1))) ||
      target.parentNode.classList.contains(tabsSelector.slice(1))
    ) {
      tabs.forEach((item, i) => {
        if (target === item || target.parentNode === item) {
          hideTabContent();
          showTabContent(i);
        }
      });
    }
  });
};
export default Tabs;
