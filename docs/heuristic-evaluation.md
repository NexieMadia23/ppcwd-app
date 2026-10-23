# PPCWD Customer App — Heuristic Evaluation & Usability Audit

**Product:** PPCWD Customer App — Clean Water UI Redesign (interactive prototype)
**Scope:** all 17 screens in the prototype and gallery, plus global chrome, navigation, forms, dialogs and feedback
**Method:** heuristic evaluation against Nielsen's ten heuristics, supplemented by the HCI course material on evaluation methods, cognitive psychology, user-centred design, and multimodal/advanced interaction; accessibility checked against WCAG 2.2 AA criteria where the prototype can express them
**Evaluator:** expert review (single evaluator), supported by browser-based inspection at desktop and mobile widths
**Status:** audit pass applied on branch `ago`; open findings listed at the end

---

## 1. How the evaluation was run

1. **Screen inventory.** Enumerated every screen and every state (loading, verifying, empty, error, success, read/unread) from the router and the gallery.
2. **Task walkthroughs.** Performed the core tasks end to end:
   - link an existing account, including an invalid submission;
   - read a bill, open the statement, download it;
   - pay via GCash and reach the confirmation;
   - search billing history and filter by year/status;
   - search the advisory archive and open an advisory;
   - read notifications and mark them all read;
   - open Settings, change text size / contrast, sign out.
3. **Heuristic inspection.** Checked each screen against the ten heuristics, with particular attention to feedback, affordances, error handling, consistency and user control.
4. **Cognitive walkthrough.** For each step of the main tasks, asked: *will the user know what to do, see the result, and recover from a mistake?* This surfaced the false affordances and the missing validation guidance.
5. **Accessibility pass.** Keyboard-only tab order, focus visibility, accessible names, live-region announcements, contrast ratios, target sizes, reduced motion, and form labelling.
6. **Responsive check.** 1440 × 900 and 390 × 844 (the frame scales below 480 px), plus a 359 px narrow check for overflow.

### Severity scale (Nielsen)

| Rating | Meaning |
| --- | --- |
| 4 | Catastrophe — must fix before release |
| 3 | Major — high impact on task completion or accessibility |
| 2 | Minor — causes friction or confusion; fix when possible |
| 1 | Cosmetic — visible but low impact |
| 0 | Not a problem |

No release-blocking (4) issues were found in a prototype of this scope. The most serious findings (3) were false affordances, missing error guidance, destructive action without confirmation, and inaccessible interactive elements.

### What was already fixed before this pass

Commit `f317b1f` addressed the step-list layout, the mobile frame fit, input placeholder copy and account-number wrapping. Those fixes are assumed below; this document covers the audit that followed.

---

## 2. Summary

| | High (3) | Medium (2) | Low (1) | Total |
| --- | --- | --- | --- | --- |
| Fixed in this pass | 11 | 20 | 7 | **38** |
| Open | 0 | 4 | 2 | **6** |

The fixed set is concentrated in four areas:

- **Honest affordances** — controls that looked interactive but did nothing (billing filters, settings switches, archive search) now work.
- **Error prevention and recovery** — field-level validation, confirmation for sign-out, real empty states.
- **Consistency** — one reference number, one posting-time statement, one language, correct partner names, one visual scale for status chips.
- **Accessibility** — focus management, names, announcements, contrast, target sizes, reduced motion.

The open findings are structural: design-token drift, missing persistence, small type, and the fixed-pixel type scale. They are documented rather than silently "fixed", because each requires a product or design-system decision.

---

## 3. Findings and resolutions

### 3.1 Visibility of system status (H1)

| ID | Finding (before) | Evidence | Sev | Status |
| --- | --- | --- | --- | --- |
| F01 | The due-date pill used a hardcoded string, so it claimed a fixed interval regardless of the actual date. | Home shipped `Due in 18 days` as static copy in `app.js`. | 2 | **Fixed** — due date now comes from `DATA.bill.dueISO` against a demo "today" (`2026-10-23`); label switches between *Due today*, *Due tomorrow*, *Due in N days* and *Past due*, and the notification copy uses the same helper. |
| F02 | The notification badge was a bare number that never cleared; the bell had no accessible name. | `state.unread` was not read by the bell; no way to mark notifications read. | 2 | **Fixed** — badge is driven by `state.unread`, the bell announces "Notifications, N unread", and a labelled **Mark all read** action clears both badge and unread styling. (The first version used an icon-only check mark, which sighted users cannot interpret; it is now a text action.) |
| F03 | The payment confirmation showed a tick and a sentence but no transaction facts, so the user could not verify what had been reported. | Success screen had no reference, period, or status. | 3 | **Fixed** — shows amount, billing period, GCash reference (`GC-…`), an *Awaiting verification* status chip, and guidance to keep the reference until it appears in history. |

