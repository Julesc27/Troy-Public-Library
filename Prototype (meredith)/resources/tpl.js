
// handles the library hours

let today = new Date();


/*
  This function accepts a date and an announcement. If you do not have an announcement leave the announcement section blank, like this --> ""
*/

setHours(today, "");

function setHours(date, announcement){

  const hours = document.getElementById('libraryHours');
  //if there is a closing announcement or changed hours announcement the message will be displayed
  if(announcement != ""){
    hours.textContent = announcement;
  }
  //Monday - Thursday Hours
  else if(date.getDay() >= 1 && date.getDay() <= 4 ){
    hours.textContent = "Hours: 9am - 6pm";
  }
  //Friday Hours
  else if(date.getDay() == 5){
    hours.textContent = "Hours: 9am - 5pm";
  }
  //Saturday
  else if(date.getDay() == 6){
    hours.textContent = "Hours: 10am - 5pm";
  }
  //Sunday
  else{
    hours.textContent = "Hours: Closed";
  }
}


// handles the slideshow banner on the homepage
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