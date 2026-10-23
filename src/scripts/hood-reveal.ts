// Neighborhood cards stay visible if JS never runs. data-stagger is applied
// only when the grid is still offscreen, so in-view loads never blink out.
const grid = document.querySelector(".hood-grid");

if (grid instanceof HTMLElement) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cards = grid.querySelectorAll(".hood");

  if (!reduce && cards.length > 0) {
    const reveal = (): void => {
      cards.forEach((card) => {
        card.classList.add("is-in");
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (grid.hasAttribute("data-stagger")) {
              reveal();
            }
            observer.disconnect();
            return;
          }
          grid.setAttribute("data-stagger", "");
        }
      },
      { rootMargin: "-80px" },
    );

    observer.observe(grid);
  }
}