document.addEventListener("DOMContentLoaded", function(event) {
  let index = 0;
  const imgWidth = 500;
  const images = Array.from(document.querySelectorAll(".left .image img"));

  images.forEach(function(element, i) {
    element.style.left = `${ -imgWidth* i}px`;
    if (i !== 0) element.style.opacity = 0;
  })

  document.querySelector("section").addEventListener("click", function(event) {
    if (event.target.classList.contains('fa-arrow-right')) {
      index++;
      setTimeout(function() {
        images[index - 1].style.opacity = 0;
      }, 400);
    }
    if (event.target.classList.contains('fa-arrow-left') && index > 0) {
      index--;
      setTimeout(function() {
        images[index + 1].style.opacity = 0;
      }, 400);
    }
    images[index].style.opacity = 1;
    document.querySelector(".left .image").style.transform = `translateX(${imgWidth* index}px)`;
    setTimeout(function() {
      document.querySelector(".right").innerHTML =
        `
      <div class="name">Name: <span></span> </div>
      <div class="title">Position: <span></span></div>
      <div class="nationality">Nationality: <span></span></div>
      <div class="skills">
        <div>Skills</div>
        <div class="skill"><span></span></div>
        <div class="skill"><span></span></div>
        <div class="skill"><span></span></div>
        <div class="skill"> <span></span></div>
      </div>
      <div class="story">Story: <span></span></div>
      <div class="vision">Long term vision: <span></span></div>
      <div class="motivation">What motivates me: <span></span> </div>
      <div class="quote">Favorite quote: <span> </span></div>
      <div class="date">Join date: <span></span> </div>
      `;
      document.querySelector(".right").style.opacity = 1;
    }, 400);
    document.querySelector(".right").style.opacity = 0.1;

  });


})
