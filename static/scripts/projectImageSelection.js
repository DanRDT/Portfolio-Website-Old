export default document.querySelectorAll(".project-image").forEach((imageNode) => {
  const image = imageNode.src
  const mainImageNode = imageNode.parentNode.previousElementSibling

  imageNode.addEventListener("click", () => {
    mainImageNode.src = image
  })
})
