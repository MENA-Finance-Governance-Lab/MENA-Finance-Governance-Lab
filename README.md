# MENA Finance &amp; Governance Lab — website

Static HTML site for a small research lab at LAU's Adnan Kassar School of Business.
No build step, no dependencies. Four pages plus a 404.

---

## Putting it on GitHub Pages

1. Create a repository. If you name it `username.github.io` the site lives at
   `https://username.github.io`. Any other name gives you
   `https://username.github.io/repo-name/`.
2. Upload every file in this folder to the root of the repository, keeping the
   `assets/` folder structure intact.
3. Go to **Settings → Pages**. Under *Build and deployment*, set **Source** to
   "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
4. Wait a minute or two, then load the URL Pages shows you.

To use a custom domain later, add it under Settings → Pages and create a file
called `CNAME` in the repository root containing just the domain name.

`.nojekyll` is included so GitHub serves the files as-is rather than running them
through Jekyll.

### Previewing locally

Double-clicking `index.html` works. If you would rather run a server:

```
python3 -m http.server 8000
```

then open `http://localhost:8000`.

---

## How the site is put together

Content is separated from markup. The HTML pages are thin; almost everything
you will want to change lives in three data files.

```
index.html          Home
research.html       Publications, grouped by theme
people.html         PI, team, and how to join
contact.html        Details and enquiry types
404.html

assets/
  css/style.css     All styling. Design tokens are at the top.
  js/components.js  The header and footer, defined once for all pages.
  js/main.js        Turns the data files into HTML.
  data/
    site.js         Lab name, affiliation, contact details, navigation
    research.js     Research themes, publications, working papers
    people.js       PI, team members, the "joining the lab" note
  img/              Photos
```

The header and footer are injected by `components.js`, so you edit the
navigation in **one** place (`assets/data/site.js`) and all pages update.

---

## Common edits

**Change the lab's name or contact details**
`assets/data/site.js`. It is used in the header, the footer and the contact page.

**Add a publication**
Open `assets/data/research.js` and copy an existing block into the
`PUBLICATIONS` list:

```js
{
  theme: "governance-esg",       // must match a THEMES id
  year: 2026,
  authors: "Arayssi, M. and Someone, A.",
  title: "The title of the paper",
  outlet: "Journal Name, 12(3), 45–67",
  url: "https://doi.org/..."     // leave as "" if there isn't one
},
```

The five publications with the newest years appear automatically on the home
page.

Theme ids currently in use: `finance-growth`, `governance-esg`,
`macro-financial`, `markets-valuation`, `nature-dependency`,
`financial-inclusion`.

**Add or change a person**
`assets/data/people.js`. Links with an empty `url` are skipped, so you can leave
placeholders in place until you have them. Put photos in `assets/img/` and point
`photo:` at the file. Without a photo, a neutral placeholder shows instead.

**Add a navigation item**
Add to the `nav` array in `assets/data/site.js`, then create the matching HTML
page (copy `contact.html` as a starting point).

**Change the colours or fonts**
The `:root` block at the top of `assets/css/style.css`. Every colour and
typeface on the site comes from there.

---

## Before you publish — a checklist

- [ ] Decide on the lab's real name and set it in `site.js`. The current name is
      a placeholder built from the research themes.
- [ ] **Settle the name spelling.** The LAU faculty page uses *Araissi*, but every
      publication and the CV use *Arayssi*. The site uses Arayssi with an "also
      publishes as" note, since that is what the papers are indexed under. Change
      it in `people.js` if you would rather go the other way.
- [ ] Replace the postdoc and RA placeholder blocks in `people.js` with real
      names and descriptions.
- [ ] Add a PI portrait at `assets/img/arayssi.jpg`.
- [ ] Fill in the Google Scholar, ORCID, RePEc and SSRN links in `people.js`, or
      delete the ones that don't exist.
- [ ] Check the phone extension and postal address in `site.js`.
- [ ] Verify the DOI links in `research.js`. A few were reconstructed from the
      faculty page and may need checking; two papers have no link at all.
- [ ] Decide whether to keep the "In progress" and "Data and replication"
      sections on the research page. Delete the blocks from `research.html` if
      there is nothing to put in them — an empty section is worse than none.

## Notes

- The hero heatmap is illustrative, not estimated output, and the caption says so.
  Its sector labels, ecosystem-service labels and values live in the
  `natureMatrix` object in `site.js`.
- Reduced-motion preferences are respected; the matrix appears without animating.
- If the publication list ever gets long enough to be a chore, the natural next
  step is moving to Jekyll (which GitHub Pages runs natively) and keeping papers
  in a YAML file. The current setup should hold for a long while.