### 3.2 Match between system and the real world (H2)

| ID | Finding (before) | Evidence | Sev | Status |
| --- | --- | --- | --- | --- |
| F04 | Partner brand names were misspelled, which undermines trust in a payments screen. | "MLhuillier" and "SM Bills Pay" in the partner list. | 1 | **Fixed** — "M Lhuillier" and "SM Bills Payment" in the title, the steps and the receipt wording. |
| F05 | Posting times contradicted each other across screens. | One place said GCash posts "within minutes", another implied 24 hours; the footer and FAQ disagreed. | 2 | **Fixed** — one statement everywhere: GCash within minutes, partner payments within 24 hours; the FAQ and footer were aligned. |
| F06 | The usage screen's previous-reading total did not match the current reading. | "Previous: 4,203" against a 4,204 reading. | 1 | **Fixed** — 4,204 cu.m. |

### 3.3 User control and freedom (H3)

| ID | Finding (before) | Evidence | Sev | Status |
| --- | --- | --- | --- | --- |
| F07 | **Sign out executed immediately**, with no confirmation and no way back. | The row called `render("welcome")` directly. | 3 | **Fixed** — confirmation dialog: *Sign out of PPCWD?* with Cancel focused by default, Escape to cancel, and a destructive-styled confirm. |
| F08 | The linked-accounts sheet moved focus to the close button, but Escape closed it without returning focus, and Tab could leave the sheet. | No focus restore; no focus trap. | 2 | **Fixed** — focus enters the sheet, Tab is trapped inside it, Escape closes it, focus returns to the trigger, and the closed sheet is `inert`. |
| F09 | **Collapsed accordion panels were still keyboard-focusable and readable by assistive technology.** | Panels were collapsed with `max-height: 0` only, so links inside stayed in the tab order. | 3 | **Fixed** — `aria-expanded` on the header, `inert` on closed panels, and the attribute is re-applied after every render. |

### 3.4 Consistency and standards (H4)

