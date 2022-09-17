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
  let scrollPercentOffset =  (sectionOneHeight/2.3) / adjustedTotalHeight;
  

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



  //logo appears first section
  // let ratio = document.documentElement.clientHeight / document.documentElement.clientWidth;

  // if(ratio < 0.65){
  //   // logo.classList.remove('visible');
  //   return;
  // } 
  // if () {

  // }
  // if(scrollPercentage < 0.2) {
  //   logo.classList.add('visible');
  // }
  // else {
  //   logo.classList.remove('visible');
  // }
})



//Clipboard Functionality

document.addEventListener('click', e => {
  const isCopyButton = e.target.matches("[copy-info]");
  if (!isCopyButton) return;
  navigator.clipboard.writeText(e.target.dataset.info);
  
  //change text to copied
  e.target.children[0].innerText = ' - Copied';
  function changeTextBack() {e.target.children[0].innerText = ' - Copy to ClipBoard';}
  setTimeout(changeTextBack, 1500)

})

//Intersection Observer

const observedItems = document.querySelectorAll("[lazy-load]");

itemObserverOffset = {
  threshold: 0,
  rootMargin: "0px"
};

const itemObserver = new IntersectionObserver( (entries, itemObserver) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      return;
    }
    else if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      itemObserver.unobserve(entry.target);
    }


  })
}, itemObserverOffset);

observedItems.forEach(item => {
  itemObserver.observe(item);
});


//scroll bar

const scrollbarCircles = document.querySelectorAll("section");
const scrollbarSecCircles = document.querySelectorAll(".scrollbar-circle")

scrollbarObserverOffset = {
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

scrollbarCircles.forEach(item => {
  scrollbarObserver.observe(item);
});


// Scroll functionality without changing url
document.querySelectorAll('a').forEach(anchor => {
  
  const pageSectionRedirect = anchor.getAttribute('href')

  //check if it redirects to on the page
  if (pageSectionRedirect.substring(0,1) !== "#") {
    return;
  }

  anchor.addEventListener('click', e => {
      e.preventDefault();
      document.querySelector(pageSectionRedirect).scrollIntoView(true, {behavior: 'smooth'});
  });

});


// Contact form
const contactFormButton = document.querySelector("#contact-form-button");
const contactFormInputs = document.querySelectorAll(".contact-from-input");
const re = /[a-zA-Z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/;


contactFormButton.addEventListener('click', e => {
  e.preventDefault();
  let isFormValid = null;

  // Validate input
  contactFormInputs.forEach((input, index) => {
    
    
    
    const isFilled = input.value !== "";
    let isValid = true;
    
    
    if (isFilled) {
      if (index === 2) {
        input.parentElement.nextElementSibling.classList.remove("no-input")
      }
      else {
        input.nextElementSibling.classList.remove("no-input")
      }
    }

    else if (!isFilled) {
      if (index === 2) {
        input.parentElement.nextElementSibling.classList.add("no-input")
      }
      else {
        input.nextElementSibling.classList.add("no-input")
      }
    }

    if (index === 1) {
      isValid = re.test(input.value);
      if (!isValid && isFilled) {
        input.nextElementSibling.classList.add("invalid-input")
      }
      else {
        input.nextElementSibling.classList.remove("invalid-input")
      }
    }

    if (isFilled && isValid && isFormValid !== false) {
      isFormValid = true;
    }
    else {
      isFormValid = false;
    }
  })
  

  // Remove popups after 5 seconds
  if (!isFormValid) {
    setTimeout(() => {contactFormInputs.forEach((input, index) => {
      if (index === 2) {
        input.parentElement.nextElementSibling.classList.remove("no-input")
      }
      else {
        input.nextElementSibling.classList.remove("no-input")
      }
      if (index === 1) {
        input.nextElementSibling.classList.remove("invalid-input")
      }
    })}, 5000)
  }
  


  const contactFormButtonLoading = document.querySelector(".loading-animation")
  const contactFormSuccessMessage = document.querySelector(".contact-form-submit-message")
  
  // if form is valid then send input
  if (isFormValid) {

    contactFormButton.classList.add("active-loading")
    contactFormButtonLoading.classList.add("active-loading")

    const inputName = contactFormInputs[0].value
    const inputEmail = contactFormInputs[1].value
    const inputMessage = contactFormInputs[2].value

    fetch("https://formsubmit.co/ajax/a250159dc13f1e2224f6dd1888a2bdb3", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: inputName,
        email: inputEmail,
        message: inputMessage
      })
    })
    .then(response => response.json())
    
    .then(data => {
      console.log(data)
      contactFormButton.classList.remove("active-loading")
      contactFormButtonLoading.classList.remove("active-loading")

      if (data.success === "true") {
        contactFormSuccessMessage.classList.add('successful-send')
      }
      else{
        contactFormSuccessMessage.classList.add('unsuccessful-send')
      }

      setTimeout(() => {
        contactFormSuccessMessage.classList.remove('successful-send')
      }, 5000)
    })
    .catch(error => {
      console.log(error)
      contactFormButton.classList.remove("active-loading")
      contactFormButtonLoading.classList.remove("active-loading")
      contactFormSuccessMessage.classList.add('unsuccessful-send')

      setTimeout(() => {
        contactFormSuccessMessage.classList.remove('unsuccessful-send')
      }, 5000)
    });

  }


  
})
