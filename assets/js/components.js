/* ---------------------------------------------------------------------------
   SHARED COMPONENTS
   The header and footer are defined once here and injected into every page.
   Edit them here and all four pages change together.

   Each page carries <div data-component="header"></div> and
   <div data-component="footer"></div> where the markup should land.
   --------------------------------------------------------------------------- */

function headerHTML(current) {
  const links = SITE.nav
    .map(function (item) {
      const active = item.href === current ? ' aria-current="page"' : "";
      return '<a href="' + item.href + '"' + active + ">" + item.label + "</a>";
    })
    .join("");

  return (
    '<header class="masthead">' +
      '<div class="wrap masthead__inner">' +
        '<a class="brand" href="index.html">' +
          '<div class="brand__name">' + SITE.name + "</div>" +
          '<div class="brand__sub">' + SITE.affiliationShort + "</div>" +
        "</a>" +
        '<nav class="nav" aria-label="Main">' + links + "</nav>" +
      "</div>" +
    "</header>"
  );
}

function footerHTML() {
  const navLinks = SITE.nav
    .map(function (item) {
      return '<li><a href="' + item.href + '">' + item.label + "</a></li>";
    })
    .join("");

  return (
    '<footer class="footer">' +
      '<div class="wrap">' +
        '<div class="footer__grid">' +
          "<div>" +
            '<div class="footer__name">' + SITE.name + "</div>" +
            "<p>" + SITE.affiliation + "</p>" +
          "</div>" +
          "<div>" +
            "<h4>Pages</h4>" +
            "<ul>" + navLinks + "</ul>" +
          "</div>" +
          "<div>" +
            "<h4>Contact</h4>" +
            '<p><a href="mailto:' + SITE.contact.email + '">' + SITE.contact.email + "</a></p>" +
            "<p>" + SITE.contact.office + ", " + SITE.contact.campus + "</p>" +
          "</div>" +
        "</div>" +
        '<div class="footer__base">' +
          "<span>© <span data-year></span> " + SITE.name + "</span>" +
          '<span><a href="https://sb.lau.edu.lb/">Adnan Kassar School of Business</a></span>' +
        "</div>" +
      "</div>" +
    "</footer>"
  );
}

/* Work out which nav item is the current page. */
function currentPage() {
  const file = window.location.pathname.split("/").pop();
  return !file || file === "" ? "index.html" : file;
}

function mountShell() {
  const header = document.querySelector('[data-component="header"]');
  const footer = document.querySelector('[data-component="footer"]');

  if (header) header.outerHTML = headerHTML(currentPage());
  if (footer) footer.outerHTML = footerHTML();

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
}

document.addEventListener("DOMContentLoaded", mountShell);
