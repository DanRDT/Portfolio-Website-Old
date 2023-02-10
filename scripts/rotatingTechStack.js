export default document.querySelectorAll(".rotating-logos").forEach((rotatingGroup) => {
  const nodeList = []

  const oldNodes = rotatingGroup.childNodes.forEach((node) => {})

  //check if it redirects to on the page
  if (pageSectionRedirect.substring(0, 1) !== "#") {
    return
  }

  anchor.addEventListener("click", (e) => {
    e.preventDefault()
    document.querySelector(pageSectionRedirect).scrollIntoView(true, { behavior: "smooth" })
  })
})
