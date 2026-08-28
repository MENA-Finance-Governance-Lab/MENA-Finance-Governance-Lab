/* ---------------------------------------------------------------------------
   RESEARCH DATA
   Two lists: THEMES (the four strands of work) and PUBLICATIONS.

   To add a paper: copy an existing block, change the fields, put it at the top
   of the list. Set  featured: true  to also show it on the home page.
   The  theme  field must match one of the THEMES ids below.
   --------------------------------------------------------------------------- */

const THEMES = [
  {
    id: "finance-growth",
    tag: "Growth · Institutions",
    title: "Finance, growth and institutions in MENA",
    blurb:
      "Whether deeper financial systems actually raise growth depends on the institutions around them. We test that relationship across MENA economies, and ask what political rupture — the Arab Spring above all — did to the link.",
    long:
      "Cross-country and panel evidence on the finance–growth relationship in the Middle East and North Africa, with attention to the institutional conditions under which financial development pays off. Recent work extends the question to labour market outcomes, skill mismatch and the position of young women in the regional economy."
  },
  {
    id: "governance-esg",
    tag: "Boards · ESG",
    title: "Corporate governance and ESG disclosure",
    blurb:
      "Who sits on a board changes what a firm tells the market. We study board composition, family and royal ownership, and gender in GCC and MENA listed firms, and how each moves sustainability disclosure and valuation.",
    long:
      "Firm-level work on the governance determinants of environmental, social and governance disclosure in Gulf and wider MENA listed companies. Themes include board independence and composition, royal family directors, women on boards, and whether governance quality carries through to firm performance and market valuation."
  },
  {
    id: "macro-financial",
    tag: "Policy · Spillovers",
    title: "Macro-financial policy and spillovers",
    blurb:
      "Volatility does not stop at borders. This strand covers growth volatility spillovers across countries, bank capital regulation, and the rules that govern central bank independence and monetary targets.",
    long:
      "Research on the transmission of macroeconomic volatility between economies, the design of bank capital requirements, and monetary policy frameworks — including transparent rules for removing central bankers and the choice between nominal income and inflation targeting. Current work extends the spillover framework to oil and political conflict in MENA."
  },
  {
    id: "markets-valuation",
    tag: "Markets · Valuation",
    title: "Asset markets and valuation",
    blurb:
      "Applied work on pricing and portfolio choice: country risk in earnings multiples, gold as an investment, market integration across Arab and emerging exchanges, and models for valuing a life.",
    long:
      "Applied asset pricing and valuation, including price–earnings models adjusted for country risk, the drivers of gold prices, co-integration between Arab, US and emerging equity markets, behavioural approaches to trading, and labour-theory based models for the valuation of life in economic loss analysis."
  }
];

