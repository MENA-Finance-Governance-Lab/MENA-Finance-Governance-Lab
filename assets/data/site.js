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

  // Country codes used in the hero spillover matrix. Change or reorder freely.
  matrixCountries: [
    "LBN", "ARE", "SAU", "QAT", "KWT", "BHR",
    "OMN", "EGY", "JOR", "MAR", "TUN"
  ]
};
