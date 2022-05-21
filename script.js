'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const scrollBtn = document.querySelector(`.btn--scroll-to`);
const section1 = document.querySelector(`#section--1`);

// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Button Scroll
scrollBtn.addEventListener(`click`, function (e) {
  section1.scrollIntoView({ behavior: `smooth` });
});

// Smoth Scrolling
// Done BY CSS
// document.querySelector(`.nav__links`).addEventListener('click', function (e) {
//   if (e.target.classList.contains(`nav__link`)) {
//     e.preventDefault();
//     const id = e.target.getAttribute(`href`);
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: `smooth` });
//   }
// });

// TAB Compotent
const tab = document.querySelectorAll(`.operations__tab`);
const container = document.querySelector(`.operations__tab-container`);
const content = document.querySelectorAll(`.operations__content`);

container.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // GAURD CLAUSE
  if (!clicked) return;

  // ACTIVE TAB
  tab.forEach(t => {
    t.classList.remove(`operations__tab--active`);
  });

  clicked.classList.add(`operations__tab--active`);

  //ACTIVE CONTENT
  content.forEach(c => c.classList.remove(`operations__content--active`));

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add(`operations__content--active`);
});

/////////////////////////////
// Navigtion Fade animation
const nav = document.querySelector(`.nav`);
const handleHover = function (e) {
  if (e.target.classList.contains(`nav__link`)) {
    const link = e.target;
    const siblings = link.closest(`.nav`).querySelectorAll(`.nav__link`);
    const logo = link.closest(`.nav`).querySelector(`img`);
    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

////////////////////////////////
// Sticky Navigation: Intersection Observer API

const header = document.querySelector(`header`);
const navHeight = nav.getBoundingClientRect().height;

const obsCallback = function (entries, Observer) {
  const entry = entries[0];

  if (!entry.isIntersecting) nav.classList.add(`sticky`);
  else nav.classList.remove(`sticky`);
};
const headerObserver = new IntersectionObserver(obsCallback, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

///////////////////////////////
// Revealing Element
const allSections = document.querySelectorAll(`.section`);
const sectionObsCallback = function (entries, Observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove(`section--hidden`);
  Observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(sectionObsCallback, {
  root: null,
  threshold: 0.15,
});
allSections.forEach(section => {
  sectionObserver.observe(section);
  section.classList.add(`section--hidden`);
});

////////////////////////////////
// Lazy Loading Images
/* BUG BUG
const imgTargets = document.querySelectorAll(`img[data-src]`);
const imgCallback = function (entries, Observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove(`lazy-img`);
  });

  Observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(imgCallback, {
  root: null,
  threshold: 0,
  rootMargin: `200px`,
});
imgTargets.forEach(img => {
  imgObserver.observe(img);
  console.log('not done');
});
*/
///////////////////////////////
// slides
const slider = function () {
  const slides = document.querySelectorAll(`.slide`);

  const slider = document.querySelector(`.slider`);
  const leftBtn = document.querySelector(`.slider__btn--left`);
  const rightBtn = document.querySelector(`.slider__btn--right`);
  const DotsContainer = document.querySelector(`.dots`);
  let currentSlide = 0;
  const maxSlide = slides.length;

  const createDots = function () {
    slides.forEach((_, i) => {
      DotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class = "dots__dot" data-slide = "${i}"></button>`
      );
    });
  };

  // slider.style.overflow = `visible`;
  // slider.style.transform = `scale(0.3) `;

  const activeDots = function (slide) {
    document.querySelectorAll(`.dots__dot`).forEach(dot => {
      dot.classList.remove(`dots__dot--active`);
      document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add(`dots__dot--active`);
    });
  };
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextSlide = function () {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
    activeDots(currentSlide);
  };
  const prevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    // currentSlide--;
    goToSlide(currentSlide);
    activeDots(currentSlide);
  };

  DotsContainer.addEventListener(`click`, function (e) {
    if (e.target.classList.contains(`dots__dot`)) {
      const slide = e.target.dataset.slide;
      goToSlide(slide);
      activeDots(slide);
    }
  });

  rightBtn.addEventListener('click', nextSlide);

  leftBtn.addEventListener('click', prevSlide);

  document.addEventListener(`keydown`, function (e) {
    e.key === `ArrowLeft` && prevSlide();
    e.key === `ArrowRight` && nextSlide();
  });

  const intil = function () {
    goToSlide(0);
    activeDots(0);
    createDots();
  };
  intil();
};
slider();

/////////////////////////////
