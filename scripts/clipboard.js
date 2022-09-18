export default document.addEventListener('click', e => {
  const isCopyButton = e.target.matches("[copy-info]");
  if (!isCopyButton) return;
  navigator.clipboard.writeText(e.target.dataset.info);
  
  //change text to copied
  e.target.children[0].innerText = ' - Copied';
  function changeTextBack() {e.target.children[0].innerText = ' - Copy to ClipBoard';}
  setTimeout(changeTextBack, 1500)

})