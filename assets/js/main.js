/* ---------------------------------------------------------------------------
   RENDERING
   Each function looks for a container on the page and fills it. Pages only
   include the containers they need, so this one file serves all four.
   --------------------------------------------------------------------------- */

/* --- Hero: nature-dependency heatmap -------------------------------------
   A sector-by-ecosystem-service view of nature dependency. Values are
   illustrative and intended to communicate the research question. */

function renderMatrix() {
  const host = document.querySelector("[data-matrix]");
  if (!host) return;

  const matrix = SITE.natureMatrix;
  const rows = matrix.rows;
  const columns = matrix.columns;

  const yLabels = rows.map(function (item) {
    return "<span>" + item.label + "</span>";
  }).join("");
  const xLabels = columns.map(function (item) {
    return "<span>" + item.label + "</span>";
  }).join("");

  let cells = "";
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < columns.length; j++) {
      const v = matrix.values[i][j].toFixed(2);
      const delay = ((i + j) * 22).toString();
      cells +=
        '<div class="matrix__cell" data-row="' + i +
        '" data-col="' + j + '" style="--o:' + v +
        ";animation-delay:" + delay + 'ms"></div>';
    }
  }

  host.innerHTML =
    '<div class="matrix__frame">' +
      '<div class="matrix__ylabels" style="grid-template-rows:repeat(' + rows.length + ',1fr)" aria-hidden="true">' +
        yLabels +
      "</div>" +
      '<div class="matrix__grid" role="img" aria-label="Illustrative heatmap of sector dependence on ecosystem services" ' +
        'data-columns="' + columns.length + '" ' +
        'style="grid-template-columns:repeat(' + columns.length + ',1fr);grid-template-rows:repeat(' + rows.length + ',1fr)">' +
        cells +
      "</div>" +
      '<div class="matrix__xlabels" style="grid-template-columns:repeat(' + columns.length + ',1fr)" aria-hidden="true">' +
        xLabels +
      "</div>" +
    "</div>" +
    '<p class="matrix__caption">Sector dependence on ecosystem services. Rows show sectors; columns show services. ' +
      "Darker cells indicate stronger dependency. Illustrative, not estimated data.</p>";

  wireMatrixInteraction(host);
}

/* A soft, localised wave follows the pointer across the matrix. The effect is
   intentionally small so the figure remains legible rather than becoming a
   game. It is skipped entirely when the visitor prefers reduced motion. */
function wireMatrixInteraction(host) {
  const grid = host.querySelector(".matrix__grid");
  const cells = Array.from(grid.querySelectorAll(".matrix__cell"));
  const columns = Number(grid.dataset.columns);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let pointer = { x: 0, y: 0 };
  let frame = 0;
  let hovering = false;

  function settle() {
    cells.forEach(function (cell) {
      cell.style.removeProperty("--wave-x");
      cell.style.removeProperty("--wave-y");
      cell.style.removeProperty("--wave-r");
      cell.style.removeProperty("--wave-scale");
      cell.style.removeProperty("--cell-color");
      cell.style.removeProperty("--cell-glow");
    });
  }

  function animate(time) {
    if (!hovering || reducedMotion.matches) return;

    const bounds = grid.getBoundingClientRect();
    const radius = Math.max(120, bounds.width * 0.52);

    cells.forEach(function (cell) {
      const x = (Number(cell.dataset.col) + 0.5) * bounds.width / columns;
      const y = (Number(cell.dataset.row) + 0.5) * bounds.height / columns;
      const dx = x - pointer.x;
      const dy = y - pointer.y;
      const distance = Math.hypot(dx, dy);
      const influence = Math.pow(Math.max(0, 1 - distance / radius), 1.65);
      const phase = distance * 0.055 - time * 0.0045;
      const breeze = Math.sin(phase) * influence;
      const direction = dx / Math.max(distance, 1);

      cell.style.setProperty("--wave-x", (breeze * 3.4 + direction * influence * 1.6).toFixed(2) + "px");
      cell.style.setProperty("--wave-y", (-Math.abs(breeze) * 2.5).toFixed(2) + "px");
      cell.style.setProperty("--wave-r", (breeze * 2.6 + direction * influence * 1.4).toFixed(2) + "deg");
      cell.style.setProperty("--wave-scale", (1 + influence * 0.035).toFixed(3));
      cell.style.setProperty("--cell-color", "color-mix(in srgb, var(--gold) " +
        (influence * 82).toFixed(1) + "%, var(--teal))");
      cell.style.setProperty("--cell-glow", (1 + influence * 0.2).toFixed(2));
    });

    frame = requestAnimationFrame(animate);
  }

  grid.addEventListener("pointerenter", function (event) {
    if (reducedMotion.matches) return;
    const bounds = grid.getBoundingClientRect();
    pointer.x = event.clientX - bounds.left;
    pointer.y = event.clientY - bounds.top;
    hovering = true;
    grid.classList.add("matrix__grid--active");
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(animate);
  });

  grid.addEventListener("pointermove", function (event) {
    const bounds = grid.getBoundingClientRect();
    pointer.x = event.clientX - bounds.left;
    pointer.y = event.clientY - bounds.top;
  });

  grid.addEventListener("pointerleave", function () {
    hovering = false;
    cancelAnimationFrame(frame);
    grid.classList.remove("matrix__grid--active");
    settle();
  });

  reducedMotion.addEventListener("change", function () {
    if (reducedMotion.matches) {
      hovering = false;
      cancelAnimationFrame(frame);
      grid.classList.remove("matrix__grid--active");
      settle();
    }
  });
}

