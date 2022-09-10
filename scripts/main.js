// Contact Form
document.addEventListener("click", e => { 
  const isDropdownButton = e.target.matches("[data-dropdown-button]");
  if (!isDropdownButton && e.target.closest("[data-dropdown]") != null) return;
  
  let currentDropdown;
  if (isDropdownButton) {
    currentDropdown = e.target.closest("[data-dropdown]");
    currentDropdown.classList.toggle("active");
  }

  document.querySelectorAll("[data-dropdown].active").forEach(dropdown => {
    if (dropdown === currentDropdown) return
    dropdown.classList.remove("active");
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
      logo.classList.remove('visible');
    }
  })
}, options);

logoObserver.observe(sectionOne);



// Scrolling line
const scrollLinePath = document.querySelector('#scroll-line');
const scrollLinePathLength = scrollLinePath.getTotalLength();

scrollLinePath.style.strokeDasharray = scrollLinePathLength + ' ' +scrollLinePathLength;
scrollLinePath.style.strokeDashoffset = scrollLinePathLength;

//Mobile
const mobileScrollLinePath = document.querySelector('#scroll-line-mobile');
const mobileScrollLinePathLength = mobileScrollLinePath.getTotalLength();

mobileScrollLinePath.style.strokeDasharray = mobileScrollLinePathLength + ' ' +mobileScrollLinePathLength;
mobileScrollLinePath.style.strokeDashoffset = mobileScrollLinePathLength;
 

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

  let drawLength = scrollLinePathLength * offsetPercentage;


  // draw in reverse
  scrollLinePath.style.strokeDashoffset = scrollLinePathLength - drawLength;
  
  //Mobile stroke
  drawLength = mobileScrollLinePathLength * offsetPercentage;
  mobileScrollLinePath.style.strokeDashoffset = mobileScrollLinePathLength - drawLength;

})



//Clipboard Functionality

document.addEventListener('click', e => {
  const isCopyButton = e.target.matches("[copy-info]");
  if (!isCopyButton) return;
  navigator.clipboard.writeText(e.target.dataset.info);

})