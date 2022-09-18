const observedItems = document.querySelectorAll("[lazy-load]");

const itemObserverOffset = {
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

export default observedItems.forEach(item => {
  itemObserver.observe(item);
});