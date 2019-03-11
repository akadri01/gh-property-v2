/**
 * Inserts buttons loader background image
 */
export function displayLoader(targetBtnSelector) {
  const targetBtn = document.querySelector(targetBtnSelector);
  if (!targetBtn.classList.contains("button-loader")) {
    targetBtn.classList.add("button-loader");
  }
}

export function removeLoader(targetBtnSelector) {
  const targetBtn = document.querySelector(targetBtnSelector);
  if (targetBtn.classList.contains("button-loader")) {
    targetBtn.classList.remove("button-loader");
  }
}

export function hideLoader(targetBtnSelector) {
  const targetBtn = document.querySelector(targetBtnSelector);
  targetBtn.style.visibility = "hidden";
}

export function revealLoader(targetBtnSelector) {
  const targetBtn = document.querySelector(targetBtnSelector);
  targetBtn.style.visibility = "visible";
}
