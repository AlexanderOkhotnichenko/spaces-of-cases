document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("resize", () => resizePaddingMain('footer', 'main'));
  resizePaddingMain('footer', 'main');

  function resizePaddingMain(footerId, mainId) {
    const footerElement = document.getElementById(footerId);
    const mainElement = document.getElementById(mainId);
    const sizeHeightFooter = footerElement.offsetHeight;

    mainElement.style.paddingBottom = `${sizeHeightFooter}px`;
    mainElement.style.minHeight = `calc(100vh + ${sizeHeightFooter}px)`;
  }

  const hiddenBtn = document.querySelector('.prome-start-button-start');
  const prevBtn = document.querySelectorAll('.prev-el');
  const nextBtn = document.querySelectorAll('.next-el');
  const listProme = document.querySelectorAll('.prome-el');
  const referenStart = document.querySelector('.prome-start');
  const space = document.querySelector('.space');
  const stars = document.querySelector('.stars');
  const arrows = document.querySelectorAll('.arrow-all-hidden');
  let activeIndex = 0;
  let noRotate = false;

  function animationGSAP() {
    let rotate = gsap.utils.wrap([0, -15, -30, -45]);
    let wrap = gsap.utils.wrap([1, 1.24, 1.68, 2.015]);

    listProme.forEach((item) => {
      if (item.classList.contains('active')) {
        gsap.to(item, {
          opacity: 1,
          duration: 1.5,
          pointerEvents: 'auto',
          ease: "power3.out",
        });
      } else {
        gsap.to(item, {
          opacity: 0,
          duration: 1.5,
          pointerEvents: 'none',
          ease: "power3.out",
        });
      }
    });

    prevBtn.forEach((btn) => {
      if (btn.classList.contains('active')) {
        gsap.to(btn.children[1], {
          opacity: 1,
          // rotate: 0,
          scaleX: 1,
          duration: 3.5,
          pointerEvents: 'auto',
          ease: "elastic.out(1,0.55)",
        });
      } else {
        gsap.to(btn.children[1], {
          opacity: 0,
          // rotate: -45,
          scaleX: 0,
          duration: 3.5,
          pointerEvents: 'none',
          ease: "elastic.out(1,0.55)",
        });
      }
    });

    nextBtn.forEach((btn) => {
      if (btn.classList.contains('active')) {
        gsap.to(btn.children[1], {
          opacity: 1,
          scaleX: 1,
          duration: 3.5,
          pointerEvents: 'auto',
          ease: "elastic.out(1,0.55)",
        });
      } else {
        gsap.to(btn.children[1], {
          opacity: 0,
          scaleX: 0,
          duration: 3.5,
          pointerEvents: 'none',
          ease: "elastic.out(1,0.55)",
        });
      }
    });

    if (space.classList.contains('rotate') && noRotate) {
      gsap.to(space, {
        rotate: () => rotate(activeIndex),
        duration: 3.5,
        ease: "elastic.out(1,0.55)",
      });
    }

    if (stars.classList.contains('scale')) {
      gsap.to(stars, {
        scale: () => wrap(activeIndex),
        duration: 3.5,
        transformOrigin: "0 0",
        ease: "elastic.out(1,0.55)",
      });
    }
  }

  const hiddenStartPage = () => {
    referenStart.classList.add('hidden');
    space.classList.add('rotate');
    stars.classList.add('scale');
    document.body.classList.add('color-background');

    arrows.forEach((item) => {
      item.classList.add('hidden-arrow');

      if (item.classList.contains('hidden-arrow')) {
        gsap.to(`.arrows-left`, {
          duration: 2.2,
          left: -140,
          opacity: 0,
          ease: "power1.out",
        });

        gsap.to(`.arrows-right`, {
          duration: 2.2,
          right: -140,
          opacity: 0,
          ease: "power1.out",
        });
      }
    });

    if (space.classList.contains('rotate')) {
      gsap.to(`.space`, {
        rotate: 0,
        duration: 7.5,
        opacity: 1,
        ease: "elastic.out(1,0.55)",
      });
    }

    if (referenStart.classList.contains('hidden')) {
      gsap.to(`.prome-start.hidden`, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 2.5,
        ease: "power2.out",
      });

      gsap.to(`.blur-all-main`, {
        opacity: 1,
        duration: 2,
        ease: "power2.out",
      });

      gsap.to(`.background-gradient`, {
        opacity: 1,
        background: "linear-gradient(120deg, #1d2948 -2%, #141d33 21%, #0f1628 33%, #050a16 92%)",
        duration: 1,
        ease: "power1.out",
      });
    }

    toggleActiveClass(activeIndex);
    animationGSAP();
  };

  const toggleActiveClass = (index) => {
    listProme.forEach((prome, indexEl) => {
      if (indexEl === index) {
        prome.classList.add('active');
      } else {
        prome.classList.remove('active');
      }
    });

    prevBtn.forEach((btn, indexEl) => {
      if (indexEl === index) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    nextBtn.forEach((btn, indexEl) => {
      if (indexEl === index) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  hiddenBtn.addEventListener("click", hiddenStartPage);

  prevBtn.forEach((item) => {
    item.addEventListener(("click"), () => {
      activeIndex = (activeIndex - 1 + listProme.length) % listProme.length;

      toggleActiveClass(activeIndex);
      animationGSAP();
    });
  });

  nextBtn.forEach((item) => {
    item.addEventListener(("click"), () => {
      noRotate = true;
      activeIndex = (activeIndex + 1) % listProme.length;

      toggleActiveClass(activeIndex);
      animationGSAP();
    });
  });
});
