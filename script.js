const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle("show", entry.isIntersecting);
      if (entry.isIntersecting) observer.unobserve(entry.target);
    });
  },
  { threshold: 1 }
);

const cards = document.querySelectorAll(".card");
cards.forEach((card) => observer.observe(card));

const lastCardObserver = new IntersectionObserver((entries) => {
  const lastCard = entries[0];
  if (!lastCard.isIntersecting) return;
  loadMoreCards();
  lastCardObserver.unobserve(lastCard.target);
  lastCardObserver.observe(document.querySelector(".card:last-child"));
});

lastCardObserver.observe(document.querySelector(".card:last-child"));

function loadMoreCards() {
  console.log("function here");
  for (let i = 0; i < 10; i++) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = "new Card";
    observer.observe(card);
    document.querySelector(".card-container").append(card);
  }
}
