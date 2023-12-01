const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener("keydown", changeTabFocus);

tabs.forEach((tab) => {
  tab.addEventListener("click", changeTabPanel);
});

let tabFocus = 0;

function changeTabFocus(e) {
  const keydownLeft = 37;
  const keydownRight = 39;

  const key = e.keyCode;

  if (key != keydownLeft && key !== keydownRight) return;

  tabs[tabFocus].setAttribute("tabindex", -1);

  if (key === keydownRight) {
    // if the right key is pushed, move to the next tab on the right
    tabFocus = (tabFocus + 1) % tabs.length;
  } else {
    // if the left key is pushed, move to the next tab on the left
    tabFocus = (tabFocus - 1 + tabs.length) % tabs.length;
  }

  tabs[tabFocus].setAttribute("tabindex", 0);
  tabs[tabFocus].focus();
}

function changeTabPanel(e) {
  const targetTab = e.target;

  console.log(targetTab);

  const targetPanel = targetTab.getAttribute("aria-controls");
  const targetImage = targetTab.getAttribute("data-image");

  const tabContainer = targetTab.parentNode;
  const mainContainer = tabContainer.parentNode;

  tabContainer
    .querySelector('[aria-selected="true"]')
    .setAttribute("aria-selected", false);

  targetTab.setAttribute("aria-selected", true);

  hideContent(mainContainer, '[role="tabpanel"]');
  showContent(mainContainer, [`#${targetPanel}`]);

  hideContent(mainContainer, "picture");
  showContent(mainContainer, [`#${targetImage}`]);
}

function hideContent(parent, content) {
  parent
    .querySelectorAll(content)
    .forEach((item) => item.classList.add("hidden"));
}

function showContent(parent, content) {
  parent.querySelector(content).classList.remove("hidden");
}