| ID | Finding (before) | Evidence | Sev | Status |
| --- | --- | --- | --- | --- |
| F10 | **Billing-history search and the year/status chips were false affordances** — typing and tapping changed nothing. A "Pick date" chip was also dead. | `#bill-search` had no handler; chips had no state; the chip had no action. | 3 | **Fixed** — live filtering by month and reference, combined with year/status filters, a truthful record count ("Showing 1 of 24"), a real empty state, and *Clear filters*. The dead chip was removed. |
| F11 | The advisory archive contained a hardcoded phantom row that opened an unrelated advisory. | A fifth row "Scheduled maintenance…" opened `a6`. | 2 | **Fixed** — replaced with a real advisory ("Water quality report: 3rd quarter results", `a7`), and the archive is generated from data. |
| F12 | The five-step GCash guide appeared twice — once as a promo card, once as the guide — doubling the reading load. | Payments repeated the guide before its own screen. | 2 | **Fixed** — Payments now has a compact "What you'll need" summary (account number, name, amount) and the guide lives on its own screen. |
| F13 | Reference numbers were truncated on one screen and different on another. | Statement clipped the reference; the bill card used a short form. | 2 | **Fixed** — one source of truth, `PPCWD-2026-10-7890`, shown in full. |
| F14 | **Settings switches were visual only.** Flipping them changed the colour and nothing else, and they had no switch semantics. | `data-switch` only toggled a class. | 3 | **Fixed** — `role="switch"` with `aria-checked`, state-driven rendering, and the two accessibility switches now actually work: *Larger text* scales body copy, *High contrast* strengthens muted text and borders. |
| F15 | In Settings and Notifications, the row title and its description rendered on the same line, overlapping visually. | The row body was a flex item whose children were inline `span`s, so `margin-top` had no effect. | 2 | **Fixed** — row bodies are flex columns; children are block-level. |
| F16 | After interacting with the account sheet, the balance card's contents shifted left and were clipped at the frame edge. | Decorative pseudo-elements overflowed the card's `overflow: hidden` box, making it a scroll container that focus scrolled; the same risk existed on the phone shell. | 2 | **Fixed** — `overflow: clip` on the balance card and phone shell, so they clip without becoming scrollable. |
| F31 | The flow mixed languages: the confirmation was in Tagalog while the rest of the app is English. | Success copy "Naitala ang bayad…" against English UI. | 2 | **Fixed** — success screen rewritten in English with the same tone as the rest of the flow. |
| F32 | The current statement was labelled "Unpaid" while history called the same state "Due". | Chip copy differed for the same condition. | 1 | **Fixed** — both use **Due**. |
| F33 | The page chrome hardcoded "All 17 screens" and "17 high-fidelity screens". | Counts in `index.html` and gallery copy. | 1 | **Fixed** — the counts are derived from the screen list at runtime, so the chrome cannot drift from the inventory. |
| F35 | The Statement of Account offered **two download controls** for the same document — an unlabelled icon in the title bar and a labelled button beside Share — leaving the user to guess whether they differ. | `bill-detail` rendered a title-bar download icon and a second *Download* button in the action row, both firing the same toast. | 2 | **Fixed** — the title-bar icon is gone; one labelled **Download PDF** action remains beside Share, matching the wording on the Current Bill screen. |
| F36 | The balance card carried a **"1 account" pill** — a count that reads as status but acts as a link, competing with the balance and duplicating account access that already exists. | The pill sat in the balance hero while the dashboard also had an *Accounts* tile and the Account tab a full accounts section. | 1 | **Fixed** — the pill and its styles were removed. The account number stays on the card to identify whose balance it is; switching and linking live in *Accounts* (dashboard tile) and the Account tab. |
| F37 | **Two advisory categories were hidden**: the filter row was a horizontal scroller with no cue, so at phone width *Maintenance* was clipped mid-word and *Announcement* was off-screen entirely. | Measured at 392 px: four chips needed ~440 px but only 332 px were available. | 2 | **Fixed** — the row is now an intentional one-line rail: it runs to the screen edges, fades the last 34 px so the next chip is visibly more content, and snaps each chip to the start. Every category is reachable by swipe, and the billing-history filters use the same rail. |
| F38 | The Advisories screen had **two archive controls** — an icon in the title bar and an *Archive ›* link — both opening the same place. | Both carried `data-nav="advisory-archive"`. | 1 | **Fixed** — the title-bar icon is gone. The labelled *Archive ›* link remains in the *Recent advisories* header; when a filter has no further current items, the archive is offered as a *Browse past advisories* button, so there is always exactly one route. |

### 3.5 Error prevention (H5)

| ID | Finding (before) | Evidence | Sev | Status |
| --- | --- | --- | --- | --- |
| F17 | **Validation was weak and unhelpful**: one generic banner at the bottom, no indication of which field failed, and a two-digit account number was accepted. | `onbValidate` returned a single string; a 2-digit value passed the length check. | 3 | **Fixed** — per-field rules with specific messages that quote the input ("…you entered 2"), inline error under the field, `aria-invalid` / `aria-describedby`, and focus moved to the first invalid field. The account field now requires at least 6 digits and the meter at least 3 characters. |
| F34 | Pressing Enter in an onboarding field submitted the form natively, reloading the page and losing everything typed. | Only the button's click was intercepted; the form had no `submit` handler. | 2 | **Fixed** — a submit handler runs the same validation, so Enter behaves like the button and never reloads. |

F07 (confirmation before sign-out) also belongs to this heuristic: it is the guard that prevents an accidental destructive action.

### 3.6 Recognition rather than recall (H6)

| ID | Finding (before) | Evidence | Sev | Status |
| --- | --- | --- | --- | --- |
| F18 | Account, meter, address and mobile fields gave no format guidance, so users had to recall what was printed on the bill. | Only placeholders; no persistent hints. | 2 | **Fixed** — hints under each field ("Digits and dashes, as printed at the top of your bill", "e.g. MTR-0098213", …), kept visible after an error and linked with `aria-describedby`. |

F12 also serves recognition: one payment summary replaces two copies of the same five-step guide.

### 3.7 Flexibility and efficiency of use (H7)

