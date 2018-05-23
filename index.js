document.addEventListener("DOMContentLoaded", function(event) {
  let index = 0;

  const images = Array.from(document.querySelectorAll(".left .image img"));

  images.forEach(function(element, i) {
    console.log(element)
    element.style.left = `${ 350 * i}px`;
  })
  images[0].style.visibility = 'hidden';

  document.querySelector("section").addEventListener("click", function(event) {
    if (event.target.classList.contains('fa-arrow-left')) {
      index += 1;
    }
    if (event.target.classList.contains('fa-arrow-right') && index > 0) {
      index -= 1;
    }
    document.querySelector(".left .image").style.transform = `translateX(${ - 350 * index}px)`;

  });

})
//transform:translateX(-350px)
