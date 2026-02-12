
let index = 0;
let autoplayTimer = null;
const autoplayDelay = 7000;

displaySlides(index);
startAutoplay();

function moveSlide(n) {
  index += n;
  displaySlides(index);
  resetAutoplay();
}

function currentSlide(n) {
  index = n;
  displaySlides(index);
  resetAutoplay();
}

function displaySlides(n) {
  let slides = document.getElementsByClassName("fadingSlides");
  let dots = document.getElementsByClassName("dot");

  if (n >= slides.length) index = 0;
  if (n < 0) index = slides.length - 1;

  //hides inactive slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  //removes the active class from dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove("active");
  }

  //displays the current slides
  slides[index].style.display = "block";

  //activates the current dots
  if (dots[index]) {
    dots[index].classList.add("active");
  }
}

function startAutoplay() {
  autoplayTimer = setInterval(() => {
    index++;
    displaySlides(index);
  }, autoplayDelay);
}

function resetAutoplay() {
  clearInterval(autoplayTimer);
  startAutoplay();
}