| ID | Finding (before) | Evidence | Sev | Status |
| --- | --- | --- | --- | --- |
| F19 | No live filtering, no bulk action, no quick reset; every refinement was a full round trip that did not actually work. | Search inputs were inert; notifications required reading each item. | 2 | **Fixed** — search filters as you type (caret and scroll preserved), *Clear filters* resets both query and chips, *Mark all read* clears the badge. |

### 3.8 Error recovery (H9)

| ID | Finding (before) | Evidence | Sev | Status |
| --- | --- | --- | --- | --- |
| F20 | Searches that returned nothing showed a blank list with no explanation or next step. | No empty state in billing history or the archive. | 2 | **Fixed** — "No bills match this filter." / "No advisories match your search." with a *Clear filters* action. |

### 3.9 Accessibility (WCAG 2.2 AA criteria)

| ID | Finding (before) | Evidence | Sev | Status |
| --- | --- | --- | --- | --- |
| F21 | Tertiary text failed contrast: `--muted-2` `#8B94A3` on white is **3.06:1**. | Used for hints, placeholders, timestamps, icons. | 3 | **Fixed** — `#66707F` = **5.0:1** on white; contrast is also strengthened by the High contrast switch. |
| F22 | Most controls had no visible keyboard focus indicator. | Only the tab bar and account controls had `:focus-visible`. | 3 | **Fixed** — one consistent 2 px ring for buttons, links, rows, chips, inputs, switches and headings, with a yellow ring on dark surfaces. |
| F23 | Icon-only buttons had no accessible name. | Back, bell, share, edit, link-account, close. | 3 | **Fixed** — `aria-label` on each, plus a live unread count on the bell. |
| F24 | Screen changes in the single-page prototype were silent to screen readers. | No live region; focus stayed on the clicked tab. | 3 | **Fixed** — a persistent `role="status"` live region announces the new screen and focus moves to its heading. |
| F25 | Toast confirmations were visual only. | `showToast` inserted no live region. | 2 | **Fixed** — messages go through the persistent live region; the visual toast is `aria-hidden` so it is not announced twice. |
| F26 | The featured advisory and archive rows were clickable `div`s — mouse-only. | No role, no tabindex, no key handling on the featured card. | 3 | **Fixed** — converted to real `<button>` elements with the title/excerpt as spans; Enter/Space work and the focus ring is visible. |
| F27 | Several targets were below 44 × 44 px: "View all" 70 × 17, "Details" 65 × 17, switch 52 × 32. | Measured in the browser. | 2 | **Fixed** — invisible hit areas extend the *View all / Details / Archive* links; the switch gains 8 px of padded hit area; filter chips are at least 34 px tall. |
| F28 | Onboarding inputs were not programmatically associated with their labels. | Implicit wrapping only; the browser reported unnamed fields. | 2 | **Fixed** — `for`/`id` plus `aria-labelledby`, and hints/errors joined with `aria-describedby`. |
| F29 | Motion ignored the user's reduced-motion preference. | Sheet, dialog, toast and spinner animate unconditionally. | 2 | **Fixed** — `prefers-reduced-motion` removes the transitions and the spinner animation. |
| F30 | The Tagalog greeting was not marked as such while the page is `lang="en"`. | "Magandang araw," unstyled for language. | 1 | **Fixed** — `lang="tl"` on the greeting. |

---

## 4. Open findings

These are real problems that were not fixed in this pass. They are documented so they are not mistaken for finished work.

| ID | Finding | Why it is open | Sev |
| --- | --- | --- | --- |
| O01 | **No design-token discipline.** `styles.css` contains 302 hex literals (98 distinct colours), 23 distinct font sizes and 20 distinct radii; `--shadow-card` is declared but unused. | Fixing it means a design-system refactor across the whole stylesheet and a visual regression pass. The audit added no new palette values, which keeps the drift from growing. | 2 |
| O02 | **Preferences are not persisted.** The Settings footer says "Preferences are saved automatically", but toggles live in memory and reset on reload. | Needs a storage layer (localStorage) and a decision on defaults — appropriate for the next iteration, not a quick patch. | 2 |
| O03 | **Type below 12 px.** Legal/footer copy and some micro-labels are 9.5–10.5 px. | The compact phone frame drives this; increasing them affects the whole layout. *Larger text* is the interim mitigation. | 2 |
| O04 | **Fixed-pixel type scale / fixed frame height.** Browser and OS text-size settings are ignored; the 848 px frame requires page scrolling on short viewports. | A full `rem` conversion plus a fluid frame is a redesign task. The frame was deliberately kept at its design size to preserve the presentation. | 2 |
| O05 | **Dead code paths.** `out.blueStatus` is never set, so the dark status-bar branch is unreachable; `--shadow-card` is unused. | Cosmetic/maintenance only. | 1 |
| O06 | **Single evaluator, no screen-reader run.** Findings are expert judgement, not a conformance audit or a usability test with real customers. | The next step is a moderated test (5–8 users) and an NVDA/VoiceOver pass on the real build. | — |