/* --- Research theme cards ----------------------------------------------- */

function renderThemes() {
  const host = document.querySelector("[data-themes]");
  if (!host) return;

  host.innerHTML = THEMES.map(function (t) {
    return (
      '<a class="theme" href="research.html#' + t.id + '">' +
        '<span class="theme__tag">' + t.tag + "</span>" +
        '<h3 class="theme__title">' + t.title + "</h3>" +
        '<p class="theme__blurb">' + t.blurb + "</p>" +
        '<span class="theme__more">Read more &rarr;</span>' +
      "</a>"
    );
  }).join("");
}

/* --- Publications -------------------------------------------------------- */

function publicationHTML(p) {
  const title = p.url
    ? '<a href="' + p.url + '" rel="noopener">' + p.title + "</a>"
    : p.title;

  return (
    '<li class="pub">' +
      '<div class="pub__year">' + p.year + "</div>" +
      "<div>" +
        '<h3 class="pub__title">' + title + "</h3>" +
        '<p class="pub__meta">' +
          '<span class="pub__authors">' + p.authors + "</span> " +
          '<span class="pub__outlet">' + p.outlet + "</span>" +
        "</p>" +
      "</div>" +
    "</li>"
  );
}

/* Home page: the five newest publications */
function renderFeatured() {
  const host = document.querySelector("[data-featured]");
  if (!host) return;

  host.innerHTML = PUBLICATIONS.slice()
    .sort(function (a, b) { return b.year - a.year; })
    .slice(0, 5)
    .map(publicationHTML)
    .join("");
}

/* Research page: every theme, with its papers underneath */
function renderStrands() {
  const host = document.querySelector("[data-strands]");
  if (!host) return;

  host.innerHTML = THEMES.map(function (t) {
    const papers = PUBLICATIONS
      .filter(function (p) { return p.theme === t.id; })
      .sort(function (a, b) { return b.year - a.year; })
      .map(publicationHTML)
      .join("");
    const projects = typeof WORKING_PAPERS === "undefined" ? "" : WORKING_PAPERS
      .filter(function (p) { return p.theme === t.id; })
      .map(workingPaperHTML)
      .join("");
    const publishedHTML = papers ? '<ul class="pubs">' + papers + "</ul>" : "";
    const projectsHTML = projects
      ? '<div class="strand__projects">' +
          '<span class="eyebrow eyebrow--muted">Current projects</span>' +
          '<ul class="pubs">' + projects + "</ul>" +
        "</div>"
      : "";

    return (
      '<section class="strand" id="' + t.id + '">' +
        '<div class="strand__head">' +
          '<span class="eyebrow">' + t.tag + "</span>" +
          "<h2>" + t.title + "</h2>" +
          "<p>" + t.long + "</p>" +
        "</div>" +
        publishedHTML +
        projectsHTML +
      "</section>"
    );
  }).join("");
}

/* Research page: work in progress */
function workingPaperHTML(p) {
  const authors = p.authors
    ? '<p class="pub__meta"><span class="pub__authors">' + p.authors + "</span></p>"
    : "";

  return (
    '<li class="pub">' +
      '<div class="pub__year">' + p.status + "</div>" +
      "<div>" +
        '<h3 class="pub__title">' + p.title + "</h3>" +
        authors +
      "</div>" +
    "</li>"
  );
}

