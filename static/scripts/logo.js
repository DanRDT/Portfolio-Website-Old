const sectionOne = document.querySelector("#section1");

const logo = document.querySelector(".logo");

const logoObserverOffset = {
  rootMargin: "-30%",
  threshold: 0
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
}, logoObserverOffset);

export default logoObserver.observe(sectionOne);