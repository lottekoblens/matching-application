const kkfkfkgj = document.getElementById('like');
kkfkfkgj.addEventListener('submit', clickedLike);
const popup = document.getElementById('LikedPopup');

function clickedLike() {
  popup.classList.add('show');
  window.setTimeout(hidePopup, 2000);
}

function hidePopup() {
  popup.classList.remove('show');
}
