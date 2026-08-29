/* ---------------------------------------------------------------------------
   RENDERING
   Each function looks for a container on the page and fills it. Pages only
   include the containers they need, so this one file serves all four.
   --------------------------------------------------------------------------- */

/* --- Hero: MENA logistics map -------------------------------------------
   Country geometry comes from Natural Earth; road geometry from OpenStreetMap;
   gateways from NGA's World Port Index; sea corridors follow navigable water.
   This remains regional cartography, not a routing or vessel-navigation tool. */

const MAP_CAPITALS = {
  DZA: [3.0588, 36.7538], BHR: [50.586, 26.2285], EGY: [31.2357, 30.0444],
  IRN: [51.389, 35.6892], IRQ: [44.3661, 33.3152], ISR: [35.2137, 31.7683],
  JOR: [35.9106, 31.9539], KWT: [47.9774, 29.3759], LBN: [35.5018, 33.8938],
  LBY: [13.1913, 32.8872], MAR: [-6.8498, 34.0209], OMN: [58.4059, 23.588],
  PSX: [35.2034, 31.9038], QAT: [51.531, 25.2854], SAU: [46.6753, 24.7136],
  SYR: [36.2765, 33.5138], TUN: [10.1815, 36.8065], TUR: [32.8597, 39.9334],
  ARE: [54.3773, 24.4539], YEM: [44.2067, 15.3694]
};

const MAP_NAMES = {
  DZA: "Algeria", BHR: "Bahrain", EGY: "Egypt", IRN: "Iran",
  IRQ: "Iraq", ISR: "Israel", JOR: "Jordan", KWT: "Kuwait",
  LBN: "Lebanon", LBY: "Libya", MAR: "Morocco", OMN: "Oman",
  PSX: "Palestine", QAT: "Qatar", SAU: "Saudi Arabia", SYR: "Syria",
  TUN: "Tunisia", TUR: "Turkey", ARE: "United Arab Emirates", YEM: "Yemen"
};

const MAP_STATS = {
  DZA: { capital: "Algiers", currency: "Algerian dinar", subregion: "Maghreb" },
  BHR: { capital: "Manama", currency: "Bahraini dinar", subregion: "GCC" },
  EGY: { capital: "Cairo", currency: "Egyptian pound", subregion: "North Africa" },
  IRN: { capital: "Tehran", currency: "Iranian rial", subregion: "Middle East" },
  IRQ: { capital: "Baghdad", currency: "Iraqi dinar", subregion: "Middle East" },
  ISR: { capital: "Jerusalem", currency: "Israeli new shekel", subregion: "Levant" },
  JOR: { capital: "Amman", currency: "Jordanian dinar", subregion: "Levant" },
  KWT: { capital: "Kuwait City", currency: "Kuwaiti dinar", subregion: "GCC" },
  LBN: { capital: "Beirut", currency: "Lebanese pound", subregion: "Levant" },
  LBY: { capital: "Tripoli", currency: "Libyan dinar", subregion: "North Africa" },
  MAR: { capital: "Rabat", currency: "Moroccan dirham", subregion: "Maghreb" },
  OMN: { capital: "Muscat", currency: "Omani rial", subregion: "GCC" },
  PSX: { capital: "Ramallah (administrative center)", currency: "Israeli new shekel / Jordanian dinar", subregion: "Levant" },
  QAT: { capital: "Doha", currency: "Qatari riyal", subregion: "GCC" },
  SAU: { capital: "Riyadh", currency: "Saudi riyal", subregion: "GCC" },
  SYR: { capital: "Damascus", currency: "Syrian pound", subregion: "Levant" },
  TUN: { capital: "Tunis", currency: "Tunisian dinar", subregion: "Maghreb" },
  TUR: { capital: "Ankara", currency: "Turkish lira", subregion: "Eastern Mediterranean" },
  ARE: { capital: "Abu Dhabi", currency: "UAE dirham", subregion: "GCC" },
  YEM: { capital: "Sana'a", currency: "Yemeni rial", subregion: "Arabian Peninsula" }
};

