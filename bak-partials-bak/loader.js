// js/loader.js
window.addEventListener("DOMContentLoaded", () => {
    const load = async (id, file) => {
      const res = await fetch(file);
      const html = await res.text();
      document.getElementById(id).innerHTML = html;
    };
    
    load("about", "partials/about.html");
    load("header", "partials/header.html");
    load("contact", "partials/contact.html");
    load("featured", "partials/featured.html");
    load("intro", "partials/intro.html");
    load("projects", "partials/projects.html");
    load("services", "partials/services.html");
    load("team", "partials/team.html");
    load("savings-calculator", "partials/savings-calculator.html");
    load("partners", "partials/partners.html");
    load("footer", "partials/footer.html");
  });
  