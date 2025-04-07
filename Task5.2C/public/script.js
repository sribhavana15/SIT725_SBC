// public/script.js
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("projects");
  try {
    const res = await fetch("/api/projects");
    const projects = await res.json();

    projects.forEach(project => {
      const card = document.createElement("div");
      card.className = "col s12 m6 l4";
      card.innerHTML = `
        <div class="card project-card">
          <div class="image-container">
            <img src="${project.image}" alt="${project.title}">
          </div>
          <div class="card-content">
            <span class="card-title">${project.title}</span>
            <p>${project.description}</p>
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Failed to load projects:", error);
  }
});
