document.addEventListener("DOMContentLoaded", function () {
  const burger = document.getElementById("burger");
  const navMenu = document.getElementById("nav-menu");

  if (burger && navMenu) {
    burger.addEventListener("click", function (e) {
      e.stopPropagation();
      navMenu.classList.toggle("open");
      burger.setAttribute(
        "aria-expanded",
        navMenu.classList.contains("open") ? "true" : "false"
      );
    });

    document.addEventListener("click", function (e) {
      if (!navMenu.contains(e.target) && !burger.contains(e.target)) {
        navMenu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });

    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        navMenu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      });
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        navMenu.classList.remove("open");
        burger.setAttribute("aria-expanded", "false");
      }
    });
  }

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

    function updateLightboxImage() {
      const current = zoomableImages[currentIndex];
      lightboxImg.src = current.src;
      lightboxImg.alt = current.alt || "Увеличенное изображение";
    }

    function openLightbox(index) {
      currentIndex = index;
      updateLightboxImage();
      lightbox.classList.add("active");
      lightbox.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }

    function closeLightbox() {
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    function showPrev(e) {
      if (e) e.stopPropagation();
      currentIndex =
        (currentIndex - 1 + zoomableImages.length) % zoomableImages.length;
      updateLightboxImage();
    }

    function showNext(e) {
      if (e) e.stopPropagation();
      currentIndex = (currentIndex + 1) % zoomableImages.length;
      updateLightboxImage();
    }

    zoomableImages.forEach(function (img, index) {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", function () {
        openLightbox(index);
      });
    });

    closeBtn.addEventListener("click", function (e) {
      e.stopPropagation();
      closeLightbox();
    });

    prevBtn.addEventListener("click", showPrev);
    nextBtn.addEventListener("click", showNext);

    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("active")) return;

      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    });

    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener(
      "touchstart",
      function (e) {
        touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    lightbox.addEventListener(
      "touchend",
      function (e) {
        touchEndX = e.changedTouches[0].screenX;
        const delta = touchEndX - touchStartX;

        if (Math.abs(delta) > 50) {
          if (delta > 0) {
            showPrev();
          } else {
            showNext();
          }
        }
      },
      { passive: true }
    );
  }
});
