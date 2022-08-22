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