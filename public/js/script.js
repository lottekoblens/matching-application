testFormSubmit();

function testFormSubmit() {
  document.getElementById('like').addEventListener('submit', clickedLike);
}

function clickedLike() {
  document.getElementById('LikedPopup').classList.add('show');
  window.setTimeout(hidePopup, 8000);
}

function hidePopup() {
  document.getElementById('LikedPopup').classList.remove('show');
}
