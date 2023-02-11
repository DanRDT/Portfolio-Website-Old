const scrollbarCircles = document.querySelectorAll("[data-sec]")
const scrollbarSecCircles = document.querySelectorAll(".scrollbar-circle")

const scrollbarObserverOffset = {
  rootMargin: "-50%",
}

const scrollbarObserver = new IntersectionObserver((entries, scrollbarObserver) => {
  entries.forEach((entry) => {
    const isIntersecting = entry.isIntersecting
    const scrollbarSec = entry.target.getAttribute("data-sec") // get int
    const scrollbarSecCircle = scrollbarSecCircles[scrollbarSec - 1] // select circle equivalent circle

    if (isIntersecting) {
      scrollbarSecCircle.classList.add("currentSec")
    } else if (!isIntersecting) {
      scrollbarSecCircle.classList.remove("currentSec")
    }
  })
}, scrollbarObserverOffset)

export default scrollbarCircles.forEach((item) => {
  scrollbarObserver.observe(item)
})
