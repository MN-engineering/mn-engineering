document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     MOBILE MENU
  ========================= */
  const burger = document.getElementById("burger");
  const navMenu = document.getElementById("nav-menu");

  if (burger && navMenu) {
    const closeMenu = () => {
      navMenu.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");
    };

    const openMenu = () => {
      navMenu.classList.add("open");
      burger.setAttribute("aria-expanded", "true");
    };

    const toggleMenu = () => {
      const isOpen = navMenu.classList.contains("open");
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    };

    burger.addEventListener("click", (event) => {
      event.stopPropagation();
      toggleMenu();
    });

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    document.addEventListener("click", (event) => {
      const clickedInsideMenu = navMenu.contains(event.target);
      const clickedBurger = burger.contains(event.target);

      if (!clickedInsideMenu && !clickedBurger) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 860) {
        navMenu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* =========================
     LIGHTBOX GALLERY
     Работает только если элементы есть на странице
  ========================= */
  const zoomableImages = Array.from(document.querySelectorAll(".zoomable"));
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  if (
    zoomableImages.length > 0 &&
    lightbox &&
    lightboxImg &&
    closeBtn &&
    prevBtn &&
    nextBtn
  ) {
    let currentIndex = 0;

    const updateLightboxImage = () => {
      const currentImage = zoomableImages[currentIndex];
      lightboxImg.src = currentImage.src;
      lightboxImg.alt = currentImage.alt || "Увеличенное изображение";
    };

    const openLightbox = (index) => {
      currentIndex = index;
      updateLightboxImage();
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    };

    const closeLightbox = () => {
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    const showPrevImage = (event) => {
      if (event) event.stopPropagation();
      currentIndex =
        (currentIndex - 1 + zoomableImages.length) % zoomableImages.length;
      updateLightboxImage();
    };

    const showNextImage = (event) => {
      if (event) event.stopPropagation();
      currentIndex = (currentIndex + 1) % zoomableImages.length;
      updateLightboxImage();
    };

    zoomableImages.forEach((img, index) => {
      img.addEventListener("click", () => {
        openLightbox(index);
      });
    });

    closeBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      closeLightbox();
    });

    prevBtn.addEventListener("click", showPrevImage);
    nextBtn.addEventListener("click", showNextImage);

    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (!lightbox.classList.contains("active")) return;

      if (event.key === "Escape") {
        closeLightbox();
      } else if (event.key === "ArrowLeft") {
        showPrevImage();
      } else if (event.key === "ArrowRight") {
        showNextImage();
      }
    });

    /* touch swipe for lightbox */
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener(
      "touchstart",
      (event) => {
        touchStartX = event.changedTouches[0].screenX;
      },
      { passive: true }
    );

    lightbox.addEventListener(
      "touchend",
      (event) => {
        touchEndX = event.changedTouches[0].screenX;
        const delta = touchEndX - touchStartX;

        if (Math.abs(delta) > 50) {
          if (delta > 0) {
            showPrevImage();
          } else {
            showNextImage();
          }
        }
      },
      { passive: true }
    );
  }
});
