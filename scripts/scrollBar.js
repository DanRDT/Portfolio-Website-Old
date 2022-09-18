
const scrollbarCircles = document.querySelectorAll("section");
const scrollbarSecCircles = document.querySelectorAll(".scrollbar-circle")

const scrollbarObserverOffset = {
  rootMargin: "-50%"
};

const scrollbarObserver = new IntersectionObserver( (entries, scrollbarObserver) => {
  entries.forEach(entry => {
    
    const isIntersecting = entry.isIntersecting;
    const scrollbarSec = entry.target.id.substring(7,8) - 1
    const scrollbarSecCircle = scrollbarSecCircles[scrollbarSec]
    
    if (isIntersecting) {
      scrollbarSecCircle.classList.add('currentSec')
    }
    else if (!isIntersecting) {
      scrollbarSecCircle.classList.remove('currentSec')
    }
    
  })
}, scrollbarObserverOffset);

export default scrollbarCircles.forEach(item => {
  scrollbarObserver.observe(item);
});
