document.addEventListener("DOMContentLoaded", () => {
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

  const images = document.querySelectorAll(".zoomable");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.getElementById("close");

  if (images.length && lightbox && lightboxImg && closeBtn) {
    images.forEach(img => {
      img.addEventListener("click", () => {
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || "";
        document.body.style.overflow = "hidden";
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove("active");
      lightbox.setAttribute("aria-hidden", "true");
      lightboxImg.src = "";
      lightboxImg.alt = "";
      document.body.style.overflow = "";
    };

    closeBtn.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && lightbox.classList.contains("active")) {
        closeLightbox();
      }
    });
  }
});
