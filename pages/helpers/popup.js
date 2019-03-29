export const popupWindow = (idSelector, message) => {
  // Add script to make the popup removable
  const script =
    "function removePopup(){var elm = document.querySelector('.popup-window');elm.parentNode.removeChild(elm);}";
  const scriptTag = document.createElement("script");
  scriptTag.type = "text/javascript";
  scriptTag.className = "popup-script-tag";
  scriptTag.appendChild(document.createTextNode(script));
  document.body.appendChild(scriptTag);

  // remove if any existing popup scripts
  document.querySelectorAll(".popup-script-tag").forEach(elm => {
    elm.parentNode.removeChild(elm);
  });

  // create new pop up
  const parentElm = document.getElementById(idSelector)
    ? document.getElementById(idSelector)
    : document.body;
  const popupHtml = `
    <section class="popup-window" onclick="removePopup()">
      <div>
          <img src="/static/images/icons/popup-close.svg"/>
          <h3>${message ? message : "Error!"}</h3>
      </div>
    </section>
  `;
  parentElm.insertAdjacentHTML("beforeend", popupHtml);
};

// Check query whether page requires popup
export const checkForPopup = () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.has("popup")) {
    const popupMessage = urlParams.get("popup");
    return popupWindow(undefined, popupMessage);
  }
};
