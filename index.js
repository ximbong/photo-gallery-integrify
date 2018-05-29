document.addEventListener("DOMContentLoaded", function(event) {

  const popup = document.querySelector(".popup");
  let index = 0;

  //run through every objects in the array
  photosInfo.forEach(function(element, index) {
    const {alt, firstName, lastName} = element;
    src = element.src || "integrify cartoon.png";

    //big image display
    document.querySelector(".image").innerHTML += `<img src="img/${src}" alt="${alt}">`;

    //popup image display
    document.querySelector(".popup .images").innerHTML += `
    <div class="small-img-div" id="${index}">
      <img src="img-small/${src}" alt="${alt}" class="small-img">
      <div class="caption">
        ${firstName + ' ' + lastName}
      </div>
    </div>
    `;
  })

  const imgWidth = document.querySelector(".left").clientWidth; //for responsive purpose
  const images = Array.from(document.querySelector(".image").querySelectorAll("img")); //list of the big images
  const rightDiv = document.querySelector(".right"); //gonna select this element a lot

  //hide all the images except the first one
  images.forEach(function(element, i) {
    element.style.left = `${ - imgWidth * i}px`;
    if (i !== 0)
      element.style.opacity = 0;
    }
  )

  //this function display information from an object
  const display = (obj) => {
    const {
      firstName,
      lastName,
      title,
      nationality,
      skills,
      whySofterDeveloper,
      longTermVision,
      motivatesMe,
      favoriteQuote,
      joinedOn
    } = obj;

    rightDiv.querySelector(".name span").innerText = firstName + ' ' + lastName;
    rightDiv.querySelector(".title span").innerText = title;
    rightDiv.querySelector(".nationality span").innerText = nationality;
    rightDiv.querySelector(".story span").innerText = whySofterDeveloper;
    rightDiv.querySelector(".vision span").innerText = longTermVision;
    rightDiv.querySelector(".motivation span").innerText = motivatesMe;
    rightDiv.querySelector(".quote span").innerText = favoriteQuote;
    rightDiv.querySelector(".date span").innerText = joinedOn;

    const skillsDiv = rightDiv.querySelector(".skills");
    skillsDiv.innerHTML = '';
    for (let element of obj.skills) {
      const textNode = document.createTextNode(element);
      const span = document.createElement('span');
      const div = document.createElement('div');

      span.appendChild(textNode);
      div.classList.add("skill");
      div.appendChild(span);
      skillsDiv.appendChild(div);
    }

    setTimeout(function() {
      rightDiv.style.opacity = 1;
    }, 400);

    rightDiv.innerText.length > 500
      ? rightDiv.style.fontSize = '90%'
      : rightDiv.style.fontSize = '100%';

  }

  //modify the people's index in the page (start from 1)
  const displayIndex = () => {
    document.querySelector(".index").innerHTML = `${index + 1}/${photosInfo.length}`;
  }

  //display the next item based on user click, step = 1 => next item, step = -1 => prev item
  const displayNextItem = (step) => {
    index += step;
    setTimeout(function() {
      images[index - step].style.opacity = 0;
    }, 400);
    images[index].style.opacity = 1;
    document.querySelector(".left .image").style.transform = `translateX(${imgWidth * index}px)`;
    document.querySelector(".right").style.opacity = 0.1;
  }

  //display/hide popup
  const managePopup = (opacity, display, opacityChangeDelay, displayChangeDelay) => {
    setTimeout(function() {
      popup.style.opacity = opacity;
    }, opacityChangeDelay);
    setTimeout(function() {
      popup.style.display = display;
    }, displayChangeDelay);
  }

  //display the info and the index when page loads
  display(photosInfo[0])
  displayIndex();

  document.addEventListener("click", function(event) {
    if (event.target.classList.contains('bars') || event.target.classList.contains('fa-bars')) {
      managePopup(1, 'block', 100, 0);
    }
  })

  document.querySelector("section").addEventListener("click", function(event) {

    if (index > -1 && index < photosInfo.length) {
      if ((event.target.classList.contains('fa-arrow-right') || event.target.classList.contains('arrow-right')) && index < photosInfo.length - 1) {
        displayNextItem(1);
      }

      if ((event.target.classList.contains('fa-arrow-left') || event.target.classList.contains('arrow-left')) && index > 0) {
        displayNextItem(-1);
      }
      displayIndex();
      display(photosInfo[index]);
    }
  });

  popup.addEventListener("click", function(event) {

    //click on the close button
    if (event.target.classList.contains('close') || event.target.classList.contains('close-div')) {
      managePopup(0, 'none', 0, 500);
    }

    //if click on popup img
    if (event.target.parentElement.classList.contains('small-img-div')) {
      index = parseInt(event.target.parentElement.id);
      images[index].style.opacity = 1;
      document.querySelector(".left .image").style.transform = `translateX(${imgWidth * index}px)`;
      managePopup(0, 'none', 0, 500);
      displayIndex();
      display(photosInfo[index]);
    }
  })

})
