const projectCards = document.querySelector("#projectCards");
const projectFilterButtons = document.querySelectorAll("[data-filter]");

let projects = [];

if (projectCards) {
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

  projectFilterButtons.forEach(button => {
    button.addEventListener("click", () => {
      projectFilterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      const filteredProjects =
        filter === "All"
          ? projects
          : projects.filter(project => project.category === filter);

      renderProjects(filteredProjects);
    });
  });
}

function renderProjects(items) {
  projectCards.innerHTML = "";

  items.forEach(project => {
    const card = document.createElement("article");
    card.className = "card";
    card.setAttribute("role", "listitem");

    card.innerHTML = `
      ${project.image ? `<img class="card-image" src="${project.image}" alt="${project.title} preview">` : ""}

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

const creativeCards = document.querySelector("#creativeCards");
const creativeFilterButtons = document.querySelectorAll("[data-creative-filter]");

let creativeWorks = [];

if (creativeCards) {
  fetch("./data/creativeworks.json")
    .then(response => response.json())
    .then(data => {
      creativeWorks = data;
      renderCreativeWorks(creativeWorks);
    })
    .catch(error => {
      creativeCards.innerHTML = "<p>Creative works could not be loaded.</p>";
      console.error(error);
    });

  creativeFilterButtons.forEach(button => {
    button.addEventListener("click", () => {
      creativeFilterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.creativeFilter;

      const filteredWorks =
        filter === "All"
          ? creativeWorks
          : creativeWorks.filter(work => work.category === filter);

      renderCreativeWorks(filteredWorks);
    });
  });
}

function renderCreativeWorks(items) {
  creativeCards.innerHTML = "";

  items.forEach(work => {
    const card = document.createElement("article");
    card.className = "card";
    card.setAttribute("role", "listitem");

    card.innerHTML = `
      ${work.image ? `<img class="card-image" src="${work.image}" alt="${work.title} preview">` : ""}

      <h3>${work.title}</h3>
      <p class="card-summary">${work.description}</p>

      <ul class="tag-row" aria-label="Creative work tags">
        ${work.tags.map(tag => `<li class="tag">${tag}</li>`).join("")}
      </ul>

      <a class="btn btn-primary" href="${work.link}">View Work</a>
    `;

    creativeCards.appendChild(card);
  });
}

const revealItems = document.querySelectorAll(".reveal");

if (revealItems.length > 0) {
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
}

const mainProjectImage = document.querySelector("#mainProjectImage");
const galleryThumbs = document.querySelectorAll(".gallery-thumb");

if (mainProjectImage && galleryThumbs.length > 0) {
  galleryThumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      mainProjectImage.src = thumb.dataset.image;
      mainProjectImage.alt = thumb.dataset.alt;

      galleryThumbs.forEach(item => item.classList.remove("active"));
      thumb.classList.add("active");
    });
  });
}