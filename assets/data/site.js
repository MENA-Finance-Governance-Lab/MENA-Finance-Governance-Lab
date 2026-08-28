/* ---------------------------------------------------------------------------
   SITE CONFIG
   Edit the lab name, tagline and contact details here. Everything else on the
   site reads from this file, so you only ever change them once.
   --------------------------------------------------------------------------- */

const SITE = {
  // The lab's name. Appears in the header, the page titles and the footer.
  name: "MENA Finance &amp; Governance Lab",
  nameShort: "MENA Finance &amp; Governance Lab",

  // The institutional line under the name.
  affiliation: "Adnan Kassar School of Business, Lebanese American University",
  affiliationShort: "LAU · Adnan Kassar School of Business",

  // One sentence describing what the lab does. Used on the home page.
  tagline:
    "We study how financial systems, institutions and corporate governance shape growth across the Middle East and North Africa.",

  // Contact details.
  contact: {
    email: "mahmoud.araissi@lau.edu.lb",
    phone: "+961 1 786456, ext. 1630",
    office: "AKSOB 1509",
    campus: "LAU Beirut Campus",
    address: "P.O. Box 13-5053, Chouran, Beirut 1102 2801, Lebanon"
  },

  // Navigation. Add or remove items here and every page updates.
  nav: [
    { label: "Home", href: "index.html" },
    { label: "Research", href: "research.html" },
    { label: "People", href: "people.html" },
    { label: "Contact", href: "contact.html" }
  ],

  // Illustrative sector dependence on ecosystem services in the hero heatmap.
  // Values run from 0 (low dependence) to 1 (high dependence).
  natureMatrix: {
    rows: [
      { code: "AGRI", label: "Agriculture" },
      { code: "ENERGY", label: "Energy" },
      { code: "MINING", label: "Mining" },
      { code: "MFG", label: "Manufacturing" },
      { code: "BUILD", label: "Construction" },
      { code: "TOUR", label: "Tourism" },
      { code: "FIN", label: "Finance" }
    ],
    columns: [
      { code: "WATER", label: "Water supply" },
      { code: "SOIL", label: "Soil health" },
      { code: "CLIMATE", label: "Climate regulation" },
      { code: "FLOOD", label: "Flood control" },
      { code: "POLLIN.", label: "Pollination" },
      { code: "COASTAL", label: "Coastal protection" },
      { code: "BIODIV.", label: "Biodiversity" }
    ],
    values: [
      [0.95, 0.92, 0.80, 0.50, 0.88, 0.15, 0.78],
      [0.70, 0.15, 0.80, 0.40, 0.05, 0.35, 0.30],
      [0.80, 0.45, 0.55, 0.35, 0.05, 0.10, 0.50],
      [0.75, 0.30, 0.60, 0.30, 0.10, 0.15, 0.35],
      [0.55, 0.30, 0.45, 0.70, 0.05, 0.25, 0.30],
      [0.65, 0.40, 0.75, 0.35, 0.25, 0.85, 0.90],
      [0.35, 0.25, 0.55, 0.25, 0.15, 0.30, 0.45]
    ]
  }
};
