export default document.querySelectorAll('a').forEach(anchor => {
  
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