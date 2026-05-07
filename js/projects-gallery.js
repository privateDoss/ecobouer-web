(function ($) {
  "use strict";

  if (!$ || !$.fn) {
    return;
  }

  var projectsDir = "img/ecobouer/projects/";

  var CATEGORY_LABEL = {
    residential: "Residential",
    commercial: "Commercial",
    infrastructure: "Solar Street Lights"
  };

  var FILTER_DEFS = [
    { id: "all", label: "All" },
    { id: "residential", label: "Residential" },
    { id: "commercial", label: "Commercial" },
    { id: "infrastructure", label: "Solar Street Lights" }
  ];

  /** Build URL-safe path for a folder name that may contain spaces. */
  function folderUrl(baseDir, folderName) {
    return (
      baseDir +
      folderName
        .split("/")
        .filter(Boolean)
        .map(function (segment) {
          return encodeURIComponent(segment);
        })
        .join("/") +
      "/"
    );
  }

  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, function (ch) {
      return (
        {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;"
        }[ch] || ch
      );
    });
  }

  function escapeAttr(text) {
    return escapeHtml(text).replace(/\n/g, " ");
  }

  var projects = [
    {
      title: "6 kW Hybrid Project",
      folder: "6KW Hybrid Project",
      images: ["1.png"],
      category: "residential"
    },
    {
      title: "Sto. Tomas Meat Cold Storage",
      folder: "Sto. Tomas Meat Cold Storage",
      images: ["1.jpg", "2.jpg"],
      category: "commercial"
    },
    {
      title: "Hotel Casa Ilustre",
      folder: "Hotel Casa Ilustre",
      images: ["1.jpg", "2.jpg", "3.jpg"],
      category: "commercial"
    },
    {
      title: "McDonald's Balayan — 50 kW",
      folder: "Mcdonalds Balayan 50KW Project",
      images: ["1.png", "2.png"],
      category: "commercial"
    },
    {
      title: "McDonald's Cuenca — 22 kW",
      folder: "Mcdonalds Cuenca 22KW Project",
      images: ["1.jpeg", "2.jpeg"],
      category: "commercial"
    },
    {
      title: "McDonald's Tanauan — 50 kW",
      folder: "McDonalds Tanauan 50kW Project",
      images: ["1.jpg", "2.jpg"],
      category: "commercial"
    },
    {
      title: "Solar Street Light — Cuenca",
      folder: "Solar Street Light Cuenca",
      images: ["1.jpg", "2.jpg"],
      category: "infrastructure"
    }
  ];

  $(function () {
    var $gallery = $("#project-gallery");
    var $filters = $("#project-filters");
    var $modal = $("#projectDetailModal");

    if (!$gallery.length || typeof $.fn.modal !== "function") {
      return;
    }

    FILTER_DEFS.forEach(function (f) {
      var active = f.id === "all" ? " active" : "";
      $filters.append(
        '<button type="button" class="project-filter-btn' +
          active +
          '" data-filter="' +
          escapeAttr(f.id) +
          '">' +
          escapeHtml(f.label) +
          "</button>"
      );
    });

    projects.forEach(function (project, index) {
      var basePath = folderUrl(projectsDir, project.folder);
      var thumbSrc = basePath + encodeURIComponent(project.images[0]);
      var catLabel = CATEGORY_LABEL[project.category] || project.category;
      var photoWord = project.images.length === 1 ? "photo" : "photos";

      var $col = $(
        '<div class="col-lg-4 col-md-6 project-card-col" data-category="' +
          escapeAttr(project.category) +
          '"></div>'
      );

      var $card = $(
        '<article class="project-card" tabindex="0" role="button" data-project-index="' +
          index +
          '" aria-label="Open project details"></article>'
      );

      $card.html(
        '<div class="project-card__media">' +
          '<img src="' +
          escapeAttr(thumbSrc) +
          '" alt="' +
          escapeAttr(project.title) +
          '" loading="lazy">' +
          '<span class="project-card__badge">' +
          escapeHtml(catLabel) +
          "</span>" +
          "</div>" +
          '<div class="project-card__body">' +
          '<h4 class="project-card__title">' +
          escapeHtml(project.title) +
          "</h4>" +
          '<p class="project-card__meta">' +
          project.images.length +
          " " +
          photoWord +
          "</p>" +
          '<div class="project-card__cta">View gallery</div>' +
          "</div>"
      );

      $col.append($card);
      $gallery.append($col);
    });

    $filters.on("click", ".project-filter-btn", function () {
      var filter = $(this).data("filter");
      $filters.find(".project-filter-btn").removeClass("active");
      $(this).addClass("active");
      $(".project-card-col").each(function () {
        var cat = $(this).data("category");
        var show = filter === "all" || cat === filter;
        $(this).toggleClass("d-none", !show);
      });
    });

    function openModal(idx) {
      var project = projects[idx];
      if (!project) {
        return;
      }
      var basePath = folderUrl(projectsDir, project.folder);
      $("#projectModalTitle").text(project.title);
      $("#projectModalTag").text(
        CATEGORY_LABEL[project.category] || project.category
      );

      var lbGroup = "eco-project-" + idx;
      var gridParts = ['<div class="project-modal-grid">'];

      project.images.forEach(function (file, i) {
        var src = basePath + encodeURIComponent(file);
        var title =
          project.title + " — " + String(i + 1) + " / " + project.images.length;
        gridParts.push(
          '<a href="' +
            escapeAttr(src) +
            '" data-lightbox="' +
            escapeAttr(lbGroup) +
            '" data-title="' +
            escapeAttr(title) +
            '">' +
            '<img src="' +
            escapeAttr(src) +
            '" alt="' +
            escapeAttr(project.title + " photo " + (i + 1)) +
            '" loading="lazy">' +
            "</a>"
        );
      });

      gridParts.push("</div>");
      $("#projectModalBody").html(gridParts.join(""));
      $modal.modal("show");
    }

    $gallery.on("click", ".project-card", function () {
      var idx = parseInt($(this).data("project-index"), 10);
      openModal(idx);
    });

    $gallery.on("keydown", ".project-card", function (e) {
      if (e.key !== "Enter" && e.key !== " ") {
        return;
      }
      e.preventDefault();
      var idx = parseInt($(this).data("project-index"), 10);
      openModal(idx);
    });
  });
})(window.jQuery);
