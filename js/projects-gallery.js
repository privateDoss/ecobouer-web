(function () {
  "use strict";

  document.addEventListener("DOMContentLoaded", function () {
    const projectsDir = "img/ecobouer/projects/";
    const projectNames = [
      "Batangas Residential 6KW Hybrid Project",
      "Balayan, Batangas Residential 6KW Hybrid Project",
      "Mcdonalds Balayan 50KW Project",
      "Mcdonalds Cuenca 22KW Project"
    ];

    const galleryContainer = document.getElementById("project-gallery");
    if (!galleryContainer) {
      return;
    }

    projectNames.forEach(function (name) {
      const projectPath = `${projectsDir}${name}`;
      const projectHTML = `
            <div class="col-12 project-block">
              <h4 class="project-title">${name}</h4>
              <div class="row">
                <div class="col-md-6">
                  <img src="${projectPath}/1.jpg" class="img-fluid project-img mb-3" alt="${name} image 1">
                </div>
                <div class="col-md-6">
                  <img src="${projectPath}/2.jpg" class="img-fluid project-img mb-3" alt="${name} image 2">
                </div>
              </div>
            </div>
          `;
      galleryContainer.innerHTML += projectHTML;
    });
  });
})();
