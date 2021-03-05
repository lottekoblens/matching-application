const button = document.getElementById('button1');
button.addEventListener('submit', clickedLike);
const popup = document.getElementById('LikedPopup');

function clickedLike() {
  window.setTimeout(hidePopup(), 2000);
  popup.classList.add('show');
}

function hidePopup() {
  popup.classList.remove('show');
}
