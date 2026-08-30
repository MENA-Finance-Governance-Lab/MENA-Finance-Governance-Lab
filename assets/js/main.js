/* ---------------------------------------------------------------------------
   RENDERING
   Each function looks for a container on the page and fills it. Pages only
   include the containers they need, so this one file serves all four.
   --------------------------------------------------------------------------- */

/* --- Hero: MENA logistics map -------------------------------------------
   Country geometry comes from Natural Earth; road geometry from OpenStreetMap;
   gateways from NGA's World Port Index; sea corridors follow navigable water.
   This remains regional cartography, not a routing or vessel-navigation tool. */

function renderMenaMap() {
  const host = document.querySelector("[data-mena-map]");
  if (!host) return;

  const roadRevealGroup = host.querySelector("[data-road-reveal-mask]");
  const countriesGroup = host.querySelector("[data-map-countries]");
  const roadsGroup = host.querySelector("[data-map-roads]");
  const maritimeGroup = host.querySelector("[data-map-maritime]");
  const portsGroup = host.querySelector("[data-map-ports]");
  const mapSvg = host.querySelector(".mena-map__svg");
  const svgNamespace = "http://www.w3.org/2000/svg";

  const compactMap = window.matchMedia("(max-width: 860px)");
  function updateMapViewBox() {
    mapSvg.setAttribute("viewBox", compactMap.matches ? "250 80 750 380" : "0 0 1000 580");
  }
  updateMapViewBox();
  if (compactMap.addEventListener) compactMap.addEventListener("change", updateMapViewBox);

  function project(coordinates) {
    const longitude = coordinates[0];
    const latitude = coordinates[1];
    const scale = 8.2;
    return [
      320 + (longitude + 17) * scale,
      135 + (43 - latitude) * scale
    ];
  }

  function geometryPath(geometry) {
    const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
    return polygons.map(function (polygon) {
      return polygon.map(function (ring) {
        return ring.map(function (coordinate, index) {
          const point = project(coordinate);
          return (index === 0 ? "M" : "L") + point[0].toFixed(2) + "," + point[1].toFixed(2);
        }).join(" ") + " Z";
      }).join(" ");
    }).join(" ");
  }

  function linePath(geometry) {
    const lines = geometry.type === "LineString" ? [geometry.coordinates] : geometry.coordinates;
    return lines.map(function (line) {
      return line.map(function (coordinate, index) {
        const point = project(coordinate);
        return (index === 0 ? "M" : "L") + point[0].toFixed(2) + "," + point[1].toFixed(2);
      }).join(" ");
    }).join(" ");
  }

  function focusInfrastructure(code) {
    host.classList.toggle("mena-map--country-focus", Boolean(code));
    host.querySelectorAll(".map-country").forEach(function (country) {
      country.classList.toggle("is-active", Boolean(code) && country.dataset.countryCode === code);
    });
    host.querySelectorAll("[data-logistics-country], [data-logistics-countries]").forEach(function (element) {
      const countries = element.dataset.logisticsCountries
        ? element.dataset.logisticsCountries.split(" ")
        : [element.dataset.logisticsCountry];
      element.classList.toggle("is-active", Boolean(code) && countries.includes(code));
    });
  }

  function launchRoadReveal(event) {
    if (!event || !mapSvg.getScreenCTM()) return;
    const cursor = mapSvg.createSVGPoint();
    cursor.x = event.clientX;
    cursor.y = event.clientY;
    const point = cursor.matrixTransform(mapSvg.getScreenCTM().inverse());
    const reveal = document.createElementNS(svgNamespace, "circle");
    reveal.setAttribute("class", "map-road-reveal");
    reveal.setAttribute("cx", point.x.toFixed(2));
    reveal.setAttribute("cy", point.y.toFixed(2));
    reveal.setAttribute("r", "112");
    reveal.setAttribute("fill", "url(#road-reveal-gradient)");
    roadRevealGroup.replaceChildren(reveal);
  }

  function showCountryStats(code, event) {
    focusInfrastructure(code);
    launchRoadReveal(event);
  }

  function showNetworkOverview() {
    focusInfrastructure(null);
    roadRevealGroup.replaceChildren();
  }

  function bindCountry(element, code) {
    element.addEventListener("pointerenter", function (event) { showCountryStats(code, event); });
    element.addEventListener("pointerleave", showNetworkOverview);
  }

  Promise.all([
    fetch("assets/data/mena-countries.geojson").then(function (response) {
      if (!response.ok) throw new Error("Country geometry could not be loaded.");
      return response.json();
    }),
    fetch("assets/data/mena-logistics.geojson").then(function (response) {
      if (!response.ok) throw new Error("Logistics geometry could not be loaded.");
      return response.json();
    })
  ])
    .then(function (collections) {
      const collection = collections[0];
      const logistics = collections[1];

      collection.features.forEach(function (feature) {
        const code = feature.properties.code;
        const path = document.createElementNS(svgNamespace, "path");
        path.setAttribute("d", geometryPath(feature.geometry));
        path.setAttribute("class", "map-country");
        path.setAttribute("data-country-code", code);
        path.setAttribute("fill-rule", "evenodd");
        countriesGroup.appendChild(path);

        bindCountry(path, code);
      });

      logistics.features.forEach(function (feature) {
        const properties = feature.properties;
        if (properties.kind === "road") {
          const road = document.createElementNS(svgNamespace, "path");
          road.setAttribute("d", linePath(feature.geometry));
          road.setAttribute("class", "map-road map-road--" + properties.roadClass);
          road.setAttribute("data-logistics-country", properties.country);
          roadsGroup.appendChild(road);
          return;
        }

        if (properties.kind === "maritime") {
          const maritime = document.createElementNS(svgNamespace, "path");
          maritime.setAttribute("d", linePath(feature.geometry));
          maritime.setAttribute("class", "map-maritime");
          maritime.setAttribute("data-logistics-countries", properties.from + " " + properties.to);

          const title = document.createElementNS(svgNamespace, "title");
          title.textContent = properties.origin + " to " + properties.destination +
            " maritime supply corridor · " + Number(properties.distanceKm).toLocaleString("en-US") + " km";
          maritime.appendChild(title);
          maritimeGroup.appendChild(maritime);
          return;
        }

        if (properties.kind === "port") {
          const point = project(feature.geometry.coordinates);
          const port = document.createElementNS(svgNamespace, "circle");
          port.setAttribute("class", "map-port");
          port.setAttribute("cx", point[0].toFixed(2));
          port.setAttribute("cy", point[1].toFixed(2));
          port.setAttribute("r", properties.importance === "hub" ? "3.1" : "2.15");
          port.setAttribute("data-logistics-country", properties.country);

          const title = document.createElementNS(svgNamespace, "title");
          title.textContent = properties.name + " · " + properties.harborSize + " port gateway";
          port.appendChild(title);
          portsGroup.appendChild(port);
        }
      });

      host.addEventListener("pointerleave", function () {
        showNetworkOverview();
      });
      host.classList.add("mena-map--ready");
      showNetworkOverview();
    })
    .catch(function () {
      host.classList.add("mena-map--error");
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
  renderMenaMap();
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
