///// variables

const navList = document.querySelector(".navlist");
const allSections = document.querySelectorAll("section");
const links = document.querySelectorAll(".nav-link");
const menuButton = document.querySelector(".menu-bar");
const hideMenu = document.querySelector(".hide-menu-bar");
const myForm = document.querySelector(".my-form");
const username = document.querySelector("#username");
const email = document.querySelector("#email");
const message = document.querySelector("#message");

//////////////////////////////////////////////////////
/////////////////// sticky navbar  ///////////////////
//////////////////////////////////////////////////////

function windowScroll() {
  const navbar = document.querySelector(".navbar");
  if (
    document.body.scrollTop >= 50 ||
    document.documentElement.scrollTop >= 50
  ) {
    navbar.classList.add("nav-sticky");
  } else {
    navbar.classList.remove("nav-sticky");
  }
}

window.addEventListener("scroll", (ev) => {
  ev.preventDefault();
  windowScroll();
});

//////////////////////////////////////////////////////
///////////////////smooth scrolling //////////////////
//////////////////////////////////////////////////////

navList.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("nav-link")) {
    const href = e.target.getAttribute("href");
    document.querySelector(href).scrollIntoView({ behavior: "smooth" });
    links.forEach((link) => {
      link.classList.remove("active");
    });
    e.target.classList.add("active");
    if (navList.classList.contains("nav-open")) {
      navList.classList.remove("nav-open");
    }
  }
});

/////////////////////////////////////////
//********* mobile navigation ***********
/////////////////////////////////////////

menuButton.addEventListener("click", () => {
  navList.classList.add("nav-open");
});

hideMenu.addEventListener("click", () => {
  navList.classList.remove("nav-open");
});

//////////////////////////////////////////////////////
///////////////////   animation    ///////////////////
//////////////////////////////////////////////////////
gsap.registerPlugin(ScrollTrigger);
const timeLine = gsap.timeline();

timeLine
  .from(".home-content", {
    clipPath: "polygon(0 0 , 100% 0 , 100% 0 , 0 0 )",
    delay: 0.2,
  })
  .to(".home-content", {
    clipPath: "polygon(0 0 , 100% 0 , 100% 100% , 0 100% )",
    duration: 1,
  });

//////////////////////////////////////////////////////
///////////////////   animation    ///////////////////
//////////////////////////////////////////////////////

const revealImage = document.querySelectorAll(".reveal-image");

revealImage.forEach((image) => {
  gsap.fromTo(
    image,
    {
      clipPath: "circle(5% at 77% 40%)",
    },
    {
      clipPath: "circle(75% at 50% 50%)",
      ease: "power2.out",
      scrollTrigger: {
        trigger: image,
        scrub: true,
        start: "top 70%",
        end: "top 70%-=200",
      },
    }
  );
});
//////////////////////////////////////////////////////
///////////////////   animation    ///////////////////
//////////////////////////////////////////////////////

gsap.from(".class-content", {
  x: 400,
  stagger: 0.2,
  ease: "power2.out",
  scrollTrigger: {
    trigger: ".class-container",
    start: "top 80%",
    scrub: true,
    end: "center center",
  },
});

//////////////////////////////////////////////////////
///////////////////   animation    ///////////////////
//////////////////////////////////////////////////////

const menuLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  const scrollPosition = window.scrollY;
  document.querySelectorAll(".main-section").forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop - 200 &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      const sectionId = section.getAttribute("id");

      menuLinks.forEach((link) => {
        link.classList.remove("active");
      });

      const activeLink = document.querySelector(
        `nav ul li a[href="#${sectionId}"]`
      );
      if (activeLink) {
        activeLink.classList.add("active");
      }
    }
  });
});
//////////////////////////////////////////////////////
/////////////////// form validation   ////////////////
//////////////////////////////////////////////////////

function isemail(email) {
  return /^[a-z0-9][a-z0-9-_\.]+@([a-z]|[a-z0-9]?[a-z0-9-]+[a-z0-9])\.[a-z0-9]{2,10}(?:\.[a-z]{2,10})?$/.test(
    email
  );
}

const validate = {
  username: (value) => {
    if (!value) {
      return "Required !";
    }
    return null;
  },

  email: (value) => {
    if (!value) {
      return "Required !";
    }
    if (!isemail(value)) {
      return "invalid email !";
    }
    return null;
  },

  message: (value) => {
    if (!value) {
      return "required !";
    }
    return null;
  },
};

const setError = (selector, key) => {
  const span = document.querySelector(`#${selector}`);
  span.nextElementSibling.innerText = validate[selector](key);
};

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let tempObj = {
    username: username.value,
    message: message.value,
    email: email.value,
  };

  let hasError = false;

  Object.keys(validate).forEach((item) => {
    setError(item, tempObj[item]);
    if (validate[item](tempObj[item])) {
      hasError = true;
    }
  });

  Object.keys(tempObj).forEach((key) => {
    const node = document.querySelector(`#${key}`);
    node.addEventListener("change", (e) => {
      setError(key, e.target.value);
    });
  });

  if (!hasError) {
    alert("form submitted");
    myForm.reset();
  }
});
