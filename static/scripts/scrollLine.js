const sectionOne = document.querySelector("#section1")
const sectionTwo = document.querySelector("#section2")
const sectionThree = document.querySelector("#projects")
const sectionFour = document.querySelector("#section4")

const scrollLinePath = document.querySelector("#scroll-line")
const scrollLinePathLength = scrollLinePath.getTotalLength() //

scrollLinePath.style.strokeDasharray = scrollLinePathLength + " " + scrollLinePathLength
scrollLinePath.style.strokeDashoffset = scrollLinePathLength

//Mobile
const mobileScrollLinePath = document.querySelector("#scroll-line-mobile")
const mobileScrollLinePathLength = mobileScrollLinePath.getTotalLength()

mobileScrollLinePath.style.strokeDasharray =
  mobileScrollLinePathLength + " " + mobileScrollLinePathLength
mobileScrollLinePath.style.strokeDashoffset = mobileScrollLinePathLength

const options = {
  threshold: 0,
  rootMargin: "100px",
}

// Remove event listener if not on screen
const observer = new IntersectionObserver((items) => {
  items.map((item) => {
    if (!item.isIntersecting) {
      window.removeEventListener("scroll", calcScrollLine)
    } else if (item.isIntersecting) {
      window.addEventListener("scroll", calcScrollLine)
    }
  })
}, options)

export default observer.observe(sectionTwo)

const calcScrollLine = () => {
  let currentScrollPosition = document.documentElement.scrollTop + document.body.scrollTop
  let totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight

  let sectionOneHeight = sectionOne.clientHeight
  let sectionThreeHeight = sectionThree.clientHeight
  let sectionFourHeight = sectionFour.clientHeight

  const aboveHeight = sectionOneHeight
  const belowHeight = sectionThreeHeight + sectionFourHeight

  let adjustedTotalHeight = totalHeight - belowHeight
  // let adjustedTotalHeight = totalHeight - sectionThreeHeight
  let scrollPercentage = currentScrollPosition / adjustedTotalHeight

  // wait for section2 to appear
  let scrollPercentOffset = aboveHeight / 2.3 / adjustedTotalHeight

  //calculate amount to draw
  let offsetPercentage = scrollPercentage - scrollPercentOffset

  if (offsetPercentage > 1) {
    offsetPercentage = 1 // Max out SVG
  }

  let drawLength = scrollLinePathLength * offsetPercentage

  // draw in reverse
  scrollLinePath.style.strokeDashoffset = scrollLinePathLength - drawLength

  //Mobile stroke
  drawLength = mobileScrollLinePathLength * offsetPercentage
  mobileScrollLinePath.style.strokeDashoffset = mobileScrollLinePathLength - drawLength
}
