document.addEventListener("DOMContentLoaded", function(event) {

  const popup = document.querySelector(".popup");
  let index = 0;

  for (let element of photosInfo) {
    const {alt, firstName, lastName} = element;
    src = element.src || "integrify cartoon.png";

    document.querySelector(".image").innerHTML += `
    <img src="img/${src}" alt="${alt}">
      `;
    document.querySelector(".popup .images").innerHTML += `
    <div class="small-img-div">
      <img src="img-small/${src}" alt="${alt}" class="small-img">
    </div>
        `;
  }

  const imgWidth = document.querySelector(".left").clientWidth;
  const images = Array.from(document.querySelector(".image").querySelectorAll("img"));

  images.forEach(function(element, i) {
    element.style.left = `${ - imgWidth * i}px`;
    if (i !== 0)
      element.style.opacity = 0;
    }
  )

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

    setTimeout(function() {
      const rightDiv = document.querySelector(".right");
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
      rightDiv.style.opacity = 1;
    }, 400);
  }

  const displayIndex = () => {
    document.querySelector(".index").innerHTML = `${index + 1}/${photosInfo.length}`;
  }

  const displayNextItem = (step) => {
    index += step;
    setTimeout(function() {
      images[index - step].style.opacity = 0;
    }, 400);
    images[index].style.opacity = 1;
    document.querySelector(".left .image").style.transform = `translateX(${imgWidth * index}px)`;
    document.querySelector(".right").style.opacity = 0.1;
  }

  const managePopup = (opacity, display, time1, time2) => {
    setTimeout(function() {
      popup.style.opacity = opacity;
    }, time1);
    setTimeout(function() {
      popup.style.display = display;
    }, time2);
  }
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
        displayIndex();
        display(photosInfo[index]);
      }
      if ((event.target.classList.contains('fa-arrow-left') || event.target.classList.contains('arrow-left')) && index > 0) {
        displayNextItem(-1);
        displayIndex();
        display(photosInfo[index]);
      }
    }
  });

  popup.addEventListener("click", function(event) {
    const prevIndex = index;
    if (event.target.classList.contains('close') || event.target.classList.contains('close-div')) {
      managePopup(0, 'none', 0, 500);
    }
    if (event.target.classList.contains('small-img')) {
      document.querySelectorAll(".small-img").forEach(function(e, i) {
        if (event.target === e)
          index = i;
        }
      )

      images[index].style.opacity = 1;
      document.querySelector(".left .image").style.transform = `translateX(${imgWidth * index}px)`;
      managePopup(0, 'none', 0, 500);
      displayIndex();
      display(photosInfo[index]);
    }

  })

})