const PUBLICATIONS = [
  {
    theme: "governance-esg",
    year: 2024,
    authors: "Arayssi, M. and Jizi, M.",
    title: "Royal family board directors and the level of ESG disclosures in GCC listed firms",
    outlet: "Journal of Accounting &amp; Organizational Change, 20(1), 58–83",
    url: "https://doi.org/10.1108/JAOC-08-2022-0123",
    featured: true
  },
  {
    theme: "markets-valuation",
    year: 2024,
    authors: "Arayssi, M. and Yassine, N.",
    title: "International price earnings and country risk model in an Asian context",
    outlet: "Journal of Asia Business Studies, 18(1), 124–135",
    url: "https://www.emerald.com/insight/publication/issn/1558-7894",
    featured: true
  },
  {
    theme: "finance-growth",
    year: 2023,
    authors: "Arayssi, M.",
    title: "Reframing sustainable finance: the case of Lebanon",
    outlet: "Economic Research Forum",
    url: "https://theforum.erf.org.eg/2023/07/24/reframing-sustainable-finance-lessons-from-lebanon/",
    featured: true
  },
  {
    theme: "finance-growth",
    year: 2023,
    authors: "Arayssi, M., Fakih, A. and Haimoun, N.",
    title: "Skill mismatch, nepotism, job satisfaction, and young females in the MENA region",
    outlet: "Econometrics, 11(2), 16",
    url: "https://doi.org/10.3390/econometrics11020016",
    featured: true
  },
  {
    theme: "markets-valuation",
    year: 2022,
    authors: "Kouatli, I. and Arayssi, M.",
    title: "A fuzzimetric predictive analytics model to reduce emotional stock trading",
    outlet: "Intelligent and Fuzzy Techniques for Emerging Conditions and Digital Transformation, Lecture Notes in Networks and Systems, vol. 308, Springer",
    url: "https://doi.org/10.1007/978-3-030-85577-2_57"
  },
  {
    theme: "macro-financial",
    year: 2020,
    authors: "Abosedra, S., Arayssi, M., Sita, B. B. and Mutshinda, C.",
    title: "Exploring GDP growth volatility spillovers across countries",
    outlet: "Economic Modelling, 89, 577–589",
    url: "https://doi.org/10.1016/j.econmod.2019.11.015",
    featured: true
  },
  {
    theme: "governance-esg",
    year: 2020,
    authors: "Arayssi, M., Jizi, M. and Tabaja, H.",
    title: "The impact of board composition on the level of ESG disclosures in GCC countries",
    outlet: "Sustainability Accounting, Management and Policy Journal, 11(1), 137–161",
    url: "https://doi.org/10.1108/SAMPJ-05-2018-0136"
  },
  {
    theme: "governance-esg",
    year: 2019,
    authors: "Arayssi, M. and Jizi, M.",
    title: "Does corporate governance spillover firm performance? A study of valuation of MENA companies",
    outlet: "Social Responsibility Journal, 15(5), 597–620",
    url: "https://doi.org/10.1108/SRJ-06-2018-0157"
  },
  {
    theme: "finance-growth",
    year: 2019,
    authors: "Arayssi, M., Fakih, A. and Haimoun, N.",
    title: "Did the Arab Spring reduce MENA countries' growth?",
    outlet: "Applied Economics Letters, 26(19), 1579–1585",
    url: "https://doi.org/10.1080/13504851.2019.1584363"
  },
  {
    theme: "finance-growth",
    year: 2018,
    authors: "Arayssi, M., Fakih, A. and Kassem, M.",
    title: "Government and financial institutional determinants of development in MENA countries",
    outlet: "Emerging Markets Finance and Trade",
    url: "https://www.tandfonline.com/eprint/uMn444x9VGEp3EEXgKGv/full"
  },
  {
    theme: "finance-growth",
    year: 2017,
    authors: "Arayssi, M. and Fakih, A.",
    title: "Finance–growth nexus in a changing political region: how important was the Arab Spring?",
    outlet: "Economic Analysis and Policy, 55, 106–123",
    url: "https://doi.org/10.1016/j.eap.2017.05.001"
  },
  {
    theme: "finance-growth",
    year: 2017,
    authors: "Arayssi, M. and Fakih, A.",
    title: "The finance–growth nexus, again: new evidence from Kenya",
    outlet: "Economic Issues, 22(2), 33–59",
    url: ""
  },
  {
    theme: "governance-esg",
    year: 2016,
    authors: "Arayssi, M., Dah, M. and Jizi, M.",
    title: "Women on boards, sustainability reporting and firm performance",
    outlet: "Sustainability Accounting, Management and Policy Journal, 7(3), 376–401",
    url: "https://doi.org/10.1108/SAMPJ-07-2015-0055"
  },
  {
    theme: "macro-financial",
    year: 2015,
    authors: "Arayssi, M.",
    title: "The effect of private investments on banks' capital requirements",
    outlet: "The European Journal of Finance, 22(15), 1580–1595",
    url: "https://doi.org/10.1080/1351847X.2015.1049283"
  },
  {
    theme: "macro-financial",
    year: 2015,
    authors: "Arayssi, M.",
    title: "Transparent rules for deposing central bankers",
    outlet: "International Review of Economics and Finance, 38, 1–17",
    url: "https://doi.org/10.1016/j.iref.2015.01.005"
  },
  {
    theme: "finance-growth",
    year: 2015,
    authors: "Arayssi, M. and Fakih, A.",
    title: "Institutions and development in the MENA region: evidence from the manufacturing sector",
    outlet: "International Journal of Social Economics, 42(8), 717–732",
    url: "https://doi.org/10.1108/IJSE-07-2014-0136"
  },
  {
    theme: "markets-valuation",
    year: 2014,
    authors: "Arayssi, M. and Yassine, N.",
    title: "Short-term financing of economic order quantity inventory model with probabilistic quality",
    outlet: "Journal of Modern Accounting and Auditing, 10(7), 793–802",
    url: ""
  },
  {
    theme: "markets-valuation",
    year: 2014,
    authors: "Arayssi, M.",
    title: "Price drivers and investment strategies in gold",
    outlet: "The Business Review Cambridge, 22(1), 87–92",
    url: "https://econpapers.repec.org/paper/pramprapa/56115.htm"
  },
  {
    theme: "macro-financial",
    year: 2012,
    authors: "Arayssi, M.",
    title: "Nominal income and inflation targeting",
    outlet: "The Business Review Cambridge, 20(2), 143–148",
    url: "https://econpapers.repec.org/paper/pramprapa/62066.htm"
  },
  {
    theme: "markets-valuation",
    year: 2012,
    authors: "Arayssi, M.",
    title: "Investing in gold: what to expect?",
    outlet: "SSRN working paper",
    url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2122399"
  },
  {
    theme: "markets-valuation",
    year: 2008,
    authors: "ElFakhani, S., Arayssi, M. and Smahta, H.",
    title: "Globalization and investment opportunities: a co-integration study of Arab, US and emerging stock markets",
    outlet: "The Financial Review, 43(4), 591–611",
    url: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=1281708"
  },
  {
    theme: "markets-valuation",
    year: 2008,
    authors: "Khoury, S. and Arayssi, M.",
    title: "The value of life: a labor-based theory",
    outlet: "Journal of Business Valuation and Economic Loss Analysis, 3(1)",
    url: "https://ideas.repec.org/a/bpj/jbvela/v3y2008i1n5.html"
  },
  {
    theme: "markets-valuation",
    year: 2006,
    authors: "Arayssi, M., Khoury, S. and Uwayda, R.",
    title: "The value of life: a new labor-theory based model",
    outlet: "Journal of Business Valuation and Economic Loss Analysis, 1(1)",
    url: "https://www.degruyter.com/view/j/jbvela.2006.1.1/jbvela.2006.1.1.1004/jbvela.2006.1.1.1004.xml"
  }
];

/* Work in progress. Delete the entries or the whole list if you would rather
   not show unfinished work. */
const WORKING_PAPERS = [
  {
    authors: "Arayssi, M.",
    title: "Growth volatility spillovers across countries: oil and political conflict in MENA",
    status: "In progress"
  }
];