function renderWorkingPapers() {
  const host = document.querySelector("[data-working]");
  if (!host) return;

  if (typeof WORKING_PAPERS === "undefined" || WORKING_PAPERS.length === 0) {
    host.closest("[data-working-section]").remove();
    return;
  }

  host.innerHTML = WORKING_PAPERS.map(workingPaperHTML).join("");
}

/* --- People -------------------------------------------------------------- */

function linksHTML(links) {
  const live = links.filter(function (l) { return l.url; });
  if (live.length === 0) return "";
  return (
    '<ul class="linklist">' +
      live.map(function (l) {
        return '<li><a href="' + l.url + '" rel="noopener">' + l.label + "</a></li>";
      }).join("") +
    "</ul>"
  );
}

const PLACEHOLDER_PORTRAIT =
  '<div class="portrait portrait--placeholder">Photo<br>to come</div>';

function portraitHTML(src, alt) {
  if (!src) return PLACEHOLDER_PORTRAIT;
  return '<img class="portrait" src="' + src + '" alt="' + alt + '">';
}

/* If a photo file isn't there yet, show the placeholder rather than a broken
   image icon. Run this after any portrait is added to the page. */
function wirePortraitFallbacks() {
  document.querySelectorAll("img.portrait").forEach(function (img) {
    img.addEventListener("error", function () {
      const div = document.createElement("div");
      div.className = "portrait portrait--placeholder";
      div.innerHTML = "Photo<br>to come";
      img.replaceWith(div);
    });
  });
}

function renderPI() {
  const host = document.querySelector("[data-pi]");
  if (!host) return;

  const bio = PI.bio.map(function (para) { return "<p>" + para + "</p>"; }).join("");
  const alias = PI.alsoPublishedAs
    ? '<p class="person__alias">Also publishes as ' + PI.alsoPublishedAs + "</p>"
    : "";
  const teaching = PI.teaching && PI.teaching.length
    ? '<h3 style="margin-top:2rem">Teaching</h3><ul class="taglist">' +
      PI.teaching.map(function (t) { return "<li>" + t + "</li>"; }).join("") +
      "</ul>"
    : "";

  host.innerHTML =
    "<div>" + portraitHTML(PI.photo, PI.name) + "</div>" +
    "<div>" +
      '<h2 class="person__name">' + PI.name + "</h2>" +
      '<div class="person__role">' + PI.role + " · " + PI.title + "</div>" +
      alias + bio + linksHTML(PI.links) + teaching +
    "</div>";
}

function renderTeam() {
  const host = document.querySelector("[data-team]");
  if (!host) return;

  host.innerHTML = TEAM.map(function (m) {
    return (
      '<div class="team__member">' +
        portraitHTML(m.photo, m.name) +
        "<h3>" + m.name + "</h3>" +
        '<div class="person__role">' + m.role + "</div>" +
        "<p>" + m.note + "</p>" +
        linksHTML(m.links || []) +
      "</div>"
    );
  }).join("");
}

function renderJoining() {
  const host = document.querySelector("[data-joining]");
  if (!host) return;

  if (typeof JOINING === "undefined" || !JOINING) { host.remove(); return; }

  const link = JOINING.linkUrl
    ? '<p><a href="' + JOINING.linkUrl + '" rel="noopener">' + JOINING.linkLabel + " &rarr;</a></p>"
    : "";

  host.innerHTML =
    '<span class="eyebrow">Openings</span>' +
    "<h2>" + JOINING.heading + "</h2>" +
    '<div class="callout"><p>' + JOINING.body + "</p>" + link + "</div>";
}

/* --- Contact ------------------------------------------------------------- */

function renderContactDetails() {
  const host = document.querySelector("[data-contact]");
  if (!host) return;

  const c = SITE.contact;
  host.innerHTML =
    "<dt>Email</dt><dd><a href='mailto:" + c.email + "'>" + c.email + "</a></dd>" +
    "<dt>Phone</dt><dd>" + c.phone + "</dd>" +
    "<dt>Office</dt><dd>" + c.office + "</dd>" +
    "<dt>Campus</dt><dd>" + c.campus + "</dd>" +
    "<dt>Post</dt><dd>" + c.address + "</dd>";
}

/* --- Boot ---------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {
  mountShell();
  renderMatrix();
  renderThemes();
  renderFeatured();
  renderStrands();
  renderWorkingPapers();
  renderPI();
  renderTeam();
  wirePortraitFallbacks();
  renderJoining();
  renderContactDetails();
});
