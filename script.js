const projectCards = document.querySelector("#projectCards");
const filterButtons = document.querySelectorAll(".filter-btn");

let projects = [];

fetch("./data/projects.json")
  .then(response => response.json())
  .then(data => {
    projects = data;
    renderProjects(projects);
  })
  .catch(error => {
    projectCards.innerHTML = "<p>Projects could not be loaded.</p>";
    console.error(error);
  });

function renderProjects(items) {
  projectCards.innerHTML = "";

  items.forEach(project => {
    const card = document.createElement("article");
    card.className = "card";
    card.setAttribute("role", "listitem");

    card.innerHTML = `
      <!-- <p class="card-status">${project.status}</p> -->
      <p class="card-date">${project.date}</p>
      <h3>${project.title}</h3>
      <p class="card-summary">${project.description}</p>

      <ul class="tag-row" aria-label="Tech stack">
        ${project.tags.map(tag => `<li class="tag">${tag}</li>`).join("")}
      </ul>

      ${
        project.link !== "#"
          ? `<a class="btn btn-primary" href="${project.link}">View Project</a>`
          : `<button class="btn btn-secondary" disabled>Coming Soon</button>`
      }
    `;

    projectCards.appendChild(card);
  });
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    const filter = button.dataset.filter;

    const filteredProjects =
      filter === "All"
        ? projects
        : projects.filter(project => project.category === filter);

    renderProjects(filteredProjects);
  });
});

const creativeCards = document.querySelector("#creativeCards");

fetch("./data/creativeworks.json")
  .then(response => response.json())
  .then(data => {
    renderCreativeWorks(data);
  });

function renderCreativeWorks(items) {
  creativeCards.innerHTML = "";

  items.forEach(work => {
    const card = document.createElement("article");
    card.className = "card";
    card.setAttribute("role", "listitem");

    card.innerHTML = `
      <h3>${work.title}</h3>
      <p class="card-summary">${work.description}</p>

      <ul class="tag-row" aria-label="Tools">
        ${work.tags.map(tag => `<li class="tag">${tag}</li>`).join("")}
      </ul>

      <a class="btn btn-primary" href="${work.link}">Explore</a>
    `;

    creativeCards.appendChild(card);
  });
}

const revealItems = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  {
    threshold: 0.2
  }
);

revealItems.forEach(item => revealObserver.observe(item));

if (creativeCards) {
  fetch("./data/creativeworks.json")
    .then(response => response.json())
    .then(data => {
      renderCreativeWorks(data);
    });
}