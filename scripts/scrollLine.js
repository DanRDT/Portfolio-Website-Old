const sectionOne = document.querySelector("#section1");
const sectionThree = document.querySelector("#section3");

const scrollLinePath = document.querySelector('#scroll-line');
const scrollLinePathLength = scrollLinePath.getTotalLength();

scrollLinePath.style.strokeDasharray = scrollLinePathLength + ' ' +scrollLinePathLength;
scrollLinePath.style.strokeDashoffset = scrollLinePathLength;

//Mobile
const mobileScrollLinePath = document.querySelector('#scroll-line-mobile');
const mobileScrollLinePathLength = mobileScrollLinePath.getTotalLength();

mobileScrollLinePath.style.strokeDasharray = mobileScrollLinePathLength + ' ' +mobileScrollLinePathLength;
mobileScrollLinePath.style.strokeDashoffset = mobileScrollLinePathLength;
 

export default window.addEventListener('scroll', () => {

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

})

