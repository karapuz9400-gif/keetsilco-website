const yearNode = document.querySelector("#year");
const revealNodes = document.querySelectorAll(".reveal");
const introVideo = document.querySelector("#intro-video");
const soundToggle = document.querySelector(".sound-toggle");

if (yearNode) {
  yearNode.textContent = new Date().getFullYear();
}

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
    rootMargin: "0px 0px -36px 0px",
  }
);

revealNodes.forEach((node) => {
  revealObserver.observe(node);
});

if (introVideo) {
  introVideo.muted = true;
}

if (introVideo && soundToggle) {
  soundToggle.addEventListener("click", () => {
    const willUnmute = introVideo.muted;

    introVideo.muted = !willUnmute ? true : false;
    soundToggle.textContent = willUnmute ? "Sound Off" : "Sound On";
    soundToggle.setAttribute("aria-pressed", willUnmute ? "true" : "false");

    if (willUnmute) {
      introVideo.play().catch(() => {
        introVideo.muted = true;
        soundToggle.textContent = "Sound On";
        soundToggle.setAttribute("aria-pressed", "false");
      });
    }
  });
}
