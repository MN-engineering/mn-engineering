document.addEventListener("DOMContentLoaded", () => {
  /* =========================
     BURGER MENU
  ========================= */
  const burger = document.getElementById("burger");
  const navMenu = document.getElementById("nav-menu");

  if (burger && navMenu) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      navMenu.classList.toggle("active");

      const expanded = burger.classList.contains("active");
      burger.setAttribute("aria-expanded", expanded ? "true" : "false");
    });

    navMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        burger.classList.remove("active");
        navMenu.classList.remove("active");
        burger.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =========================
     LIGHTBOX GALLERY
  ========================= */
  const zoomableImages = Array.from(document.querySelectorAll(".zoomable"));
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("close");
  const prevBtn = document.getElementById("lightbox-prev");
  const nextBtn = document.getElementById("lightbox-next");

  if (!zoomableImages.length || !lightbox || !lightboxImg) return;

  let currentIndex = 0;
  let scale = 1;
  let lastTapTime = 0;

  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;

  function applyZoom() {
    lightboxImg.style.transform = `scale(${scale})`;
    lightboxImg.style.cursor = scale > 1 ? "zoom-out" : "zoom-in";
  }

  function resetZoom() {
    scale = 1;
    applyZoom();
  }

  function updateImage() {
    const img = zoomableImages[currentIndex];
    if (!img) return;

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt || "Увеличенное изображение";
    resetZoom();
  }

  function openLightbox(index) {
    currentIndex = index;
    updateImage();
    lightbox.classList.add("active");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("active");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    resetZoom();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + zoomableImages.length) % zoomableImages.length;
    updateImage();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % zoomableImages.length;
    updateImage();
  }

  function toggleZoom() {
    scale = scale === 1 ? 2 : 1;
    applyZoom();
  }

  zoomableImages.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });

  if (closeBtn) {
    closeBtn.addEventListener("click", closeLightbox);
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showPrev();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      showNext();
    });
  }

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  lightboxImg.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleZoom();
  });

  lightboxImg.addEventListener("touchstart", (e) => {
    const touch = e.changedTouches[0];
    startX = touch.screenX;
    startY = touch.screenY;
  }, { passive: true });

  lightboxImg.addEventListener("touchend", (e) => {
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTapTime;

    const touch = e.changedTouches[0];
    endX = touch.screenX;
    endY = touch.screenY;

    const diffX = endX - startX;
    const diffY = endY - startY;

    if (tapLength < 300 && tapLength > 0) {
      e.preventDefault();
      toggleZoom();
    } else if (Math.abs(diffX) > 50 && Math.abs(diffY) < 80) {
      if (diffX > 0) {
        showPrev();
      } else {
        showNext();
      }
    }

    lastTapTime = currentTime;
  }, { passive: false });

  lightboxImg.addEventListener("wheel", (e) => {
    e.preventDefault();

    if (e.deltaY < 0) {
      scale = Math.min(scale + 0.25, 4);
    } else {
      scale = Math.max(scale - 0.25, 1);
    }

    applyZoom();
  }, { passive: false });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") showPrev();
    if (e.key === "ArrowRight") showNext();
  });
});
