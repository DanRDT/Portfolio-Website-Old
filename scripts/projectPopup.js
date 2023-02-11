export default document.querySelectorAll(".project").forEach((projectNode) => {
  const projectPopup = projectNode.lastElementChild

  projectNode.addEventListener("click", (e) => {
    const isCloseButton = e.target.closest(".x-button") // returns null or node

    if (isCloseButton) projectPopup.classList.remove("active")
    else projectPopup.classList.add("active")
  })

  window.addEventListener("click", (e) => {
    const isPartOfProject = e.target.closest(".project") // returns null or node

    if (!isPartOfProject) projectPopup.classList.remove("active")
  })
})