const MAP_CONNECTIONS = [
  /* Intra-GCC trade and value-chain integration (WTO; IMF 2024). */
  { from: "ARE", to: "SAU", type: "trade", label: "Intra-GCC trade and value chains" },
  { from: "ARE", to: "KWT", type: "trade", label: "Intra-GCC trade" },
  { from: "ARE", to: "QAT", type: "trade", label: "Intra-GCC trade" },
  { from: "ARE", to: "BHR", type: "trade", label: "Intra-GCC trade" },
  { from: "ARE", to: "OMN", type: "trade", label: "Intra-GCC trade" },
  { from: "SAU", to: "KWT", type: "trade", label: "Intra-GCC trade" },
  { from: "SAU", to: "QAT", type: "trade", label: "Intra-GCC trade" },
  { from: "SAU", to: "BHR", type: "trade", label: "Intra-GCC trade" },
  { from: "SAU", to: "OMN", type: "trade", label: "Intra-GCC trade" },

  /* Agadir trade agreement (WTO); wider Pan-Arab infrastructure trade. */
  { from: "EGY", to: "JOR", type: "trade", label: "Agadir trade area" },
  { from: "EGY", to: "MAR", type: "trade", label: "Agadir trade area" },
  { from: "EGY", to: "TUN", type: "trade", label: "Agadir trade area" },
  { from: "JOR", to: "MAR", type: "trade", label: "Agadir trade area" },
  { from: "JOR", to: "TUN", type: "trade", label: "Agadir trade area" },
  { from: "MAR", to: "TUN", type: "trade", label: "Agadir trade area" },
  { from: "DZA", to: "MAR", type: "trade", label: "Cross-border infrastructure trade" },
  { from: "DZA", to: "TUN", type: "trade", label: "Maghreb trade corridor" },
  { from: "LBY", to: "TUN", type: "trade", label: "Cross-border infrastructure trade" },
  { from: "LBY", to: "EGY", type: "trade", label: "Cross-border infrastructure trade" },

  /* GCC investment corridors to the rest of MENA (World Bank; IMF). */
  { from: "ARE", to: "EGY", type: "investment", label: "GCC investment corridor" },
  { from: "SAU", to: "EGY", type: "investment", label: "GCC investment corridor" },
  { from: "KWT", to: "EGY", type: "investment", label: "GCC investment corridor" },
  { from: "ARE", to: "JOR", type: "investment", label: "GCC investment corridor" },
  { from: "KWT", to: "JOR", type: "investment", label: "GCC investment corridor" },
  { from: "ARE", to: "MAR", type: "investment", label: "GCC investment corridor" },
  { from: "SAU", to: "MAR", type: "investment", label: "GCC investment corridor" },
  { from: "ARE", to: "TUN", type: "investment", label: "GCC investment corridor" },
  { from: "SAU", to: "TUN", type: "investment", label: "GCC investment corridor" },
  { from: "ARE", to: "IRQ", type: "investment", label: "Regional investment and trade" },
  { from: "SAU", to: "IRQ", type: "investment", label: "Regional investment and trade" },
  { from: "ARE", to: "LBN", type: "investment", label: "GCC investment linkage" },
  { from: "EGY", to: "PSX", type: "investment", label: "Cross-border infrastructure investment" },
  { from: "JOR", to: "PSX", type: "investment", label: "Cross-border infrastructure investment" },

  /* IMF-documented banking, remittance and growth-spillover channels. */
  { from: "SAU", to: "ARE", type: "financial", label: "Banking and market spillovers" },
  { from: "SAU", to: "BHR", type: "financial", label: "Growth and financial spillovers" },
  { from: "SAU", to: "JOR", type: "financial", label: "Remittance and financial spillovers" },
  { from: "SAU", to: "LBN", type: "financial", label: "Remittance and financial spillovers" },
  { from: "SAU", to: "EGY", type: "financial", label: "Remittance and financial spillovers" },
  { from: "SAU", to: "YEM", type: "financial", label: "Remittance and growth spillovers" },
  { from: "LBN", to: "SYR", type: "financial", label: "Cross-border banking exposure" }
];

function renderMenaMap() {
  const host = document.querySelector("[data-mena-map]");
  if (!host) return;

  const countriesGroup = host.querySelector("[data-map-countries]");
  const roadsGroup = host.querySelector("[data-map-roads]");
  const maritimeGroup = host.querySelector("[data-map-maritime]");
  const portsGroup = host.querySelector("[data-map-ports]");
  const mapSvg = host.querySelector(".mena-map__svg");
  const countryReadout = host.querySelector("[data-map-country]");
  const summaryReadout = host.querySelector("[data-map-summary]");
  const svgNamespace = "http://www.w3.org/2000/svg";
  let logisticsStats = {};
  let portTotal = 0;
  let routeTotal = 0;

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
    host.querySelectorAll("[data-logistics-country], [data-logistics-countries]").forEach(function (element) {
      const countries = element.dataset.logisticsCountries
        ? element.dataset.logisticsCountries.split(" ")
        : [element.dataset.logisticsCountry];
      element.classList.toggle("is-active", Boolean(code) && countries.includes(code));
    });
  }

  function showCountryStats(code) {
    const stats = MAP_STATS[code];
    const network = logisticsStats[code] || { roadKm: 0, ports: 0, routes: 0 };
    countryReadout.textContent = MAP_NAMES[code] || "Regional connections";
    summaryReadout.textContent = stats
      ? stats.capital + " · " + stats.currency + " · " +
        "major roads mapped · " + network.ports + " port gateways · " +
        network.routes + " sea corridors"
      : "Country profile unavailable";
    focusInfrastructure(code);
  }

  function showNetworkOverview() {
    countryReadout.textContent = "Regional logistics network";
    summaryReadout.textContent = Object.keys(logisticsStats).length + " country road networks · " +
      portTotal + " port gateways · " + routeTotal + " sea corridors";
    focusInfrastructure(null);
  }

  function bindCountry(element, code) {
    element.addEventListener("pointerenter", function () { showCountryStats(code); });
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
      logisticsStats = logistics.countryStats || {};

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
          routeTotal += 1;
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
          portTotal += 1;
        }
      });

      host.addEventListener("pointerleave", showNetworkOverview);
      host.classList.add("mena-map--ready");
      showNetworkOverview();
    })
    .catch(function () {
      host.classList.add("mena-map--error");
      countryReadout.textContent = "MENA logistics network";
      summaryReadout.textContent = "Map temporarily unavailable";
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
