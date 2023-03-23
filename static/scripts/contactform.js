
const contactFormButton = document.querySelector("#contact-form-button");
const contactFormInputs = document.querySelectorAll(".contact-from-input");
const re = /[a-zA-Z0-9!#$%&'*+/=?^_‘{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_‘{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?/;


export default contactFormButton.addEventListener('click', e => {
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
