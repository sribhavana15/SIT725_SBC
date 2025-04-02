document.addEventListener("DOMContentLoaded", function () {
  M.AutoInit(); // Initialize Materialize components

  // Fetch projects from the server
  fetch('/api/projects')
    .then((res) => res.json())
    .then((projects) => {
      const projectContainer = document.getElementById("projects");
      projectContainer.innerHTML = "";

      projects.forEach((project) => {
        const card = `
          <div class="col s12 m6 l4">
            <div class="card project-card">
              <div class="image-container">
                <img src="${project.image}" alt="${project.title}">
              </div>
              <div class="card-content">
                <span class="card-title">${project.title}</span>
                <p>${project.description}</p>
              </div>
              <div class="card-action">
                <a href="${project.link}" target="_blank">View Project</a>
              </div>
            </div>
          </div>
        `;
        projectContainer.innerHTML += card;
      });
    })
    .catch((err) => console.error("Failed to load projects:", err));
});
