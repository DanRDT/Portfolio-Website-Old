const body = document.querySelector("body")
const logo = document.querySelector(".logo")

export default document.querySelectorAll(".project").forEach((projectNode) => {
  const projectPopup = projectNode.lastElementChild

  projectNode.addEventListener("click", (e) => {
    const isCloseButton = e.target.closest(".x-button") // returns null or node

    if (isCloseButton) {
      hidePopup(projectPopup)
    } else {
      showPopup(projectPopup)
    }
  })

  window.addEventListener("click", (e) => {
    const isPartOfProject = e.target.closest(".project") // returns null or node
    if (!isPartOfProject) {
      hidePopup(projectPopup)
    }
  })
})

function showPopup(popup) {
  popup.classList.add("active")
  body.style.overflow = "hidden"
  logo.style.opacity = "0"
}

function hidePopup(popup) {
  popup.classList.remove("active")
  body.style.overflow = "visible"
  logo.style.opacity = "1"
}
