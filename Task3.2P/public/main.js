document.addEventListener('DOMContentLoaded', function () {
    M.AutoInit();
  
    const projectList = [
      {
        title: "Big Data Pipeline",
        image: "images/pipeline.png",
        link: "#",
        description: "ETL workflow using Apache Spark."
      },
      {
        title: "Cloud Dashboard",
        image: "images/dashboard.png",
        link: "#",
        description: "Visualized cloud metrics with Grafana."
      },
      {
        title: "API Service",
        image: "images/api.png",
        link: "#",
        description: "Custom Node.js API for anomaly detection."
      }
    ];
  
    const addProjects = (items) => {
        const container = document.getElementById("projects");
        container.innerHTML = "";
      
        items.forEach(item => {
          const card = document.createElement("div");
          card.className = "col s12 m6 l4";
      
          card.innerHTML = `
            <div class="card project-card">
              <div class="card-image image-container">
                <img src="${item.image}" alt="${item.title}">
              </div>
              <div class="card-content">
                <span class="card-title">${item.title}</span>
                <p>${item.description}</p>
              </div>
              <div class="card-action center-align">
                <a href="${item.link}" class="orange-text text-darken-2">LEARN MORE</a>
              </div>
            </div>
          `;
      
          container.appendChild(card);
        });
      };
           
      
  
    addProjects(projectList);
  });
  