### Product-level recommendations

1. **Run task-based usability tests** on the two riskiest flows: linking an account and paying a bill. Measure time on task, error rate and confidence.
2. **Instrument the prototype** with a simple event log (search used, filter cleared, validation error, switch changed) before the next review, so the team sees which features earn their space.
3. **Collapse the visual system** into tokens (colour, type, spacing, radius, elevation) and document it beside the screens.
4. **Add persistence and real empty/loading/error states** when the prototype becomes an app; the current states are illustrative.

---

## 5. How the course material informed the audit

| Source | Applied to |
| --- | --- |
| *HCI Evaluation Methods* | Heuristic evaluation procedure, severity ratings, cognitive walkthrough of the main tasks. |
| *Introduction to HCI* | Affordances and feedback (false affordances), consistency, error prevention, user control. |
| *Cognitive Psychology in HCI* | Recognition over recall (field hints, summary card), chunking (payment steps), working memory (one screen, one job), and the cost of duplicated instructions. |
| *Exploration of User-Centered Design Methodologies* | Task focus (link, read, pay, search), iterative fixes, and matching the interface to the customer's language and context. |
| *Designing and Evaluating Multimodal and Advanced Interaction Systems* | Feedback across channels (visual + live region), modality-appropriate messaging (toast vs inline error), and accessible interaction for keyboard and assistive technology. |
| *Emerging Technologies* | Adaptive preferences (larger text, high contrast), responsive framing, and a path toward voice/offline support without breaking the current flow. |

---

## 6. Verification log

Checked in Chrome through the local static server (`python -m http.server 4173`), with cache-busting query strings to avoid stale assets.

| Check | Result |
| --- | --- |
| Onboarding, empty submit | Inline error under Account number; focus on the invalid field; no generic banner. |
| Onboarding, 2-digit account | Rejected with "…you entered 2"; valid account proceeds. |
| Onboarding, Enter key | Runs the same validation; the page does not reload and nothing typed is lost. |
| Onboarding, valid submit | Verify → success → dashboard, with the computed due label. |
| Billing history search ("sept") | 1 result, count updated, caret preserved. |
| Billing history filter (2025) | Empty state with *Clear filters*; clearing restores the list and the count. |
| Advisory archive search ("water") | One real result; no phantom row; opening it shows matching content. |
| Advisory filters | One scrolling row; the edge fades to signal more, and swiping reaches *Announcement*; each filter updates the list. |
| Advisory filter with no further items | *Maintenance* shows its advisory and a *Browse past advisories* button. |
| Archive routes | Only one archive control is present; it opens the three archived advisories. |
| Mark all read | Badge disappears from Home; bell label drops the count. |
| Settings — High contrast | Computed muted text changes from `#5B6473` to `#2F3A4A`; setting persists while navigating. |
| Settings — Larger text | Body/toggle text scales; persists while navigating. |
| Sign out | Dialog opens with Cancel focused; Cancel returns focus; confirm returns to Welcome. |
| Account sheet | Opens with focus inside, Tab stays inside, Escape/close returns focus to the trigger. |
| Keyboard paths | Tab order follows the visual order; no collapsed accordion content receives focus. |
| 1440 × 900 | No horizontal overflow; card contents stay inside the frame after sheet interactions. |
| 390 × 844 | Frame fits the viewport; no horizontal overflow; dialog and form errors stay within the frame. |

### Files changed

- `app.js` — data/helpers, state, screen templates, delegated events, validation, focus management, dialogs, live announcements.
- `styles.css` — accessibility layer (focus rings, hit areas, inline errors, empty states, dialog, reduced motion), high-contrast/larger-text modes, contrast token, layout fixes.
- `index.html` — persistent live region, view-toggle semantics.
- `docs/heuristic-evaluation.md` — this document.
