// Contact Form
document.addEventListener("click", e => { 
  const isDropdownButton = e.target.matches("[data-dropdown-button]")
  if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return
  
  let currentDropdown
  if (isDropdownButton) {
    currentDropdown = e.target.closest("[data-dropdown]")
    currentDropdown.classList.toggle("active")
  }

  document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
    if (dropdown === currentDropdown) return
    dropdown.classList.remove("active")
  })
})

// Logo
const sectionOne = document.querySelector("#section1");
const sectionTwo = document.querySelector("#section2");
const sectionThree = document.querySelector("#section3");

const logo = document.querySelector(".logo");

const options = {
  rootMargin: "-30%"
};

const logoObserver = new IntersectionObserver(function(entries, logoObserver) {
  entries.forEach(entry => {
    if(!entry.isIntersecting) {
      logo.classList.toggle('visible');
    }
    else if(entry.isIntersecting) {
      logo.classList.remove('visible')
    }
  })
}, options);

logoObserver.observe(sectionOne);

//Copy contact info



// Scrolling line
const path = document.querySelector('#scroll-line');
const pathLength = path.getTotalLength();
 
path.style.strokeDasharray = pathLength + ' ' +pathLength;
path.style.strokeDashoffset = pathLength;


window.addEventListener('scroll', () => {

  let currentScrollPosition = (document.documentElement.scrollTop + document.body.scrollTop);
  let totalHeight = (document.documentElement.scrollHeight - document.documentElement.clientHeight);
  
  let sectionOneHeight = sectionOne.clientHeight;
  let sectionThreeHeight = sectionThree.clientHeight;
  
  let adjustedTotalHeight = totalHeight - sectionThreeHeight;
  let scrollPercentage = currentScrollPosition / adjustedTotalHeight;


  // wait for section2 to appear                        
  let scrollPercentOffset =  (sectionOneHeight/2.5) / adjustedTotalHeight;
  

  //calculate amount to draw
  let offsetPercentage = (scrollPercentage - scrollPercentOffset);
  
  if(offsetPercentage > 1) {
    offsetPercentage = 1;  // Max out SVG
  }

  let drawLength = pathLength * offsetPercentage;


  // draw in reverse
  path.style.strokeDashoffset = pathLength - drawLength;

})
