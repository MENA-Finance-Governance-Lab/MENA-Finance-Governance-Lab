/* ---------------------------------------------------------------------------
   RENDERING
   Each function looks for a container on the page and fills it. Pages only
   include the containers they need, so this one file serves all four.
   --------------------------------------------------------------------------- */

/* --- Hero: growth volatility spillover matrix ----------------------------
   A stylised cross-country spillover matrix. The diagonal is a country's own
   variance share; off-diagonal cells are what it receives from its neighbours.
   Values are illustrative, not estimated. */

function renderMatrix() {
  const host = document.querySelector("[data-matrix]");
  if (!host) return;

  const codes = SITE.matrixCountries;
  const n = codes.length;

  // Deterministic pseudo-random so the pattern is stable across reloads.
  function value(i, j) {
    if (i === j) return 1;
    const s = Math.sin((i + 1) * 12.9898 + (j + 1) * 78.233) * 43758.5453;
    const r = s - Math.floor(s);
    const decay = 1 / (1 + Math.abs(i - j) * 0.55);
    return 0.08 + r * 0.62 * decay;
  }

  const yLabels = codes.map(function (c) { return "<span>" + c + "</span>"; }).join("");
  const xLabels = codes.map(function (c) { return "<span>" + c + "</span>"; }).join("");

  let cells = "";
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      const v = value(i, j).toFixed(2);
      const diag = i === j ? " matrix__cell--diag" : "";
      const delay = ((i + j) * 22).toString();
      cells +=
        '<div class="matrix__cell' + diag + '" style="--o:' + v +
        ";animation-delay:" + delay + 'ms"></div>';
    }
  }

  host.innerHTML =
    '<div class="matrix__frame">' +
      '<div class="matrix__ylabels" style="grid-template-rows:repeat(' + n + ',1fr)" aria-hidden="true">' +
        yLabels +
      "</div>" +
      '<div class="matrix__grid" role="img" aria-label="Illustrative matrix of growth volatility spillovers between ' +
        n + ' MENA economies" ' +
        'style="grid-template-columns:repeat(' + n + ',1fr);grid-template-rows:repeat(' + n + ',1fr)">' +
        cells +
      "</div>" +
      '<div class="matrix__xlabels" style="grid-template-columns:repeat(' + n + ',1fr)" aria-hidden="true">' +
        xLabels +
      "</div>" +
    "</div>" +
    '<p class="matrix__caption">Growth volatility spillovers, MENA economies. Rows receive, columns transmit. ' +
      "Illustrative pattern, not estimated output.</p>";
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

/* Home page: the handful marked  featured: true  */
function renderFeatured() {
  const host = document.querySelector("[data-featured]");
  if (!host) return;

  host.innerHTML = PUBLICATIONS
    .filter(function (p) { return p.featured; })
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

    return (
      '<section class="strand" id="' + t.id + '">' +
        '<div class="strand__head">' +
          '<span class="eyebrow">' + t.tag + "</span>" +
          "<h2>" + t.title + "</h2>" +
          "<p>" + t.long + "</p>" +
        "</div>" +
        '<ul class="pubs">' + papers + "</ul>" +
      "</section>"
    );
  }).join("");
}

/* Research page: work in progress */
function renderWorkingPapers() {
  const host = document.querySelector("[data-working]");
  if (!host) return;

  if (typeof WORKING_PAPERS === "undefined" || WORKING_PAPERS.length === 0) {
    host.closest("[data-working-section]").remove();
    return;
  }

  host.innerHTML = WORKING_PAPERS.map(function (p) {
    return (
      '<li class="pub">' +
        '<div class="pub__year">' + p.status + "</div>" +
        "<div>" +
          '<h3 class="pub__title">' + p.title + "</h3>" +
          '<p class="pub__meta"><span class="pub__authors">' + p.authors + "</span></p>" +
        "</div>" +
      "</li>"
    );
  }).join("");
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
