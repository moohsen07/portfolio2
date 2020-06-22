// Ghange Landing Page Background

let home = document.querySelector(".home"),

  imgArray = ["img/backgorund-1.jpg", "img/backgorund-2.jpg", "img/backgorund-3.jpg"],

  imgNum = 0;

setInterval(() => {

  if (imgNum == imgArray.length) {

    imgNum = 0

  }

  home.style.backgroundImage = `url(${imgArray[imgNum]})`

  imgNum++

}, 3500);

// local Storage 
let mainColor = localStorage.getItem("main-color")

if (localStorage) {

  document.documentElement.style.setProperty('--main-color', mainColor)

}
// open the color box

let openBox = document.querySelector(".open-box")

openBox.addEventListener("click", function () {

  this.classList.toggle("visable")

  if (this.classList.contains("visable")) {

    this.parentElement.style.right = 0

  }
  else {

    this.parentElement.style.right = -170 + "px"

  }
})

// open the navbar on mobile

let mobileBtn = document.querySelector(".mobile-btn")

mobileBtn.onclick = function () {

  this.classList.toggle("open")

  if (this.classList.contains("open")) {

    this.parentElement.style.left = 0

  }
  else {

    this.parentElement.style.left = "-25%"

    document.body.style.paddingLeft = "0"

  }

}

// change the main color

let color = document.querySelectorAll(".colors li")

color.forEach(li => {

  li.addEventListener("click", (e) => {

    document.documentElement.style.setProperty('--main-color', e.target.dataset.color)

    localStorage.setItem("main-color", e.target.dataset.color)

  })

})

// typing effect

const texts = ["Freelancer", "Developer", "Phortography", "Designer"];
let count = 0,
  index = 0,
  currentText = "",
  letter = "";

function type() {

  if (count === texts.length) {

    count = 0;

  }

  currentText = texts[count];

  letter = currentText.slice(0, ++index)

  document.querySelector(".typing").textContent = letter;

  if (letter.length === currentText.length) {

    count++;
    index = 0;

  }

};
setInterval(type, 450)

// active class function

function active(selector, activeClass) {

  selector.forEach(element => {

    element.classList.remove(activeClass)

  })
}

// sync navbar with section

function pageTransition() {

  let navLink = document.querySelectorAll(".nav .nav-link")

  let pages = document.querySelectorAll(".page")

  navLink.forEach(link => link.addEventListener("click", function (e) {

    e.preventDefault()

    let dataPage = this.dataset.page;

    let section = document.querySelector(dataPage);

    active(navLink, "active")

    this.classList.add("active")

    pages.forEach(page => page.style.cssText = "transform: translateX(100%)")

    section.style.cssText = "transform: translateX(0); transition-delay:1s"

    if (section == document.querySelector(".home")) {

      document.body.style.overflow = "hidden"

    }
    else {

      document.body.style.cssText = "overflow-y :auto;"

    }

    if (mobileBtn.classList.contains("open")) mobileBtn.parentElement.style.left = "-25%"


  }))

}

pageTransition()

// skills section
let resume = document.querySelector(".resume")

resume.onscroll = () => {

  let skills = document.querySelector(".skill"),

    skillsOffsetTop = skills.offsetTop,

    resumeScrollTop = resume.scrollTop;

  if (resumeScrollTop >= skillsOffsetTop + 300) {

    let perc = document.querySelectorAll(".skills .perc")

    perc.forEach(span => {

      span.style.opacity = 1;

      span.style.left = span.dataset.percent

    })

    let fillBar = document.querySelectorAll(".skills .fill")

    fillBar.forEach(span => {

      span.style.width = span.dataset.progress

    })

  }
}

// testimonials slider

let nextButton = document.querySelector(".testimonials .next"),

  prevButton = document.querySelector(".testimonials .prev"),

  slide = document.querySelectorAll(".testimonials .slide"),

  bullets = document.querySelectorAll(".indecator span"),

  currentSlide = 0;

let next = () => {

  if (currentSlide < slide.length - 1) {

    currentSlide++;

    slider()

  }

  else if (currentSlide == slide.length - 1) {

    currentSlide = 0;

    slider()

  }

}

nextButton.onclick = next

prevButton.onclick = () => {

  if (currentSlide > 0) {

    currentSlide--;

    slider()

  }

  else if (currentSlide == 0) {

    currentSlide = slide.length - 1;

    slider()

  }

}

bullets.forEach(bullet => {

  bullet.addEventListener("click", function () {

    currentSlide = parseInt(this.dataset.index)

    slider()

  });

});

let slider = () => {

  active(slide, "active")

  active(bullets, "active-bullet")

  slide[currentSlide].classList.add("active")

  bullets[currentSlide].classList.add("active-bullet")

}

setInterval(next, 4000);

// filter images

function indecator(e) {

  let marker = document.querySelector(".marker")

  marker.style.cssText = `left: ${e.offsetLeft + "px"}; width: ${e.offsetWidth + "px"}`

}

function filterImg() {

  let filterButtons = document.querySelectorAll(".portfolio-filter li")

  let item = document.querySelectorAll(".portfolio-img")

  filterButtons.forEach(button => {

    let value = button.dataset.filter

    button.addEventListener("click", function () {

      indecator(button)

      active(filterButtons, "active-filter")

      this.classList.add("active-filter")

      item.forEach(img => {

        img.style.cssText = "display: none"

        if (img.classList.contains(value) || value == "*") {

          img.style.cssText = "display: block"

        }

      })

    })

  })
}

filterImg()

// Modal Img

function openModal() {

  let modal = document.getElementById("modal")

  let modalImg = document.querySelector(".modal-img")

  let images = document.querySelectorAll(".portfolio-img figure")

  images.forEach(img => img.addEventListener("click", function () {

    modal.style.cssText = "visibility: visible; opacity: 1"

    modalImg.src = this.childNodes[1].getAttribute("src")

    modalImg.style.opacity = 1

  }))

  modal.onclick = () => modal.style.cssText = "visibility: hidden; opacity: 0"

  modalImg.onclick = (e) => e.stopPropagation();

}

openModal()
