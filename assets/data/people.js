/* ---------------------------------------------------------------------------
   PEOPLE
   Add a person by copying a block. Drop any link you don't have — empty ones
   are skipped automatically. Photos go in assets/img/ (square crops work best).
   --------------------------------------------------------------------------- */

const PI = {
  name: "Mahmoud Arayssi",
  role: "Principal Investigator",
  title: "Associate Professor of Finance",
  photo: "assets/img/arayssi.jpg",
  alsoPublishedAs: "Araissi, M.",
  bio: [
    "Mahmoud Arayssi is an associate professor of finance at the Adnan Kassar School of Business. He holds a PhD in economics from Indiana University, an MA from the University of Chicago and a BA from the American University of Beirut, and has been a certified Islamic finance executive (CIFE) with the ETHICA Institute of Islamic Finance since 2018.",
    "His research covers finance and growth in MENA countries in the wake of the Arab Spring, corporate governance, gender and firm performance. Current work looks at growth volatility spillovers across countries and at oil and political conflict in the region.",
    "He has consulted for the UN Economic and Social Commission for Western Asia, contributing to the Survey of Economic and Social Developments in the ESCWA Region, and for the International Monetary Fund."
  ],
  teaching: [
    "Money and Banking",
    "Security Analysis",
    "Financial Management",
    "Financial Institutions",
    "Insurance",
    "Corporate Finance"
  ],
  links: [
    { label: "CV", url: "https://sb.lau.edu.lb/images/Mahmoud%20Arayssi%20-CV.pdf" },
    { label: "LAU profile", url: "https://sb.lau.edu.lb/about/faculty-staff/dr-mahmoud-araissi.php" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/mahmoud-arayssi-6749167/" },
    { label: "Google Scholar", url: "" },
    { label: "ORCID", url: "" },
    { label: "RePEc", url: "" },
    { label: "SSRN", url: "" }
  ]
};

const TEAM = [
  {
    name: "Coming soon",
    role: "Postdoctoral Fellow",
    photo: "",
    note: "The lab's postdoctoral researcher will be announced soon.",
    links: [
      { label: "Website", url: "" },
      { label: "Google Scholar", url: "" }
    ]
  },
  {
    name: "Malek Itani",
    role: "Research Assistant",
    photo: "assets/img/malek-itani.png",
    note: "Malek holds a Master of Science in Applied Statistics and focuses on statistical methodology and machine learning.",
    links: [
      { label: "LinkedIn", url: "https://www.linkedin.com/in/malek-ma-itani/" }
    ]
  }
];

/* Shown at the bottom of the People page. Set to null to hide the section. */
const JOINING = {
  heading: "Joining the lab",
  body:
    "The lab takes research assistants from across AKSOB, usually through the LAU graduate assistantship programme. Work is mostly panel data construction, cleaning and replication in Stata, R or Python. If you are an LAU student interested in empirical finance or development, write with a CV, a transcript and a short note on what you want to work on.",
  linkLabel: "LAU graduate assistantships",
  linkUrl: "https://sb.lau.edu.lb/aksob-experience/ga/"
};
