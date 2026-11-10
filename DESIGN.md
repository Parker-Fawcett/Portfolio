# Design notes

Goal: a content-first personal site that reads as one person's body of work, with one question at the center (does AI-written software work?) and every page reachable from the top navigation.

## Structure

Home, Research, Writing, Projects, Speaking, About, plus a Press kit linked from the footer. Every page is real HTML with its own title, description, canonical URL and structured data.

## Visual rules

- Newsreader for headings and article text, IBM Plex Sans for interface text. No other families.
- One accent color. Light and dark themes follow the system setting.
- Solid surfaces, 1px rules, radii of 8px or less. No gradients, glows or blur.
- Reading width is 40rem for articles and prose.
- Motion is limited to hover states.

## Content rules

- A status chip marks every paper and project. Submitted work is never written as accepted.
- A number appears next to its source and date.
- Keep personal details to what a reader needs: no phone number, school name, GPA or age-related legal terms.
