
window.addEventListener("DOMContentLoaded", () => {
  const load = async (id, file) => {
    try {
      const res = await fetch(file);
      const html = await res.text();
      document.getElementById(id).innerHTML = html;
    } catch (error) {
      console.error(`Failed to load ${file}:`, error);
    }
  };

  load("header", "partials/header.html");
  load("intro", "partials/intro.html");
  load("about", "partials/about.html");
  load("services", "partials/services.html");
  load("calculator", "partials/calculator.html");
  load("clients", "partials/clients.html");
});
