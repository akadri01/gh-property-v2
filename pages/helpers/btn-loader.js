export const displayLoader = targetBtnSelector => {
  const targetBtn = document.querySelector(targetBtnSelector);
  if (!targetBtn.classList.contains("button-loader")) {
    targetBtn.classList.add("button-loader");
  }
};

export const removeLoader = targetBtnSelector => {
  const targetBtn = document.querySelector(targetBtnSelector);
  console.log(targetBtn);
  if (targetBtn.classList.contains("button-loader")) {
    targetBtn.classList.remove("button-loader");
  }
};

export const hideLoader = targetBtnSelector => {
  const targetBtn = document.querySelector(targetBtnSelector);
  targetBtn.style.visibility = "hidden";
};

export const revealLoader = targetBtnSelector => {
  const targetBtn = document.querySelector(targetBtnSelector);
  targetBtn.style.visibility = "visible";
};
