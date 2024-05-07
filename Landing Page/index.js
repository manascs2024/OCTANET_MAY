var slideIndex = 0;
var slides = document.getElementsByClassName("mySlides");
var autoSlideTimeout;

showSlides();

function plusSlides(n) {
  clearTimeout(autoSlideTimeout); 
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  clearTimeout(autoSlideTimeout); 
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  if (n === undefined) {
    slideIndex++;
  } else {
    slideIndex = n;
  }
  if (slideIndex > slides.length) { slideIndex = 1 }
  if (slideIndex < 1) { slideIndex = slides.length }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slides[slideIndex - 1].style.display = "block";
  autoSlideTimeout = setTimeout(showSlides, 4000); 
}
