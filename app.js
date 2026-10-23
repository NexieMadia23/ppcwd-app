/* ============================================================
   PPCWD Mobile App — Prototype engine
   Vanilla JS screen router + all screen templates
   ============================================================ */

/* ---------------- Icons (inline SVG, stroke style) ---------------- */
const I = (p, extra = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" ${extra}>${p}</svg>`;
const ICONS = {
  home: I('<path d="M4 10.8 12 4l8 6.8"/><path d="M6 9.6V18a2.5 2.5 0 0 0 2.5 2.5h7A2.5 2.5 0 0 0 18 18V9.6"/><path d="M9.8 20.5v-5.2a1.6 1.6 0 0 1 1.6-1.6h1.2a1.6 1.6 0 0 1 1.6 1.6v5.2"/>'),
  bill: I('<rect x="5" y="3" width="14" height="18" rx="2.5"/><path d="M8.5 7.5h7M8.5 11h7"/><path d="M8.5 15h3.5"/>'),
  pay: I('<rect x="2.5" y="5" width="19" height="14" rx="3"/><path d="M2.5 9.5h19"/><rect x="6" y="13.2" width="5" height="3.2" rx="1" fill="currentColor" stroke="none"/>'),
  mega: I('<path d="M3 11v2a1 1 0 0 0 1 1h3l7 4.5V6.5L7 11H4a1 1 0 0 0-1 0Z"/><path d="M18 9.5a3.5 3.5 0 0 1 0 5"/><path d="M20.5 7a7 7 0 0 1 0 10"/>'),
  advisory: I('<path d="M10.3 4.4a2 2 0 0 1 3.4 0l7.2 12.4a2 2 0 0 1-1.7 3H4.8a2 2 0 0 1-1.7-3Z"/><path d="M12 9.5v4M12 17v.2"/>'),
  user: I('<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>'),
  bell: I('<path d="M6.2 9.4a5.8 5.8 0 0 1 11.6 0c0 4.2 1.3 5.6 1.3 5.6.4.5 0 1.3-.7 1.3H5.6c-.7 0-1.1-.8-.7-1.3 0 0 1.3-1.4 1.3-5.6Z"/><path d="M10 18.9a2 2 0 0 0 4 0"/>'),
  chevR: I('<path d="m9 5 7 7-7 7"/>'),
  chevD: I('<path d="m5 9 7 7 7-7"/>'),
  chevL: I('<path d="m15 5-7 7 7 7"/>'),
  search: I('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>'),
  download: I('<path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M4 20h16"/>'),
  calendar: I('<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
  phone: I('<path d="M5 3.5h3.5L10.5 8 8 10a12 12 0 0 0 6 6l2-2.5 4.5 2V19a2 2 0 0 1-2 2A16.5 16.5 0 0 1 3 5.5a2 2 0 0 1 2-2Z"/>'),
  mail: I('<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>'),
  clock: I('<circle cx="12" cy="12" r="9"/><path d="M12 7v5.5l3.5 2"/>'),
  drop: I('<path d="M12 3s6.5 7 6.5 11a6.5 6.5 0 0 1-13 0C5.5 10 12 3 12 3Z"/><path d="M8.9 14.2a3 3 0 0 0 2.7 3.1"/>'),
  check: I('<path d="m4.5 12.5 5 5 10-11"/>'),
  checkC: I('<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.6 2.6L16 9.5"/>'),
  info: I('<circle cx="12" cy="12" r="9"/><path d="M12 11v5.5M12 7.6v.2"/>'),
  alert: I('<path d="M12 3.5 21.5 20h-19Z"/><path d="M12 10v4M12 17v.2"/>'),
  shield: I('<path d="M12 3 5 6v5.5c0 4.6 3 7.9 7 9.5 4-1.6 7-4.9 7-9.5V6Z"/><path d="m9 12 2 2 4-4.5"/>'),
  gear: I('<circle cx="12" cy="12" r="3.2"/><path d="M19.4 13.5a7.6 7.6 0 0 0 0-3l1.8-1.3-2-3.4-2.1.9a7.6 7.6 0 0 0-2.6-1.5L14.2 3H9.8l-.3 2.2a7.6 7.6 0 0 0-2.6 1.5l-2.1-.9-2 3.4 1.8 1.3a7.6 7.6 0 0 0 0 3l-1.8 1.3 2 3.4 2.1-.9a7.6 7.6 0 0 0 2.6 1.5l.3 2.2h4.4l.3-2.2a7.6 7.6 0 0 0 2.6-1.5l2.1.9 2-3.4Z"/>'),
  help: I('<circle cx="12" cy="12" r="9"/><path d="M9.5 9.2A2.6 2.6 0 0 1 14.5 10c0 1.8-2.5 2-2.5 3.6M12 17v.2"/>'),
  logout: I('<path d="M14 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4"/><path d="M10 12h10M13.5 8.5 10 12l3.5 3.5"/>'),
  link: I('<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7L11.5 6.8"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1.5-1.5"/>'),
  edit: I('<path d="M15.5 4.5 19.5 8.5 8 20H4v-4Z"/><path d="m13.5 6.5 4 4"/>'),
  doc: I('<path d="M7 3h7l5 5v13H7Z"/><path d="M13.5 3v5.5H19"/><path d="M10 13h5M10 16.5h5"/>'),
  archive: I('<rect x="3" y="4" width="18" height="4.5" rx="1.2"/><path d="M5 8.5V20h14V8.5"/><path d="M10 12.5h4"/>'),
  send: I('<path d="m21 3-10 18-2.5-7.5L3 11Z"/><path d="m21 3-12.5 10.5"/>'),
  trend: I('<path d="M4 17.5 9.5 12l3.5 3.5L20 8"/><path d="M15 8h5v5"/>'),
  spark: I('<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.8 5.8l2.1 2.1M16.1 16.1l2.1 2.1M18.2 5.8l-2.1 2.1M7.9 16.1l-2.1 2.1"/>'),
  share: I('<circle cx="6" cy="12" r="2.6"/><circle cx="17.5" cy="6" r="2.6"/><circle cx="17.5" cy="18" r="2.6"/><path d="m8.4 10.8 6.8-3.5M8.4 13.2l6.8 3.5"/>'),
  copy: I('<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>'),
  plus: I('<path d="M12 5v14M5 12h14"/>'),
  receipt: I('<path d="M6 3h12v18l-3-1.6-3 1.6-3-1.6L6 21Z"/><path d="M9.5 8.5h5M9.5 12.5h5"/>'),
  wallet: I('<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H18v3"/><rect x="3" y="7.5" width="18" height="12" rx="2.5"/><circle cx="16.5" cy="13.5" r="1.2" fill="currentColor" stroke="none"/>'),
  wifi: I('<path d="M2 8.8a15 15 0 0 1 20 0"/><path d="M5.5 12.5a10 10 0 0 1 13 0"/><path d="M9 16.2a5 5 0 0 1 6 0"/><path d="M12 20v.2"/>'),
  battery: I('<rect x="2" y="7" width="18" height="10" rx="2.6"/><rect x="4" y="9" width="13" height="6" rx="1.2" fill="currentColor" stroke="none"/><path d="M22 10.5v3"/>'),
  signal: I('<path d="M3 18v-2.5M8.5 18v-6M14 18v-9M19.5 18V6" stroke-width="2.4"/>'),
  globe: I('<circle cx="12" cy="12" r="9"/><path d="M3.5 9h17M3.5 15h17"/><path d="M12 3a14 14 0 0 1 0 18 14 14 0 0 1 0-18Z"/>'),
  text: I('<path d="M4 7V5h16v2"/><path d="M12 5v14M9 19h6"/>'),
  moon: I('<path d="M20 14.5A8.5 8.5 0 0 1 9.5 4 8.5 8.5 0 1 0 20 14.5Z"/>'),
  menu: I('<path d="M4 7h16M4 12h16M4 17h16"/>'),
  close: I('<path d="m6 6 12 12M18 6 6 18"/>'),
};

/* ---------------- Official partner logos ----------------
   Files live in assets/logos/. Partner marks are cropped, transparent
   512×512 PNGs; GCash is a square blue badge with a white mark.
   `logo()` emits the <img> plus the coloured .l-* tile as a sibling
   that is hidden, so if the image fails to load the onerror just
   swaps visibility — no HTML is injected into the attribute (which
   previously broke the markup with an unescaped quote). */
const LOGO = {
  ppcwd: "assets/logos/ppcwd.webp",
  gcash: "assets/logos/gcash-mark.png",
  palawan: "assets/logos/palawan-logocrop.png",
  ecpay: "assets/logos/ecpay-logocrop.png",
  sm: "assets/logos/sm-logocrop.png",
  ml: "assets/logos/ml-logocrop.png",
  ussc: "assets/logos/ussc-logocrop.png",
};
const logo = (key, alt = "", onDark = false, style = "", fallback = "") => {
  const src = LOGO[key];
  if (!src) return fallback;
  /* GCash is a square blue badge (white mark on brand blue) that fills
     the circle; partner marks are transparent PNGs that sit inside it. */
  const badge = key === "gcash" ? " badge" : "";
  const cls = `acc-logo acc-logo-img${badge}${onDark ? " on-dark" : ""}`;
  const sty = style ? ` style="${style}"` : "";
  /* Wrap keeps the <img> and its fallback tile in the same slot. */
  return `<span class="logo-slot"${sty}>` +
    `<span class="${cls}">` +
    `<img src="${src}" alt="${esc(alt)}" loading="lazy" onerror="this.parentElement.style.display='none';this.parentElement.nextElementSibling.style.display='grid'">` +
    `</span>` +
    `<span class="logo-fb" aria-hidden="true">${fallback}</span>` +
    `</span>`;
};

/* ---------------- Data ---------------- */
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const DATA = {
  /* The prototype is pinned to a fixed "today" so relative copy
     (days until due, reminders) stays truthful over time. */
  today: "2026-10-23",
  paymentRef: "GC-7741-1023-8890",
  customer: { name: "Maria Santos", first: "Maria", initials: "MS", acct: "0012-3456-7890", meter: "MTR-0098213", address: "Brgy. Sta. Lucia, Puerto Princesa City", type: "Residential" },
  bill: {
    amount: "1,247.50", due: "November 10, 2026", dueShort: "Nov 10, 2026", dueISO: "2026-11-10",
    period: "October 2026", prev: "51 – 100 cu.m", usage: "10 cu.m",
    ref: "PPCWD-2026-10-7890",
    lines: [
      ["Water consumption (10 cu.m)", "980.00"],
      ["Monthly service charge", "150.00"],
      ["Environmental charge", "67.50"],
      ["Arrears from previous bill", "0.00"],
    ],
    total: "1,247.50",
  },
  history: [
    { period: "October 2026", amt: "1,247.50", status: "Due", chip: "chip-orange", date: "Due Nov 10" },
    { period: "September 2026", amt: "1,112.00", status: "Paid", chip: "chip-green", date: "Paid Oct 8" },
    { period: "August 2026", amt: "1,389.75", status: "Paid", chip: "chip-green", date: "Paid Sep 9" },
    { period: "July 2026", amt: "1,205.25", status: "Paid", chip: "chip-green", date: "Paid Aug 7" },
    { period: "June 2026", amt: "1,044.00", status: "Paid", chip: "chip-green", date: "Paid Jul 10" },
    { period: "May 2026", amt: "998.50", status: "Paid", chip: "chip-green", date: "Paid Jun 9" },
  ],
  usage: [
    { m: "May", v: 12, date: "May 6, 2026",  reading: "04,151", bill: "998.50",   septage: "0.00", penalty: "0.00" },
    { m: "Jun", v: 14, date: "Jun 8, 2026",  reading: "04,165", bill: "1,044.00", septage: "0.00", penalty: "0.00" },
    { m: "Jul", v: 11, date: "Jul 7, 2026",  reading: "04,176", bill: "1,205.25", septage: "0.00", penalty: "0.00" },
    { m: "Aug", v: 15, date: "Aug 6, 2026",  reading: "04,191", bill: "1,389.75", septage: "0.00", penalty: "12.50" },
    { m: "Sep", v: 13, date: "Sep 9, 2026",  reading: "04,204", bill: "1,112.00", septage: "0.00", penalty: "0.00" },
    { m: "Oct", v: 10, date: "Oct 15, 2026", reading: "04,213", bill: "1,247.50", septage: "0.00", penalty: "0.00" },
  ],
  advisories: [
    {
      id: "a1", cat: "Interruption", color: "orange", featured: true,
      title: "Water interruption in Brgy. Sta. Lucia and nearby areas",
      date: "October 21, 2026",
      excerpt: "Pressure will be low from 9:00 AM to 3:00 PM on Oct 22 while our team repairs a leaked 6-inch main line.",
      areas: ["Sta. Lucia", "San Pedro", "Bagong Silang"],
      body: "The Puerto Princesa City Water District will conduct emergency repair works on a leaking 6-inch primary main line along Rizal Avenue Extension. Water service in the affected areas will be interrupted or experience low pressure from 9:00 AM to 3:00 PM on October 22, 2026.\n\nWe advise affected customers to store enough water for the day. Service may normalize earlier once repairs are completed. We apologize for the inconvenience.",
    },
    {
      id: "a2", cat: "Maintenance", color: "aqua",
      title: "Scheduled system maintenance: Puerto Princesa North treatment plant",
      date: "October 18, 2026",
      excerpt: "Minor service adjustments on Oct 25, 12 midnight to 5:00 AM.",
      areas: ["Poblacion", "Mandaragat"],
      body: "PPCWD will conduct preventive maintenance on chlorination equipment at the north treatment plant. Customers in Poblacion and Mandaragat may notice slight changes in water color or pressure between 12:00 MN and 5:00 AM on October 25, 2026. Running the tap for a few minutes after service resumes will clear any discoloration.",
    },
    {
      id: "a3", cat: "Announcement", color: "sky",
      title: "New: Pay your water bill easily with GCash",
      date: "October 12, 2026",
      excerpt: "No lines, no extra fees. Pay in the app in under a minute.",
      areas: [],
      body: "You can now pay your PPCWD water bill using GCash. Open the Payments tab, tap Pay with GCash, and follow the 4-step guide. Your payment is posted to your account within minutes and you will receive a digital receipt.",
    },
    {
      id: "a4", cat: "Interruption", color: "orange",
      title: "Water interruption: Brgy. Bancao-Bancao due to typhoon damage",
      date: "October 5, 2026",
      excerpt: "Service restored in phases as damaged lines are cleared.",
      areas: ["Bancao-Bancao"],
      body: "Following typhoon-related damage to an elevated pipeline, water service in Bancao-Bancao is being restored in phases. Our crew is clearing debris and replacing broken sections. Estimated full restoration is within 48 hours from the last advisory update.",
    },
    {
      id: "a5", cat: "Announcement", color: "sky",
      title: "Office schedule this undas holiday",
      date: "October 28, 2025", archive: true,
      excerpt: "Business hours and on-call contacts for the All Souls' break.",
      areas: [],
      body: "Our business office will be closed from October 31 to November 2. For urgent concerns such as service interruptions and line breaks, please call our 24/7 hotlines. Payments made over the holiday will be posted on the next business day.",
    },
    {
      id: "a6", cat: "Maintenance", color: "aqua",
      title: "Preventive flushing of lines in Sicsican",
      date: "September 14, 2025", archive: true,
      excerpt: "Maintenance flushing completed in three phases.",
      areas: ["Sicsican"],
      body: "Sediment flushing of distribution lines in Sicsican was conducted in three phases to maintain water clarity and quality. Customers experienced brief discoloration during flushing hours only.",
    },
    {
      id: "a7", cat: "Announcement", color: "sky",
      title: "Water quality report: 3rd quarter results",
      date: "August 30, 2025", archive: true,
      excerpt: "All tested samples met the Philippine National Standards for Drinking Water.",
      areas: [],
      body: "PPCWD's 3rd quarter water quality monitoring covers 42 sampling points across the service area. All physico-chemical and bacteriological tests passed the Philippine National Standards for Drinking Water (PNSDW).\n\nThe full laboratory report is available at the PPCWD Customer Service Office during business hours.",
    },
  ],
};

/* Relative due-date copy comes from one place so every screen agrees. */
const DAY_MS = 86400000;
function daysUntilDue() {
  const due = Date.parse(`${DATA.bill.dueISO}T00:00:00`);
  const today = Date.parse(`${DATA.today}T00:00:00`);
  return Math.round((due - today) / DAY_MS);
}
function dueLabel() {
  const d = daysUntilDue();
  if (d < 0) return `Overdue by ${Math.abs(d)} day${Math.abs(d) === 1 ? "" : "s"}`;
  if (d === 0) return "Due today";
  return `Due in ${d} day${d === 1 ? "" : "s"}`;
}

const HELP_FAQ = [
  { q: "How is my water bill computed?", a: "Your bill combines your water consumption (in cubic meters, based on your meter reading), a monthly service charge, and an environmental charge. Rates per cubic meter follow the tiered domestic rate schedule approved by the Local Water Utilities Administration (LWUA)." },
  { q: "When is my bill due?", a: "Bills are issued monthly and are due on the 10th of the following month. Paying on or before the due date avoids late payment surcharges." },
  { q: "I paid but my balance is still showing. What do I do?", a: "GCash payments post within minutes, while over-the-counter partner payments may take up to 24 hours to reflect. If 24 hours have passed, send your reference number to our email or call our hotline so we can trace your payment." },
  { q: "My water pressure is low. What should I check?", a: "Check the Advisories tab first for scheduled interruptions in your area. If there is no advisory, verify that your own faucet and service valve are open, then report the concern through our hotline." },
  { q: "How do I update my contact details?", a: "Go to Account, tap Personal Information, then Update Details. Keeping your mobile number current ensures you receive billing and advisory alerts." },
];

/* ---------------- State ---------------- */
const state = {
  screen: "welcome",
  stack: [],
  billsTab: "current",
  advFilter: "All",
  historyFilter: "All",
  historyQuery: "",
  advQuery: "",
  unread: 2,
  /* Onboarding */
  linked: false,
  onbMode: "link",
  onbStep: "form",
  onbError: "",
  onbErrField: "",
  onbValues: {},
  onbToken: 0,
  setupContext: "onboarding",
  /* Settings — reflected in the UI so the screen tells the truth */
  switches: { due: true, bill: true, adv: true, pay: true, contrast: false, bigtext: false },
};

const TAB_SCREENS = ["home", "bills", "payments", "advisories", "account"];
const ONB_SCREENS = ["welcome", "setup"];

/* Linked water service accounts */
state.accounts = [
  {
    acct: DATA.customer.acct,
    label: "Home",
    address: DATA.customer.address,
    type: DATA.customer.type,
    primary: true,
  },
];
state.activeAcct = DATA.customer.acct;

const activeAccount = () => state.accounts.find((a) => a.acct === state.activeAcct) || state.accounts[0] || DATA.customer;

/* ---------------- Shared partials ---------------- */
const statusBar = (onBlue = false) => `
  <div class="statusbar ${onBlue ? "on-blue" : ""}">
    <span>9:41</span>
    <span class="sb-icons">${ICONS.signal}${ICONS.wifi}${ICONS.battery}</span>
  </div>`;

const tabbar = (active) => {
  const tabs = [
    ["home", "Home", ICONS.home],
    ["bills", "Bills", ICONS.bill],
    ["payments", "Payments", ICONS.pay],
    ["advisories", "Advisories", ICONS.advisory],
    ["account", "Account", ICONS.user],
  ];
  const idx = Math.max(0, tabs.findIndex(([id]) => id === active));

  /* White shell geometry — 348 × 68, with a true concave notch cut
     from the top edge for the raised active puck. */
  const W = 348, H = 68, R = 20, NR = 35, PAD = 30, STEP = (W - PAD * 2) / tabs.length;
  const cx = PAD + (idx + 0.5) * STEP;
  const notchL = +(cx - NR).toFixed(2);
  const notchR = +(cx + NR).toFixed(2);
  const shellPath = [
    `M${R} 0`,
    `H${notchL}`,
    `A${NR} ${NR} 0 0 0 ${notchR} 0`,
    `H${W - R}`,
    `A${R} ${R} 0 0 1 ${W} ${R}`,
    `V${H - R}`,
    `A${R} ${R} 0 0 1 ${W - R} ${H}`,
    `H${R}`,
    `A${R} ${R} 0 0 1 0 ${H - R}`,
    `V${R}`,
    `A${R} ${R} 0 0 1 ${R} 0`,
    "Z",
  ].join(" ");

  return `<nav class="tabbar" style="--puck:${((idx + 0.5) * 100) / tabs.length}%" aria-label="Primary">
    <svg class="tabbar-shell" viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d="${shellPath}" />
    </svg>
    <div class="tab-items">
      <span class="tab-puck" aria-hidden="true">${tabs[idx][2]}</span>
      ${tabs.map(([id, label, ic]) => `
        <button type="button" data-tab="${id}" class="${active === id ? "active" : ""}"${active === id ? ' aria-current="page"' : ""}>
          <span class="tab-ic">${ic}</span><span class="tl">${label}</span>
        </button>`).join("")}
    </div>
  </nav>`;
};

/* ------------------------------------------------------------------
   menuFab — the GoTyme-style floating expandable menu.
   Kept (unused) as a documented alternative to the bottom tab bar.
   Its styles were removed from styles.css; restore them alongside this
   function if you want to switch navigation back to the FAB menu.
   ------------------------------------------------------------------ */
const menuFab = (active) => {
  const items = [
    ["home", "Home", ICONS.home],
    ["bills", "Bills", ICONS.bill],
    ["payments", "Payments", ICONS.pay],
    ["advisories", "Advisories", ICONS.advisory],
    ["account", "Account", ICONS.user],
  ];
  return `<div class="fab" data-fab>
    <button class="fab-scrim" type="button" data-fab-close aria-label="Close menu" tabindex="-1"></button>
    <div class="fab-menu" role="menu" aria-label="Main menu">
      ${items.map(([id, label, ic]) => `
        <button class="fab-item ${active === id ? "active" : ""}" type="button" role="menuitem" data-fab-nav="${id}"${active === id ? ' aria-current="page"' : ""}>
          <span class="fab-item-ic">${ic}</span><span class="fab-item-lb">${label}</span>
        </button>`).join("")}
      <button class="fab-item" type="button" role="menuitem" data-link-account>
        <span class="fab-item-ic">${ICONS.link}</span><span class="fab-item-lb">Link accounts</span>
      </button>
    </div>
    <button class="fab-btn" type="button" data-fab-toggle aria-expanded="false" aria-label="Open menu" aria-haspopup="true">
      <span class="fab-btn-tx fab-btn-open">MENU</span>
      <span class="fab-btn-tx fab-btn-close">CLOSE</span>
    </button>
  </div>`;
};

const accountSheet = () => `
  <div class="acct-sheet" data-sheet hidden>
    <button class="sheet-scrim" type="button" data-sheet-close aria-label="Close" tabindex="-1"></button>
    <div class="sheet-panel" role="dialog" aria-modal="true" aria-label="Linked accounts">
      <div class="sheet-grab" aria-hidden="true"></div>
      <div class="sheet-head">
        <div>
          <h3>Linked accounts</h3>
          <p>${state.accounts.length} linked &middot; tap to switch</p>
        </div>
        <button class="icon-btn" type="button" data-sheet-close aria-label="Close">${ICONS.close}</button>
      </div>
      <div class="sheet-list">
        ${state.accounts.map((a) => {
          const active = a.acct === state.activeAcct;
          return `
        <button class="sheet-row${active ? " active" : ""}" type="button" data-acct="${esc(a.acct)}">
          <span class="sheet-ic">${ICONS.drop}</span>
          <span class="sheet-body">
            <span class="t">${esc(a.acct)}${a.primary ? " &middot; Primary" : a.label ? ` &middot; ${esc(a.label)}` : ""}</span>
            <span class="s">${esc(a.address || DATA.customer.address)}</span>
          </span>
          <span class="sheet-end">
            ${active ? `<span class="chip chip-green"><span class="cd"></span>Active</span>` : `<span class="chip chip-gray">Switch</span>`}
          </span>
        </button>`;
        }).join("")}
      </div>
      <button class="btn btn-primary btn-block sheet-add" type="button" data-link-account>
        ${ICONS.plus} Link another account
      </button>
    </div>
  </div>`;

const brandBar = () => "";

const backHeader = (title, action = "") => `
  <div class="page-titlebar">
    <button class="back-btn" data-back aria-label="Go back">${ICONS.chevL}</button>
    <h2>${title}</h2>
    ${action}
  </div>`;

/* ============================================================
   SCREENS
   Each returns { tab?, blueStatus?, html }
   ============================================================ */
const SCREENS = {};

/* ---------- ONBOARDING: WELCOME ---------- */
SCREENS.welcome = () => ({
  html: `
  <div class="screen">
    <section class="onb onb-welcome">
      <div class="onb-top">
        <span class="onb-logo"><img src="${LOGO.ppcwd}" alt="PPCWD logo" onerror="this.closest('.onb-logo').remove()"></span>
        <span class="onb-wordmark"><b>PPCWD</b><small>Puerto Princesa City Water District</small></span>
      </div>

      <div class="onb-main">
        <h1>Clean water,<br><span>simply managed.</span></h1>
        <p class="lead">Pay your bill, track your consumption, and get service updates from your water district &mdash; all in one place.</p>
        <ul class="onb-feats">
          <li><span class="onb-fi">${ICONS.wallet}</span><div><b>Pay in seconds</b><small>GCash, e-wallets, and partner payment centers.</small></div></li>
          <li><span class="onb-fi">${ICONS.trend}</span><div><b>Know your usage</b><small>Monthly consumption trends and billing history.</small></div></li>
          <li><span class="onb-fi">${ICONS.bell}</span><div><b>Stay informed</b><small>Advisories and interruptions for your barangay.</small></div></li>
        </ul>

        <div class="onb-stats">
          <div><b>60k+</b><span>Households served</span></div>
          <div><b>24/7</b><span>Support hotline</span></div>
          <div><b>9</b><span>Payment partners</span></div>
        </div>
      </div>

      <div class="onb-bottom">
        <button class="btn btn-primary btn-block" data-onb="start">Get started ${ICONS.chevR}</button>
        <p class="onb-fine">You'll link your water service account in the next step. It only takes a minute.</p>
      </div>
    </section>
  </div>`,
});

/* ---------- ONBOARDING: ACCOUNT SETUP ---------- */
const ONB_MODES = {
  link: {
    label: "Link existing",
    icon: ICONS.link,
    blurb: "Already a PPCWD customer? Link using the account and meter numbers printed on your bill.",
    fields: [
      { k: "acct", label: "Account number", ph: "e.g. 0012-3456-7890", im: "numeric", hint: "Digits and dashes, as printed at the top of your bill." },
      { k: "meter", label: "Meter number", ph: "e.g. MTR-0098213", im: "text", hint: "Printed next to the account number on your bill." },
    ],
  },
  add: {
    label: "Add account",
    icon: ICONS.plus,
    blurb: "Add another service connection using the account and meter numbers on your bill.",
    fields: [
      { k: "acct", label: "Account number", ph: "e.g. 0012-3456-7890", im: "numeric", hint: "Digits and dashes, as printed at the top of your bill." },
      { k: "meter", label: "Meter number", ph: "e.g. MTR-0098213", im: "text", hint: "Printed next to the account number on your bill." },
      { k: "nick", label: "Account label (optional)", ph: "e.g. Home, Sari-sari store", im: "text" },
    ],
  },
  open: {
    label: "Open new",
    icon: ICONS.drop,
    blurb: "Apply for a new water service connection for your property.",
    fields: [
      { k: "name", label: "Full name", ph: "e.g. Maria Santos", im: "text" },
      { k: "addr", label: "Service address", ph: "e.g. Brgy. Sta. Lucia, Puerto Princesa", im: "text", hint: "Include the barangay and street so our crew can find the property." },
      { k: "mobile", label: "Mobile number", ph: "e.g. 0917 123 4567", im: "tel", hint: "We use this only for billing and service alerts." },
    ],
  },
};

SCREENS.setup = () => {
  const m = ONB_MODES[state.onbMode] || ONB_MODES.link;
  const step = state.onbStep;
  const v = state.onbValues || {};
  const managing = state.setupContext === "manage";

  const form = `
    <p class="onb-mode-blurb">${m.blurb}</p>
    <form id="onb-form" novalidate>
      ${setupFields(m).map((f) => {
        const bad = state.onbError && state.onbErrField === f.k;
        const desc = bad ? `err-${f.k}` : f.hint ? `hint-${f.k}` : "";
        return `
        <label class="onb-field${bad ? " has-error" : ""}" for="onb-${f.k}">
          <span id="lbl-${f.k}">${f.label}</span>
          <input id="onb-${f.k}" aria-labelledby="lbl-${f.k}" type="text" inputmode="${f.im}" name="${f.k}" placeholder="${f.ph}" value="${esc(v[f.k] || "")}" autocomplete="off" spellcheck="false" maxlength="40"${desc ? ` aria-describedby="${desc}"` : ""}${bad ? ' aria-invalid="true"' : ""} />
          ${bad
            ? `<span class="onb-field-err" id="err-${f.k}">${ICONS.alert}<span>${state.onbError}</span></span>`
            : f.hint
              ? `<span class="onb-hint" id="hint-${f.k}">${f.hint}</span>`
              : ""}
        </label>`;
      }).join("")}
      <button class="btn btn-primary btn-block mt-14" type="submit" data-onb="submit">
        ${state.onbMode === "open" ? "Submit application" : "Verify &amp; link account"}
      </button>
    </form>`;

  const verify = `
    <div class="onb-status">
      <div class="onb-spin"></div>
      <h4>Verifying your account&hellip;</h4>
      <p>Matching your details with PPCWD records. Please don't close this screen.</p>
    </div>
    ${state.onbMode !== "open" ? `
    <div class="onb-summary">
      <div><span>Account number</span><span>${esc(v.acct || DATA.customer.acct)}</span></div>
      <div><span>Meter number</span><span>${esc(v.meter || DATA.customer.meter || "MTR-0098213")}</span></div>
      <div><span>Account name</span><span>${esc(DATA.customer.name)}</span></div>
    </div>
    <p class="onb-auto-note">${ICONS.info} Name shown from PPCWD records &mdash; no need to type it.</p>` : ""}`;

  const rows = state.onbMode === "open"
    ? [
        ["Application no.", "PPCWD-APP-2026-0142"],
        ["Applicant", esc(v.name || DATA.customer.name)],
        ["Service address", esc(v.addr || DATA.customer.address)],
      ]
    : [
        ["Account number", esc(v.acct || DATA.customer.acct)],
        ["Meter number", esc(v.meter || DATA.customer.meter || "MTR-0098213")],
        ["Account name", DATA.customer.name],
        ["Service address", DATA.customer.address],
      ];

  const success = `
    <div class="onb-status">
      <div class="onb-ok">${ICONS.check}</div>
      <h4>${state.onbMode === "open" ? "Application submitted" : "Account linked"}</h4>
      <p>${state.onbMode === "open"
        ? "We received your application. A PPCWD representative will contact you within 3 working days."
        : "You're all set. Your water service account is now connected to the app."}</p>
    </div>
    <div class="onb-summary">
      ${rows.map(([k, val]) => `<div><span>${k}</span><span>${val}</span></div>`).join("")}
    </div>
    <button class="btn btn-primary btn-block mt-14" data-onb="finish">
      ${managing ? "Done" : state.onbMode === "open" ? "Continue to dashboard" : "Go to dashboard"} ${ICONS.chevR}
    </button>`;

  const body = step === "verify" ? verify : step === "success" ? success : form;

  return {
    html: `
  <div class="screen">
    <div class="page-titlebar">
      ${step === "form" ? (managing
        ? `<button class="back-btn" data-back aria-label="Back">${ICONS.chevL}</button>`
        : `<button class="back-btn" data-onb="back" aria-label="Back">${ICONS.chevL}</button>`) : ""}
      <h2>${managing ? "Link account" : "Account setup"}</h2>
    </div>
    <div class="pad after-bar">
      ${step === "form" ? `
      <div class="onb-head">
        <span class="onb-step">${managing ? "Verify ownership" : "Step 1 of 2 &middot; Verify your account"}</span>
        <h3>${managing ? "Link another service" : "Connect your water service"}</h3>
        <p>${managing
          ? "Enter the details of the water service account you want to add to this app."
          : "Choose how you'd like to add your account, then enter your details for verification."}</p>
      </div>
      ${!managing ? `<div class="onb-modes">
        ${Object.entries(ONB_MODES).map(([key, mode]) => `
          <button type="button" class="onb-mode ${state.onbMode === key ? "active" : ""}" data-onbmode="${key}">
            ${mode.icon}<span>${mode.label}</span>
          </button>`).join("")}
      </div>` : ""}` : ""}

      <div class="card onb-card">${body}</div>

      ${step === "form" ? `
      <div class="onb-note">${ICONS.shield}<span>Your details are checked against PPCWD records. We never share your information with third parties.</span></div>` : ""}
      <p class="footer-note">Need help? Call the 24/7 hotline at (048) 726-3344</p>
    </div>
  </div>`,
  };
};

/* ---------- HOME ---------- */
SCREENS.home = () => ({
  tab: "home",
  html: `
  <div class="screen">
    ${brandBar()}
    <div class="app-header">
      <div class="hello-row">
        <button type="button" class="account-btn" data-tab="account" aria-label="Open account">
          <span class="avatar" aria-hidden="true">${ICONS.user}</span>
        </button>
        <div class="hello">
          <small lang="tl">Magandang araw,</small>
          <h2>${DATA.customer.name}</h2>
        </div>
      </div>
      <button class="icon-btn" data-nav="notifications" aria-label="Notifications${state.unread ? `, ${state.unread} unread` : ""}">
        ${ICONS.bell}${state.unread ? `<span class="badge">${state.unread}</span>` : ""}
      </button>
    </div>

    <div class="pad">
      <!-- Balance hero — the one dark surface on the dashboard -->
      <section class="balance-card">
        <div class="balance-top">
          <div class="bt-left">
            <div class="lbl">Current balance</div>
            <div class="balance-amount">&#8369;${DATA.bill.amount}</div>
          </div>
          <button class="acct-pill" type="button" data-open-sheet aria-label="Switch or link accounts">
            ${ICONS.drop}<span><b>${state.accounts.length}</b> account${state.accounts.length === 1 ? "" : "s"}</span>${ICONS.chevR}
          </button>
        </div>
        <div class="balance-meta">
          <span class="pill pill-countdown">${ICONS.clock.replace("<svg", '<svg style="width:13px;height:13px"')} ${dueLabel()}</span>
          <span class="pill pill-glass">${ICONS.calendar.replace("<svg", '<svg style="width:13px;height:13px"')} ${DATA.bill.dueShort}</span>
        </div>
        <div class="balance-foot">
          <span class="acct-no">Account ${activeAccount().acct}</span>
        </div>
        <div class="balance-actions">
          <button class="btn btn-aqua" data-nav="payments">${ICONS.pay} Pay Now</button>
          <button class="btn btn-white" data-nav="bill-detail">${ICONS.bill} View Bill</button>
        </div>
      </section>

      <!-- Shortcuts — compact white tiles, one primary action each -->
      <div class="quick-actions">
        <button class="qa" data-nav="bills"><span class="qa-ic">${ICONS.bill}</span><span>My Bills</span></button>
        <button class="qa" data-nav="usage"><span class="qa-ic">${ICONS.drop}</span><span>My Usage</span></button>
        <button class="qa" data-open-sheet><span class="qa-ic">${ICONS.user}</span><span>Accounts</span></button>
        <button class="qa" data-nav="help"><span class="qa-ic">${ICONS.help}</span><span>Get Help</span></button>
      </div>

      <!-- Latest advisory -->
      <div class="section-head">
        <h3>Latest advisory</h3>
        <button class="link" data-tab="advisories">View all ${ICONS.chevR}</button>
      </div>
      <button class="adv-preview" data-nav="advisory-detail" data-id="a1">
        <span class="adv-preview-top">
          <span class="chip chip-orange-light"><span class="cd"></span> Service Interruption</span>
          <span class="adv-date">${DATA.advisories[0].date}</span>
        </span>
        <span class="adv-preview-title">${DATA.advisories[0].title}</span>
        <span class="adv-preview-more">Read More ${ICONS.chevR}</span>
      </button>

      <!-- Usage snapshot — white card with an inline stat row -->
      <div class="section-head">
        <h3>Water consumption</h3>
        <button class="link" data-nav="usage">Details ${ICONS.chevR}</button>
      </div>
      <div class="card">
        <div class="mini-stat">
          <div>
            <div class="mini-lbl">This month</div>
            <div class="mini-val">10 <span>cu.m</span></div>
          </div>
          <span class="chip chip-green-light"><span class="cd"></span> 3 cu.m less</span>
        </div>
        ${miniChart()}
      </div>

      <p class="footer-note">PPCWD Customer App &middot; Serving Puerto Princesa City since 1974</p>
    </div>
    <div class="after-tabs" style="height:8px"></div>
  </div>`,
});

function miniChart() {
  const vals = DATA.usage.map((d) => d.v);
  const max = Math.max(...vals, 16), min = Math.min(...vals);
  const span = max - min || 1;
  const lvl = (v) => Math.round(((v - min) / span) * 100);
  return `<div class="chart" style="height:110px;margin-top:14px">${DATA.usage.map((d, i) => `
    <div class="col ${i === DATA.usage.length - 1 ? "now" : ""}">
      <span class="vval">${d.v}</span>
      <div class="bar" style="height:${(d.v / max) * 78}px;--lvl:${lvl(d.v)}%"></div>
      <span class="mlbl">${d.m}</span>
    </div>`).join("")}</div>`;
}

/* ---------- BILLS ---------- */
SCREENS.bills = () => ({
  tab: "bills",
  html: `
  <div class="screen">
    <div class="page-titlebar">
      <h2>My Bills</h2>
      <button class="icon-btn" data-nav="notifications" aria-label="Notifications${state.unread ? `, ${state.unread} unread` : ""}">${ICONS.bell}${state.unread ? `<span class="badge">${state.unread}</span>` : ""}</button>
    </div>
    <div class="pad">
      <div class="seg">
        <button data-billtab="current" class="${state.billsTab === "current" ? "active" : ""}">Current Bill</button>
        <button data-billtab="history" class="${state.billsTab === "history" ? "active" : ""}">Billing History</button>
      </div>
      ${state.billsTab === "current" ? billsCurrent() : billsHistory()}
    </div>
    <div class="after-tabs" style="height:20px"></div>
  </div>`,
});

function billsCurrent() {
  return `
  <div class="mt-16 card card-dark">
    <div class="bill-hero">
      <span class="period">${DATA.bill.period} &middot; Statement</span>
      <span class="amount">&#8369;${DATA.bill.amount}</span>
      <span class="sub">Due on or before <b style="color:#FFD014">${DATA.bill.due}</b></span>
    </div>
    <div class="bill-divider"></div>
    ${DATA.bill.lines.map(([k, v]) => `<div class="kv"><span class="k">${k}</span><span class="v">&#8369;${v}</span></div>`).join("")}
    <div class="bill-divider"></div>
    <div class="kv total"><span class="k">Total amount due</span><span class="v">&#8369;${DATA.bill.total}</span></div>
  </div>

  <div class="mt-14 stat-grid">
    <div class="stat">
      <div class="sl">${ICONS.drop} Usage this month</div>
      <div class="sv">10 <span class="su">cu.m</span></div>
    </div>
    <div class="stat">
      <div class="sl">${ICONS.receipt} Reference no.</div>
      <div class="sv" style="font-size:11.5px;margin-top:11px;letter-spacing:-.2px">${DATA.bill.ref}</div>
    </div>
  </div>

  <div class="mt-14" style="display:flex;flex-direction:column;gap:10px">
    <button class="btn btn-primary btn-block" data-nav="gcash-guide">${ICONS.pay} Pay with GCash</button>
    <div style="display:flex;gap:10px">
      <button class="btn btn-outline btn-sm" style="flex:1" data-nav="bill-detail">${ICONS.doc} Statement</button>
      <button class="btn btn-soft btn-sm" style="flex:1" data-toast="Statement downloaded to your device.">${ICONS.download} Download PDF</button>
    </div>
  </div>`;
}

function billsHistory() {
  const filters = ["All", "2026", "2025", "Paid", "Unpaid"];
  const q = (state.historyQuery || "").trim().toLowerCase();
  const rows = DATA.history.filter((h) => {
    const f = state.historyFilter;
    const byFilter =
      f === "All" ||
      f === h.period.slice(-4) ||
      (f === "Paid" && h.status === "Paid") ||
      (f === "Unpaid" && h.status !== "Paid");
    const byQuery = !q || `${h.period} ${h.amt} ${h.status} ${h.date}`.toLowerCase().includes(q);
    return byFilter && byQuery;
  });
  return `
  <div class="mt-14 search-field">
    ${ICONS.search}
    <input id="bill-search" type="search" data-search="historyQuery" aria-label="Search bills by month or reference number" placeholder="Search by month or reference no." value="${esc(state.historyQuery)}" />
  </div>
  <div class="filter-scroll mt-12">
    ${filters.map((f) => `<button class="fchip ${state.historyFilter === f ? "active" : ""}" data-hfilter="${f}" aria-pressed="${state.historyFilter === f}">${f === "All" ? "All months" : f}</button>`).join("")}
  </div>
  ${rows.length ? `
  <div class="row-card mt-14">
    ${rows.map((h) => `
      <button class="list-row" data-nav="bill-detail">
        <span class="list-ic">${ICONS.receipt}</span>
        <span class="list-body">
          <span class="t">${h.period}</span>
          <span class="s">${h.date}</span>
        </span>
        <span class="list-end">
          <span style="text-align:right">
            <span class="amt">&#8369;${h.amt}</span>
            <span style="display:block;margin-top:4px"><span class="chip ${h.chip}-light"><span class="cd"></span>${h.status}</span></span>
          </span>
          ${ICONS.chevR}
        </span>
      </button>`).join("")}
  </div>` : `
  <div class="card mt-14 empty-state">
    ${ICONS.search}
    <p>No bills match this filter.</p>
    <button class="btn btn-soft btn-sm" data-clear-bills>Clear filters</button>
  </div>`}
  <p class="footer-note">Showing ${rows.length} of 24 billing records</p>`;
}

/* ---------- BILL DETAIL (Statement of Account) ---------- */
SCREENS["bill-detail"] = () => ({
  html: `
  <div class="screen on-tint">
    ${backHeader("Statement of Account", `<button class="icon-btn" data-toast="Statement downloaded to your device." aria-label="Download statement">${ICONS.download}</button>`)}
    <div class="pad after-bar">
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <div class="text-muted" style="font-weight:700">Account name</div>
            <div style="font-weight:800;font-size:15.5px;margin-top:2px">${DATA.customer.name}</div>
            <div class="text-muted acct-id mt-4" style="margin-top:4px">Acct no. ${activeAccount().acct}</div>
          </div>
          <span class="chip chip-orange-light"><span class="cd"></span> Due</span>
        </div>
        <div class="bill-divider"></div>
        <div class="kv"><span class="k">Billing period</span><span class="v">${DATA.bill.period}</span></div>
        <div class="kv"><span class="k">Meter reading</span><span class="v">04,213 cu.m</span></div>
        <div class="kv"><span class="k">Consumption</span><span class="v">10 cu.m</span></div>
        <div class="kv"><span class="k">Due date</span><span class="v" style="color:#B45309">${DATA.bill.dueShort}</span></div>
        <div class="kv"><span class="k">Reference no.</span><span class="v">${DATA.bill.ref}</span></div>
      </div>

      <div class="section-head"><h3>Charges</h3></div>
      <div class="card">
        ${DATA.bill.lines.map(([k, v]) => `<div class="kv"><span class="k">${k}</span><span class="v">&#8369;${v}</span></div>`).join("")}
        <div class="bill-divider"></div>
        <div class="kv total"><span class="k">Total amount due</span><span class="v">&#8369;${DATA.bill.total}</span></div>
      </div>

      <div class="mt-14" style="display:flex;gap:10px">
        <button class="btn btn-outline btn-sm" style="flex:1" data-toast="Statement downloaded to your device.">${ICONS.download} Download</button>
        <button class="btn btn-outline btn-sm" style="flex:1" data-toast="Share sheet opened.">${ICONS.share} Share</button>
      </div>
      <button class="btn btn-primary btn-block mt-12" data-nav="gcash-guide">${ICONS.pay} Pay this bill</button>
      <p class="footer-note">Official receipt will be issued once payment is posted.</p>
    </div>
  </div>`,
});

/* ---------- PAYMENTS ---------- */
SCREENS.payments = () => ({
  tab: "payments",
  html: `
  <div class="screen">
    <div class="page-titlebar"><h2>Payments</h2></div>
    <div class="pad">
      <!-- GCash primary -->
      <section class="balance-card" style="background:linear-gradient(150deg,rgba(255,255,255,.12),rgba(255,255,255,.02)),var(--card-grad)">
        <div class="balance-top">
          <div>
            <div class="lbl">Recommended &middot; Instant posting</div>
            <div style="font-size:25px;font-weight:800;margin-top:8px;letter-spacing:-.5px">Pay with GCash</div>
          </div>
          ${logo("gcash", "GCash", true, "width:84px;height:50px;flex:none", `<span class="acc-logo l-gcash" style="width:84px;height:50px;font-size:14px;border-radius:12px">GCash</span>`)}
        </div>
        <div class="balance-actions">
          <button class="btn btn-aqua" data-nav="gcash-guide">${ICONS.send} Start payment guide</button>
        </div>
      </section>

      <div class="section-head"><h3>What you'll need</h3></div>
      <div class="card">
        <div class="need-box" style="margin-top:0">
          <p>Account number (${activeAccount().acct}) &middot; Account name (${DATA.customer.name}) &middot; Amount due (&#8369;${DATA.bill.amount})</p>
        </div>
        <div class="mt-12"><span class="chip chip-blue-light"><span class="cd"></span> GCash posts within minutes</span></div>
      </div>

      <!-- Other partners -->
      <div class="section-head"><h3>Other payment partners</h3></div>
      <p class="text-muted" style="margin-bottom:12px">Pay over the counter at any partner near you. Tap a partner to see the steps.</p>

      <div class="acc">
        <button class="acc-head" data-acc aria-expanded="false">
          ${logo("palawan", "Palawan Pawnshop", false, "", `<span class="acc-logo l-palawan">Palawan</span>`)}
          <span class="acc-body-t"><span class="t">Palawan Pawnshop</span><span class="s">Over-the-counter &middot; posts within 24 hrs</span></span>
          <span class="acc-chev">${ICONS.chevD}</span>
        </button>
        <div class="acc-panel"><div class="acc-panel-inner">
          <ol class="steps">
            <li><span class="n"></span> Visit any Palawan Pawnshop branch.</li>
            <li><span class="n"></span> Tell the cashier you are paying your <b>PPCWD water bill</b>.</li>
            <li><span class="n"></span> Provide your account number and bill amount.</li>
            <li><span class="n"></span> Pay in cash and wait for the printed e-receipt.</li>
          </ol>
          <div class="need-box"><div class="nb-t">${ICONS.info} Required information</div>
            <p>Account name &middot; Account number &middot; Amount due &middot; Billing reference (if available)</p></div>
        </div></div>
      </div>

      <div class="acc">
        <button class="acc-head" data-acc aria-expanded="false">
          ${logo("ecpay", "ECPay", false, "", `<span class="acc-logo l-ecpay">ECPay</span>`)}
          <span class="acc-body-t"><span class="t">ECPay</span><span class="s">Partner stores and remittance centers</span></span>
          <span class="acc-chev">${ICONS.chevD}</span>
        </button>
        <div class="acc-panel"><div class="acc-panel-inner">
          <ol class="steps">
            <li><span class="n"></span> Go to any ECPay partner outlet (convenience stores, remittance centers).</li>
            <li><span class="n"></span> Ask to pay a <b>PPCWD water bill</b> via ECPay.</li>
            <li><span class="n"></span> Fill out the payment form with your account details.</li>
            <li><span class="n"></span> Hand your payment to the cashier and claim your receipt.</li>
          </ol>
          <div class="need-box"><div class="nb-t">${ICONS.info} Required information</div>
            <p>Account name &middot; Account number &middot; Amount due</p></div>
        </div></div>
      </div>

      <div class="acc">
        <button class="acc-head" data-acc aria-expanded="false">
          ${logo("sm", "SM Bills Payment", false, "", `<span class="acc-logo l-sm">SM</span>`)}
          <span class="acc-body-t"><span class="t">SM Bills Payment</span><span class="s">Any SM Business Center or cashier</span></span>
          <span class="acc-chev">${ICONS.chevD}</span>
        </button>
        <div class="acc-panel"><div class="acc-panel-inner">
          <ol class="steps">
            <li><span class="n"></span> Visit the <b>SM Business Center</b> or any cashier counter at SM City Puerto Princesa.</li>
            <li><span class="n"></span> Present your PPCWD bill or state your account number.</li>
            <li><span class="n"></span> Choose <b>Bills Payment</b> and pay the amount due.</li>
            <li><span class="n"></span> Keep the stamped official receipt as proof of payment.</li>
          </ol>
          <div class="need-box"><div class="nb-t">${ICONS.info} Required information</div>
            <p>Account name &middot; Account number &middot; Amount due</p></div>
        </div></div>
      </div>

      <div class="acc">
        <button class="acc-head" data-acc aria-expanded="false">
          ${logo("ml", "M Lhuillier", false, "", `<span class="acc-logo l-ml">ML</span>`)}
          <span class="acc-body-t"><span class="t">M Lhuillier</span><span class="s">Kwarta Padala branches nationwide</span></span>
          <span class="acc-chev">${ICONS.chevD}</span>
        </button>
        <div class="acc-panel"><div class="acc-panel-inner">
          <ol class="steps">
            <li><span class="n"></span> Go to any M Lhuillier branch.</li>
            <li><span class="n"></span> Fill out the <b>Bills Payment</b> form and write PPCWD as the biller.</li>
            <li><span class="n"></span> Provide your account number and pay the amount due in cash.</li>
            <li><span class="n"></span> Verify the details printed on your M Lhuillier receipt before leaving.</li>
          </ol>
          <div class="need-box"><div class="nb-t">${ICONS.info} Required information</div>
            <p>Account name &middot; Account number &middot; Amount due &middot; Contact number</p></div>
        </div></div>
      </div>

      <div class="acc">
        <button class="acc-head" data-acc aria-expanded="false">
          ${logo("ussc", "USSC", false, "", `<span class="acc-logo l-ussc">USSC</span>`)}
          <span class="acc-body-t"><span class="t">USSC</span><span class="s">Universal Stores and Services</span></span>
          <span class="acc-chev">${ICONS.chevD}</span>
        </button>
        <div class="acc-panel"><div class="acc-panel-inner">
          <ol class="steps">
            <li><span class="n"></span> Visit any USSC outlet.</li>
            <li><span class="n"></span> Request the bills payment form for <b>PPCWD</b>.</li>
            <li><span class="n"></span> Write your account name, account number, and amount.</li>
            <li><span class="n"></span> Pay the cashier and keep your validated receipt.</li>
          </ol>
          <div class="need-box"><div class="nb-t">${ICONS.info} Required information</div>
            <p>Account name &middot; Account number &middot; Amount due</p></div>
        </div></div>
      </div>

      <div class="mt-16 verified-banner">
        ${ICONS.shield}
        <p>PPCWD never asks for your GCash PIN or OTP. Keep your receipts until your payment reflects in the app.</p>
      </div>
      <p class="footer-note">GCash posts within minutes &middot; Partner payments within 24 hours &middot; Office hours 8:00 AM &ndash; 5:00 PM</p>
    </div>
    <div class="after-tabs" style="height:16px"></div>
  </div>`,
});

/* ---------- GCASH GUIDE ---------- */
SCREENS["gcash-guide"] = () => ({
  html: `
  <div class="screen on-tint">
    ${backHeader("Pay with GCash")}
    <div class="pad after-bar">
      <div class="card" style="text-align:center;padding:22px">
        ${logo("gcash", "GCash", false, "width:88px;height:56px;margin:0 auto", `<span class="acc-logo l-gcash" style="width:88px;height:56px;font-size:16px;border-radius:14px;margin:0 auto">GCash</span>`)}
        <div class="text-muted mt-12" style="font-weight:700">Amount to pay</div>
        <div style="font-size:34px;font-weight:800;letter-spacing:-1px;margin-top:4px">&#8369;${DATA.bill.amount}</div>
        <div class="mt-10"><span class="chip chip-blue-light"><span class="cd"></span> ${DATA.bill.period} bill &middot; Due ${DATA.bill.dueShort}</span></div>
      </div>

      <div class="section-head"><h3>Follow these 4 steps</h3></div>
      <div class="card">
        <ol class="steps">
          <li><span class="n"></span> Open the <b>GCash app</b> and log in to your account.</li>
          <li><span class="n"></span> Tap <b>Pay Bills</b> on the home screen, then select the <b>Water Utility</b> category.</li>
          <li><span class="n"></span> Choose <b>PPCWD &mdash; Puerto Princesa City Water District</b> as your biller.</li>
          <li><span class="n"></span> Enter the details below, confirm, and screenshot your receipt.
            <div class="need-box" style="margin-top:10px">
              <div class="nb-t">${ICONS.copy} Enter exactly</div>
              <p>Account number: <b>${activeAccount().acct}</b><br>Account name: <b>${DATA.customer.name}</b><br>Amount: <b>&#8369;${DATA.bill.amount}</b><br> Email (optional): for your digital receipt</p>
            </div>
          </li>
        </ol>
      </div>

      <div class="mt-14 verified-banner">
        ${ICONS.clock}
        <p>GCash payments post to your PPCWD account within minutes. Your balance in the app updates automatically.</p>
      </div>

      <button class="btn btn-primary btn-block mt-16" data-nav="payment-success">${ICONS.send} I've paid &mdash; confirm my payment</button>
      <button class="btn btn-outline btn-block mt-10" data-toast="Opening GCash app&hellip;">${ICONS.globe} Open GCash app</button>
    </div>
  </div>`,
});

/* ---------- PAYMENT SUCCESS ---------- */
SCREENS["payment-success"] = () => ({
  html: `
  <div class="screen">
    <div class="success-wrap after-bar">
      <div class="success-ring">${ICONS.check}</div>
      <h2 style="font-size:22px;font-weight:800">Payment reported</h2>
      <p class="text-muted mt-8" style="max-width:290px">We're checking your GCash payment now. Your balance and official receipt update automatically, usually within 15 minutes.</p>

      <div class="card mt-20" style="width:100%;text-align:left">
        <div class="kv"><span class="k">Amount</span><span class="v">&#8369;${DATA.bill.amount}</span></div>
        <div class="kv"><span class="k">Billing period</span><span class="v">${DATA.bill.period}</span></div>
        <div class="kv"><span class="k">GCash reference</span><span class="v" style="font-size:12px">${DATA.paymentRef}</span></div>
        <div class="kv"><span class="k">Status</span><span class="v"><span class="chip chip-orange-light"><span class="cd"></span> Awaiting verification</span></span></div>
      </div>

      <div class="verified-banner mt-14" style="text-align:left">
        ${ICONS.info}
        <p>Keep this reference number until the payment appears in your billing history.</p>
      </div>

      <button class="btn btn-primary btn-block mt-12" data-tab="home">Back to Home</button>
    </div>
  </div>`,
});

/* ---------- ADVISORIES ---------- */
SCREENS.advisories = () => {
  const cats = ["All", "Interruption", "Maintenance", "Announcement"];
  const list = DATA.advisories.filter((a) => !a.archive && (state.advFilter === "All" || a.cat === state.advFilter));
  const featured = list[0];
  const rest = list.slice(1);
  return {
    tab: "advisories",
    html: `
    <div class="screen">
      <div class="page-titlebar">
        <h2>Advisories</h2>
        <button class="icon-btn" data-nav="advisory-archive" aria-label="Archive">${ICONS.archive}</button>
      </div>
      <div class="pad">
        <div class="filter-scroll">
          ${cats.map((c) => `<button class="fchip ${state.advFilter === c ? "active" : ""}" data-advc="${c}">${c === "All" ? "All advisories" : c}</button>`).join("")}
        </div>

        ${featured ? `
        <button type="button" class="mt-14 adv-feature" data-nav="advisory-detail" data-id="${featured.id}">
          <span class="cat">${ICONS.alert.replace("<svg", '<svg style="width:13px;height:13px"')} ${featured.cat}</span>
          <span class="adv-title">${featured.title}</span>
          <span class="adv-excerpt">${featured.excerpt}</span>
          <span class="meta">${ICONS.calendar.replace("<svg", '<svg style="width:14px;height:14px"')} ${featured.date}</span>
        </button>` : `<div class="mt-14 card text-muted" style="text-align:center">No advisories in this category.</div>`}
        ${rest.length ? `
        <div class="section-head"><h3>Recent advisories</h3><button class="link" data-nav="advisory-archive">Archive ${ICONS.chevR}</button></div>
        <div class="row-card">
          ${rest.map((a) => `
            <button class="adv-item" data-nav="advisory-detail" data-id="${a.id}">
              <span class="adv-bar ${a.color === "sky" ? "" : a.color}"></span>
              <span style="flex:1">
                <span class="t">${a.title}</span>
                <span class="s"><span class="chip chip-${a.color === "sky" ? "blue" : a.color === "aqua" ? "aqua" : "orange"}-light">${a.cat}</span> ${a.date}</span>
              </span>
              <span class="list-end">${ICONS.chevR}</span>
            </button>`).join("")}
        </div>` : ""}

        <p class="footer-note">Advisories are posted by PPCWD Information Office</p>
      </div>
      <div class="after-tabs" style="height:16px"></div>
    </div>
  `,
  };
};

SCREENS["advisory-archive"] = () => {
  const q = (state.advQuery || "").trim().toLowerCase();
  const rows = DATA.advisories.filter((a) => a.archive && (!q || `${a.title} ${a.date}`.toLowerCase().includes(q)));
  return {
    html: `
  <div class="screen on-tint">
    ${backHeader("Advisory Archive")}
    <div class="pad after-bar">
      <div class="search-field">${ICONS.search}<input type="search" data-search="advQuery" aria-label="Search past advisories" placeholder="Search past advisories" value="${esc(state.advQuery)}" /></div>
      <div class="section-head"><h3>2025 &amp; earlier</h3></div>
      <div class="row-card">
        ${rows.map((a) => `
          <button class="adv-item" data-nav="advisory-detail" data-id="${a.id}">
            <span class="adv-bar ${a.color === "sky" ? "" : a.color}"></span>
            <span style="flex:1">
              <span class="t">${a.title}</span>
              <span class="s">${a.date} &middot; Archived</span>
            </span>
            <span class="list-end">${ICONS.chevR}</span>
          </button>`).join("")}
      </div>
      ${rows.length ? "" : `<div class="card mt-14 empty-state">${ICONS.search}<p>No archived advisories match your search.</p></div>`}
      <p class="footer-note">Advisories older than 2 years are available upon request</p>
    </div>
  </div>`,
  };
};

SCREENS["advisory-detail"] = (params) => {
  const a = DATA.advisories.find((x) => x.id === (params && params.id)) || DATA.advisories[0];
  return {
    html: `
    <div class="screen on-tint">
      ${backHeader("Advisory", `<button class="icon-btn" data-toast="Advisory shared." aria-label="Share advisory">${ICONS.share}</button>`)}
      <div class="pad after-bar">
        <div class="card">
          <span class="chip chip-${a.color === "sky" ? "blue" : a.color === "aqua" ? "aqua" : "orange"}-light"><span class="cd"></span>${a.cat}</span>
          <h3 style="font-size:19px;font-weight:800;line-height:1.35;margin-top:12px;letter-spacing:-.3px">${a.title}</h3>
          <div style="display:flex;align-items:center;gap:7px;color:var(--muted);font-size:12.5px;font-weight:600;margin-top:10px">
            ${ICONS.clock.replace("<svg", '<svg style="width:15px;height:15px"')} ${a.date} &middot; PPCWD Information Office
          </div>
          ${a.areas.length ? `
          <div class="bill-divider"></div>
          <div class="text-muted" style="font-weight:700;margin-bottom:8px">Affected areas</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">${a.areas.map((ar) => `<span class="chip chip-gray-light">${ar}</span>`).join("")}</div>` : ""}
        </div>

        <div class="card mt-14">
          ${a.body.split("\n\n").map((p) => `<p style="font-size:14px;line-height:1.65;color:#33415C;font-weight:500;margin-bottom:12px">${p}</p>`).join("").replace(/margin-bottom:12px$/, "")}
        </div>

        <div class="mt-14 tip-card">
          ${ICONS.info}
          <p><b>Need to report a line break or leak?</b><br>Call our 24/7 hotline so dispatch can respond immediately.</p>
        </div>
        <button class="btn btn-primary btn-block mt-12" data-nav="help">${ICONS.phone} Contact PPCWD</button>
      </div>
    </div>`,
  };
};

/* ---------- ACCOUNT ---------- */
SCREENS.account = () => ({
  tab: "account",
  html: `
  <div class="screen on-tint">
    ${backHeader("Account")}
    <div class="pad after-bar">
      <div class="card" style="display:flex;align-items:center;gap:14px">
        <span class="avatar" style="width:56px;height:56px">${ICONS.user}</span>
        <div style="flex:1">
          <div style="font-weight:800;font-size:17px">${DATA.customer.name}</div>
          <div class="text-muted acct-id" style="margin-top:2px;font-size:12.5px">Acct no. ${activeAccount().acct}</div>
          <div class="mt-8"><span class="chip chip-green-light"><span class="cd"></span> Service Active</span> <span class="chip chip-blue-light"><span class="cd"></span> ${activeAccount().type || DATA.customer.type}</span></div>
        </div>
        <button class="icon-btn" data-toast="Editing personal information&hellip;" aria-label="Edit personal information">${ICONS.edit}</button>
      </div>

      <div class="section-head">
        <h3>Linked accounts</h3>
        <button class="icon-btn icon-btn-sm" type="button" data-link-account aria-label="Link another account">${ICONS.plus}</button>
      </div>
      <div class="row-card">
        ${state.accounts.map((a) => {
          const active = a.acct === state.activeAcct;
          return `
        <button class="list-row" data-acct="${esc(a.acct)}" aria-pressed="${active}">
          <span class="list-ic${active ? "" : " aqua"}">${ICONS.drop}</span>
          <span class="list-body">
            <span class="t acct-id">${esc(a.acct)}</span>
            <span class="s">${a.primary ? "Primary" : a.label ? esc(a.label) : ""}${a.primary || a.label ? " &middot; " : ""}${esc(a.address || DATA.customer.address)}</span>
          </span>
          <span class="list-end">
            ${active ? `<span class="chip chip-green-light"><span class="cd"></span>Active</span>` : `<span class="chip chip-gray-light">Switch</span>`}
            ${ICONS.chevR}
          </span>
        </button>`;
        }).join("")}
      </div>

      <div class="section-head"><h3>Settings &amp; preferences</h3></div>
      <div class="row-card">
        <button class="list-row" data-nav="settings">
          <span class="list-ic">${ICONS.bell}</span>
          <span class="list-body"><span class="t">Notifications &amp; reminders</span><span class="s">Due dates, billing alerts, advisories</span></span>
          <span class="list-end">${ICONS.chevR}</span>
        </button>
        <button class="list-row" data-nav="settings">
          <span class="list-ic sky">${ICONS.text}</span>
          <span class="list-body"><span class="t">Text size &amp; accessibility</span><span class="s">Make text easier to read</span></span>
          <span class="list-end">${ICONS.chevR}</span>
        </button>
        <button class="list-row" data-nav="help">
          <span class="list-ic orange">${ICONS.help}</span>
          <span class="list-body"><span class="t">Help &amp; support</span><span class="s">Hotlines, email, and frequently asked questions</span></span>
          <span class="list-end">${ICONS.chevR}</span>
        </button>
      </div>

      <div class="section-head"><h3>About</h3></div>
      <div class="row-card">
        <button class="list-row" data-toast="Privacy policy opened.">
          <span class="list-ic green">${ICONS.shield}</span>
          <span class="list-body"><span class="t">Privacy &amp; data policy</span></span>
          <span class="list-end">${ICONS.chevR}</span>
        </button>
        <button class="list-row" data-toast="PPCWD Customer App v2.0">
          <span class="list-ic">${ICONS.info}</span>
          <span class="list-body"><span class="t">About this app</span><span class="s">Version 2.0 &middot; Puerto Princesa City Water District</span></span>
          <span class="list-end">${ICONS.chevR}</span>
        </button>
        <button class="list-row" data-signout>
          <span class="list-ic red">${ICONS.logout}</span>
          <span class="list-body"><span class="t danger-text">Sign out</span></span>
        </button>
      </div>
      <p class="footer-note">PPCWD Customer App &middot; Version 2.0</p>
      <div class="after-tabs" style="height:16px"></div>
    </div>
  </div>`,
});

/* ---------- SETTINGS ---------- */
SCREENS.settings = () => {
  const sw = (key, label) => {
    const on = !!state.switches[key];
    return `<button class="switch ${on ? "on" : ""}" type="button" data-switch="${key}" role="switch" aria-checked="${on}" aria-label="${label}"></button>`;
  };
  return {
    html: `
  <div class="screen on-tint">
    ${backHeader("Settings")}
    <div class="pad after-bar">
      <div class="section-head" style="margin-top:6px"><h3>Notifications</h3></div>
      <div class="row-card">
        <div class="toggle-row">
          <span class="list-ic orange">${ICONS.calendar}</span>
          <span class="tr-body"><span class="t">Due date reminders</span><span class="s">Alert 3 days before your bill is due</span></span>
          ${sw("due", "Due date reminders")}
        </div>
        <div class="toggle-row">
          <span class="list-ic">${ICONS.bill}</span>
          <span class="tr-body"><span class="t">Billing alerts</span><span class="s">Notify me when a new bill is issued</span></span>
          ${sw("bill", "Billing alerts")}
        </div>
        <div class="toggle-row">
          <span class="list-ic aqua">${ICONS.advisory}</span>
          <span class="tr-body"><span class="t">Advisory notifications</span><span class="s">Service interruptions and announcements</span></span>
          ${sw("adv", "Advisory notifications")}
        </div>
        <div class="toggle-row">
          <span class="list-ic green">${ICONS.checkC}</span>
          <span class="tr-body"><span class="t">Payment confirmations</span><span class="s">Receipt alerts when payments post</span></span>
          ${sw("pay", "Payment confirmations")}
        </div>
      </div>

      <div class="section-head"><h3>Accessibility</h3></div>
      <div class="row-card">
        <div class="toggle-row">
          <span class="list-ic sky">${ICONS.text}</span>
          <span class="tr-body"><span class="t">Larger text</span><span class="s">Increase body text size across the app</span></span>
          ${sw("bigtext", "Larger text")}
        </div>
        <div class="toggle-row">
          <span class="list-ic">${ICONS.spark}</span>
          <span class="tr-body"><span class="t">High contrast</span><span class="s">Stronger colors for better readability</span></span>
          ${sw("contrast", "High contrast")}
        </div>
      </div>

      <div class="section-head"><h3>Payment preferences</h3></div>
      <div class="row-card">
        <button class="list-row" data-tab="payments">
          ${logo("gcash", "GCash", false, "width:60px;height:38px;flex:none", `<span class="acc-logo l-gcash" style="width:60px;height:38px;border-radius:10px;font-size:11px">GCash</span>`)}
          <span class="list-body"><span class="t">Preferred payment method</span><span class="s">GCash &middot; ending in 7890</span></span>
          <span class="list-end">${ICONS.chevR}</span>
        </button>
      </div>
      <p class="footer-note">Preferences are saved automatically</p>
    </div>
  </div>`,
  };
};

/* ---------- NOTIFICATIONS ---------- */
SCREENS.notifications = () => ({
  html: `
  <div class="screen on-tint">
    ${backHeader("Notifications", state.unread ? `<button class="titlebar-action" data-readall>Mark all read</button>` : "")}
    <div class="pad after-bar">
      <div class="section-head" style="margin-top:6px"><h3>Today</h3></div>
      <div class="row-card">
        <div class="notif${state.unread ? " unread" : ""}">
          <span class="list-ic orange" style="width:38px;height:38px;border-radius:11px">${ICONS.calendar}</span>
          <span style="flex:1"><span class="t">Your October bill is ${dueLabel().toLowerCase()}</span><span class="s">Pay &#8369;${DATA.bill.amount} on or before ${DATA.bill.dueShort} to avoid late charges.</span><span class="time">9:00 AM</span></span>
          ${state.unread ? `<span class="unread-dot"></span>` : ""}
        </div>
        <div class="notif${state.unread ? " unread" : ""}">
          <span class="list-ic aqua" style="width:38px;height:38px;border-radius:11px">${ICONS.alert}</span>
          <span style="flex:1"><span class="t">Water interruption tomorrow in Sta. Lucia</span><span class="s">Service off from 9:00 AM to 3:00 PM for main line repairs.</span><span class="time">8:15 AM</span></span>
          ${state.unread ? `<span class="unread-dot"></span>` : ""}
        </div>
      </div>
      <div class="section-head"><h3>Earlier</h3></div>
      <div class="row-card">
        <div class="notif">
          <span class="list-ic green" style="width:38px;height:38px;border-radius:11px">${ICONS.checkC}</span>
          <span style="flex:1"><span class="t">Payment received &mdash; September bill</span><span class="s">&#8369;1,112.00 via GCash. Thank you!</span><span class="time">Oct 8</span></span>
        </div>
        <div class="notif">
          <span class="list-ic sky" style="width:38px;height:38px;border-radius:11px">${ICONS.advisory}</span>
          <span style="flex:1"><span class="t">New advisory: Pay your water bill with GCash</span><span class="s">Payments now post within minutes.</span><span class="time">Oct 12</span></span>
        </div>
        <div class="notif">
          <span class="list-ic" style="width:38px;height:38px;border-radius:11px">${ICONS.bill}</span>
          <span style="flex:1"><span class="t">Your October statement is ready</span><span class="s">Billing period Oct 1 &ndash; Oct 31, 2026.</span><span class="time">Oct 2</span></span>
        </div>
      </div>
      <p class="footer-note">Only alerts you enable in Settings appear here</p>
    </div>
  </div>`,
});

/* ---------- USAGE ---------- */
SCREENS.usage = () => {
  const vals = DATA.usage.map((d) => d.v);
  const max = Math.max(...vals), min = Math.min(...vals);
  const span = max - min || 1;
  const lvl = (v) => Math.round(((v - min) / span) * 100);
  const now = 10, prev = 13;
  const diff = ((now - prev) / prev) * 100;
  return {
    html: `
    <div class="screen on-tint">
      ${backHeader("Water Consumption")}
      <div class="pad after-bar">
        <div class="card card-dark">
          <div class="lbl" style="font-size:13px;font-weight:600;opacity:.85">October 2026 usage</div>
          <div style="font-size:40px;font-weight:800;letter-spacing:-1.2px;margin-top:4px">10 <span style="font-size:16px;opacity:.85">cu.m</span></div>
          <div class="mt-10"><span class="pill pill-glass"><span class="pdot" style="background:var(--aqua)"></span> ${Math.abs(diff).toFixed(0)}% less than last month</span></div>
          <div class="balance-meta" style="margin-top:12px">
            <span class="acct-no">Meter read: Oct 15, 2026 &middot; Previous: 4,204 cu.m</span>
          </div>
        </div>

        <div class="section-head"><h3>Last 6 months</h3></div>
        <div class="card">
          <div class="chart">
            ${DATA.usage.map((d, i) => `
              <div class="col ${i === DATA.usage.length - 1 ? "now" : ""}">
                <span class="vval">${d.v}</span>
                <div class="bar" style="height:${(d.v / max) * 100}px;--lvl:${lvl(d.v)}%"></div>
                <span class="mlbl">${d.m}</span>
              </div>`).join("")}
          </div>
          <p class="footer-note" style="margin-top:12px;text-align:left">Darker bars mean higher consumption &mdash; August was your peak.</p>
        </div>

        <div class="section-head"><h3>Billing breakdown</h3></div>
        <div class="card">
          <div class="utbl">
            <table>
              <thead>
                <tr>
                  <th>Bill date</th><th>Reading</th><th>Consumption</th>
                  <th>Bill amount</th><th>Septage fee</th><th>Penalty</th>
                </tr>
              </thead>
              <tbody>
                ${DATA.usage.map((d) => `
                <tr>
                  <td>${d.date}</td>
                  <td class="mut">${d.reading}</td>
                  <td>${d.v} cu.m</td>
                  <td>&#8369;${d.bill}</td>
                  <td class="mut">${d.septage === "0.00" ? "&mdash;" : "&#8369;" + d.septage}</td>
                  <td class="${d.penalty === "0.00" ? "mut" : "pen"}">${d.penalty === "0.00" ? "&mdash;" : "&#8369;" + d.penalty}</td>
                </tr>`).join("")}
              </tbody>
            </table>
          </div>
          <p class="footer-note" style="margin-top:12px">Swipe the table sideways to see all charges</p>
        </div>

        <div class="section-head"><h3>This month vs last month</h3></div>
        <div class="stat-grid">
          <div class="stat">
            <div class="sl">${ICONS.drop} October</div>
            <div class="sv">10 <span class="su">cu.m</span></div>
            <div class="su trend-down mt-4" style="margin-top:4px">&darr; 3 cu.m less</div>
          </div>
          <div class="stat">
            <div class="sl">${ICONS.drop} September</div>
            <div class="sv">13 <span class="su">cu.m</span></div>
            <div class="su" style="margin-top:4px">&nbsp;</div>
          </div>
          <div class="stat">
            <div class="sl">${ICONS.trend} 6-month average</div>
            <div class="sv">12.5 <span class="su">cu.m</span></div>
          </div>
          <div class="stat">
            <div class="sl">${ICONS.receipt} Est. consumption cost</div>
            <div class="sv">&#8369;980</div>
          </div>
        </div>

        <div class="section-head"><h3>Save water at home</h3></div>
        <div class="tip-card">
          ${ICONS.spark}
          <p><b>Conservation tip:</b> Fix dripping faucets and check your toilet for silent leaks. A single dripping tap can waste up to 2,000 liters per month.</p>
        </div>
        <p class="footer-note">Readings are taken monthly by PPCWD meter readers</p>
      </div>
    </div>`,
  };
};

/* ---------- HELP ---------- */
SCREENS.help = () => ({
  html: `
  <div class="screen on-tint">
    ${backHeader("Help & Support")}
    <div class="pad after-bar">
      <div class="card" style="text-align:center">
        <span class="list-ic" style="width:56px;height:56px;border-radius:17px;margin:0 auto">${ICONS.phone.replace("<svg", '<svg style="width:26px;height:26px"')}</span>
        <div style="font-weight:800;font-size:17px;margin-top:12px">24/7 Customer Hotline</div>
        <div style="font-size:22px;font-weight:800;color:#1764BC;margin-top:6px;letter-spacing:-.4px">(048) 726-3344</div>
        <div class="text-muted" style="margin-top:4px">For leaks, line breaks, and service concerns</div>
        <a class="btn btn-primary btn-block mt-14" href="tel:+63487263344">${ICONS.phone} Call now</a>
        <a class="btn btn-soft btn-block mt-10" href="mailto:customercare@ppcwd.gov.ph">${ICONS.mail} Email customercare@ppcwd.gov.ph</a>
      </div>

      <div class="section-head"><h3>Other ways to reach us</h3></div>
      <div class="row-card">
        <button class="list-row" data-toast="Business hours: Monday to Friday, 8:00 AM &ndash; 5:00 PM.">
          <span class="list-ic sky">${ICONS.clock}</span>
          <span class="list-body"><span class="t">Business office hours</span><span class="s">Mon&ndash;Fri, 8:00 AM &ndash; 5:00 PM</span></span>
          <span class="list-end">${ICONS.chevR}</span>
        </button>
        <button class="list-row" data-toast="Opening map&hellip;">
          <span class="list-ic aqua">${ICONS.globe}</span>
          <span class="list-body"><span class="t">Main office</span><span class="s">PPCWD Bldg., Liguian Ave., Puerto Princesa City</span></span>
          <span class="list-end">${ICONS.chevR}</span>
        </button>
      </div>

      <div class="section-head"><h3>Frequently asked questions</h3></div>
      ${HELP_FAQ.map((f) => `
        <div class="acc">
          <button class="acc-head" data-acc aria-expanded="false" style="padding:16px">
            <span class="acc-body-t"><span class="t" style="font-size:14px">${f.q}</span></span>
            <span class="acc-chev">${ICONS.chevD}</span>
          </button>
          <div class="acc-panel"><div class="acc-panel-inner" style="padding-top:12px">
            <p style="font-size:13.5px;line-height:1.6;color:#33415C;font-weight:500">${f.a}</p>
          </div></div>
        </div>`).join("")}
      <p class="footer-note">Still need help? Call us &mdash; we are happy to assist.</p>
    </div>
  </div>`,
});

/* ============================================================
   Router
   ============================================================ */
function render(screenKey, params, push = true) {
  if (!state.linked && !ONB_SCREENS.includes(screenKey)) screenKey = "welcome";
  if (state.linked && screenKey === "welcome") screenKey = "home";
  if (state.linked && screenKey === "setup" && state.setupContext !== "manage") screenKey = "home";
  if (!state.linked && screenKey === "setup" && state.setupContext === "manage") state.setupContext = "onboarding";
  const def = SCREENS[screenKey];
  if (!def) return;
  const changed = state.screen !== screenKey;
  const out = def(params);
  const phone = document.getElementById("phone-screen");
  const prevScroll = (phone.querySelector(".screen") || {}).scrollTop || 0;
  const bar = out.tab ? tabbar(out.tab) : "";
  const sheet = out.tab ? accountSheet() : "";
  phone.innerHTML = `${statusBar(!!out.blueStatus)}<div id="screen-mount" class="${bar ? "has-bar" : ""}" style="flex:1;display:flex;flex-direction:column;min-height:0">${out.html}</div>${bar}${sheet}<div class="home-indicator"></div>`;

  if (push && changed) {
    if (TAB_SCREENS.includes(screenKey)) state.stack = [];
    else state.stack.push(state.screen);
  }
  state.screen = screenKey;

  /* Re-renders used for filtering keep their scroll position; a real
     screen change starts at the top. */
  const sc = phone.querySelector(".screen");
  if (sc) sc.scrollTop = changed ? 0 : prevScroll;

  /* Collapsed accordion panels stay in the layout for the height
     animation, so keep them out of the tab order and the a11y tree. */
  phone.querySelectorAll(".acc").forEach((acc) => {
    const panel = acc.querySelector(".acc-panel");
    if (panel) panel.inert = !acc.classList.contains("open");
  });

  /* Tell assistive tech which screen just opened, and move keyboard
     focus to its title so the next Tab starts inside the screen. */
  const title = phone.querySelector(".success-wrap h2, .onb-head h3, .page-titlebar h2, .screen h2, .screen h1");
  const live = document.getElementById("app-live");
  const tabNames = { home: "Home", bills: "My Bills", payments: "Payments", advisories: "Advisories", account: "Account" };
  if (live && changed) live.textContent = out.tab ? tabNames[out.tab] : title ? title.textContent.trim() : "";
  if (changed && title) {
    title.setAttribute("tabindex", "-1");
    title.focus({ preventScroll: true });
  }
}

/* Delegated events */
document.addEventListener("click", (e) => {
  const sheetClose = e.target.closest("[data-sheet-close]");
  if (sheetClose) { closeAccountSheet(); return; }
  const openSheet = e.target.closest("[data-open-sheet]");
  if (openSheet) { openAccountSheet(); return; }
  const linkAcct = e.target.closest("[data-link-account]");
  if (linkAcct) {
    closeAccountSheet(false);
    startLinkAccount();
    return;
  }
  const acctRow = e.target.closest("[data-acct]");
  if (acctRow) {
    const acct = acctRow.dataset.acct;
    if (acct && acct !== state.activeAcct) {
      state.activeAcct = acct;
      closeAccountSheet(false);
      render(state.screen, null, false);
      const h = document.querySelector("#phone-screen .screen h2");
      if (h) {
        h.setAttribute("tabindex", "-1");
        h.focus({ preventScroll: true });
      }
      showToast(`Switched to ${acct}.`);
    }
    return;
  }
  const onbBtn = e.target.closest("[data-onb]");
  if (onbBtn) {
    const act = onbBtn.dataset.onb;
    if (act === "start") {
      state.setupContext = "onboarding";
      state.onbStep = "form";
      state.onbError = "";
      state.onbErrField = "";
      render("setup", null, false);
    } else if (act === "back") {
      state.onbStep = "form";
      state.onbError = "";
      state.onbErrField = "";
      render("welcome", null, false);
    } else if (act === "submit") {
      e.preventDefault();
      onbSubmit();
    } else if (act === "finish") {
      onbFinish();
    }
    return;
  }
  const onbMode = e.target.closest("[data-onbmode]");
  if (onbMode) {
    state.onbMode = onbMode.dataset.onbmode;
    state.onbStep = "form";
    state.onbError = "";
    state.onbErrField = "";
    state.onbValues = {};
    render("setup", null, false);
    return;
  }
  const accBtn = e.target.closest("[data-acc]");
  if (accBtn) {
    const open = accBtn.parentElement.classList.toggle("open");
    accBtn.setAttribute("aria-expanded", String(open));
    const panel = accBtn.parentElement.querySelector(".acc-panel");
    if (panel) panel.inert = !open;
    return;
  }
  const sw = e.target.closest("[data-switch]");
  if (sw) {
    const key = sw.dataset.switch;
    const on = !sw.classList.contains("on");
    sw.classList.toggle("on", on);
    sw.setAttribute("aria-checked", String(on));
    if (key in state.switches) state.switches[key] = on;
    if (key === "contrast" || key === "bigtext") {
      const phone = document.getElementById("phone-screen");
      if (phone) phone.classList.toggle(key === "contrast" ? "hc" : "lt", on);
      showToast(`${sw.getAttribute("aria-label")} ${on ? "on" : "off"}.`);
    }
    return;
  }
  const tabBtn = e.target.closest("[data-tab]");
  if (tabBtn) {
    render(tabBtn.dataset.tab);
    return;
  }
  const backBtn = e.target.closest("[data-back]");
  if (backBtn) {
    const prev = state.stack.pop() || "home";
    state.screen = prev;
    render(prev, null, false);
    return;
  }
  const navBtn = e.target.closest("[data-nav]");
  if (navBtn) {
    const id = navBtn.dataset.nav;
    render(id, { id: navBtn.dataset.id });
    return;
  }
  const billTab = e.target.closest("[data-billtab]");
  if (billTab) {
    state.billsTab = billTab.dataset.billtab;
    render("bills", null, false);
    return;
  }
  const advCat = e.target.closest("[data-advc]");
  if (advCat) {
    state.advFilter = advCat.dataset.advc;
    render("advisories", null, false);
    return;
  }
  const hFilter = e.target.closest("[data-hfilter]");
  if (hFilter) {
    state.historyFilter = hFilter.dataset.hfilter;
    state.billsTab = "history";
    render("bills", null, false);
    return;
  }
  if (e.target.closest("[data-clear-bills]")) {
    state.historyFilter = "All";
    state.historyQuery = "";
    render("bills", null, false);
    return;
  }
  if (e.target.closest("[data-readall]")) {
    state.unread = 0;
    render("notifications", null, false);
    showToast("All notifications marked as read.");
    return;
  }
  if (e.target.closest("[data-dialog-close]")) {
    closeSignOutDialog();
    return;
  }
  if (e.target.closest("[data-dialog-confirm]")) {
    closeSignOutDialog();
    signOut();
    return;
  }
  if (e.target.closest("[data-signout]")) {
    openSignOutDialog();
    return;
  }
  const toastBtn = e.target.closest("[data-toast]");
  if (toastBtn) showToast(toastBtn.dataset.toast);
});

/* Link accounts sheet */
let sheetTrigger = null;
function openAccountSheet() {
  const sheet = document.querySelector(".acct-sheet");
  if (!sheet) return;
  sheetTrigger = document.activeElement;
  sheet.hidden = false;
  sheet.inert = false;
  requestAnimationFrame(() => {
    sheet.classList.add("open");
    const close = sheet.querySelector("[data-sheet-close].icon-btn") || sheet.querySelector("[data-sheet-close]");
    if (close) close.focus({ preventScroll: true });
  });
}

function closeAccountSheet(restoreFocus = true) {
  const sheet = document.querySelector(".acct-sheet.open");
  if (!sheet) return;
  sheet.classList.remove("open");
  sheet.inert = true;
  setTimeout(() => { if (!sheet.classList.contains("open")) sheet.hidden = true; }, 280);
  if (restoreFocus && sheetTrigger && sheetTrigger.isConnected) {
    sheetTrigger.focus({ preventScroll: true });
  }
  sheetTrigger = null;
}

/* Sign-out confirmation — a real guard for a destructive action */
let dialogTrigger = null;
function openSignOutDialog() {
  const phone = document.getElementById("phone-screen");
  if (!phone || phone.querySelector(".dialog-sheet")) return;
  dialogTrigger = document.activeElement;
  const wrap = document.createElement("div");
  wrap.className = "dialog-sheet";
  wrap.innerHTML = `
    <button class="dialog-scrim" type="button" data-dialog-close aria-label="Cancel and close" tabindex="-1"></button>
    <div class="dialog-panel" role="dialog" aria-modal="true" aria-labelledby="signout-title" aria-describedby="signout-desc">
      <span class="dialog-icon" aria-hidden="true">${ICONS.logout}</span>
      <h3 id="signout-title">Sign out of PPCWD?</h3>
      <p id="signout-desc">You'll need your account and meter numbers to sign back in.</p>
      <div class="dialog-actions">
        <button class="btn btn-soft" type="button" data-dialog-close>Cancel</button>
        <button class="btn btn-danger" type="button" data-dialog-confirm>Sign out</button>
      </div>
    </div>`;
  phone.appendChild(wrap);
  requestAnimationFrame(() => {
    wrap.classList.add("open");
    const cancel = wrap.querySelector(".dialog-actions .btn-soft");
    if (cancel) cancel.focus({ preventScroll: true });
  });
}

function closeSignOutDialog() {
  const d = document.querySelector(".dialog-sheet");
  if (!d) return;
  d.classList.remove("open");
  d.inert = true;
  setTimeout(() => d.remove(), 200);
  if (dialogTrigger && dialogTrigger.isConnected) dialogTrigger.focus({ preventScroll: true });
  dialogTrigger = null;
}

function signOut() {
  state.linked = false;
  state.accounts = [{
    acct: DATA.customer.acct,
    label: "Home",
    address: DATA.customer.address,
    type: DATA.customer.type,
    primary: true,
  }];
  state.activeAcct = DATA.customer.acct;
  state.stack = [];
  state.setupContext = "onboarding";
  state.onbStep = "form";
  state.onbError = "";
  state.onbErrField = "";
  state.onbValues = {};
  state.onbToken++;
  state.unread = 2;
  state.billsTab = "current";
  state.historyFilter = "All";
  state.historyQuery = "";
  state.advFilter = "All";
  state.advQuery = "";
  render("welcome", null, false);
  showToast("You've been signed out.");
}

document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  closeSignOutDialog();
  closeAccountSheet();
});

/* Keep Tab inside an open modal layer (the account sheet or the sign-out
   dialog) so keyboard users cannot reach the screen behind it. */
document.addEventListener("keydown", (e) => {
  if (e.key !== "Tab") return;
  const layer = document.querySelector(".dialog-sheet.open") || document.querySelector(".acct-sheet.open");
  if (!layer) return;
  const items = [...layer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
    .filter((el) => !el.disabled && el.offsetParent !== null);
  if (!items.length) return;
  const first = items[0];
  const last = items[items.length - 1];
  if (e.shiftKey && (document.activeElement === first || !layer.contains(document.activeElement))) {
    e.preventDefault();
    last.focus();
  } else if (!e.shiftKey && (document.activeElement === last || !layer.contains(document.activeElement))) {
    e.preventDefault();
    first.focus();
  }
});

/* Submitting the onboarding form with Enter must run the same validation
   as the button instead of reloading the page. */
document.addEventListener("submit", (e) => {
  if (!e.target.closest("#onb-form")) return;
  e.preventDefault();
  onbSubmit();
});

/* Live search on the Bills history and Advisory archive screens.
   Re-rendering keeps the state in one place, then focus and caret are
   restored so typing is not interrupted. */
document.addEventListener("input", (e) => {
  const field = e.target.closest("[data-search]");
  if (!field) return;
  const key = field.dataset.search;
  state[key] = field.value;
  render(state.screen, null, false);
  const next = document.querySelector(`[data-search="${key}"]`);
  if (next) {
    next.focus({ preventScroll: true });
    const end = next.value.length;
    if (next.setSelectionRange) next.setSelectionRange(end, end);
  }
});

/* Onboarding helpers */
document.addEventListener("submit", (e) => {
  if (e.target && e.target.id === "onb-form") {
    e.preventDefault();
    onbSubmit();
  }
});

function setupFields(m) {
  if (state.setupContext !== "manage") return m.fields;
  return [...m.fields, { k: "nick", label: "Account label (optional)", ph: "e.g. Home, Sari-sari store", im: "text" }];
}

function onbValidate(values, mode) {
  const digits = (s) => (s || "").replace(/\D/g, "");
  if (mode === "open") {
    if ((values.name || "").trim().length < 3) {
      return { k: "name", msg: "Enter the applicant's full name (at least 3 letters)." };
    }
    const mobile = digits(values.mobile);
    if (!mobile) return { k: "mobile", msg: "Enter your mobile number, e.g. 0917 123 4567." };
    if (!/^09\d{9}$/.test(mobile)) {
      return { k: "mobile", msg: `A mobile number has 11 digits and starts with 09 — you entered ${mobile.length}.` };
    }
    if ((values.addr || "").trim().length < 6) {
      return { k: "addr", msg: "Add the barangay and street so our crew can find the service address." };
    }
    return null;
  }
  const acct = digits(values.acct);
  if (!acct) return { k: "acct", msg: "Enter the account number printed on your bill." };
  if (acct.length < 6) {
    return { k: "acct", msg: `Account numbers have at least 6 digits — you entered ${acct.length}.` };
  }
  if ((values.meter || "").trim().length < 3) {
    return { k: "meter", msg: "Enter the meter number printed on your bill, e.g. MTR-0098213." };
  }
  return null;
}

function focusField(k) {
  const el = document.querySelector(`#onb-form [name="${k}"]`);
  if (el) el.focus();
}

function onbSubmit() {
  const m = ONB_MODES[state.onbMode] || ONB_MODES.link;
  const form = document.getElementById("onb-form");
  if (!form) return;
  const values = {};
  setupFields(m).forEach((f) => {
    const el = form.querySelector(`[name="${f.k}"]`);
    values[f.k] = el ? el.value.trim() : "";
  });
  state.onbValues = values;
  const err = onbValidate(values, state.onbMode);
  if (err) {
    state.onbError = err.msg;
    state.onbErrField = err.k;
    render("setup", null, false);
    focusField(err.k);
    return;
  }
  if (state.setupContext === "manage") {
    const key = (s) => String(s || "").replace(/\D/g, "");
    if (state.accounts.some((a) => key(a.acct) === key(values.acct))) {
      state.onbError = "This account is already linked to your profile.";
      state.onbErrField = "acct";
      render("setup", null, false);
      focusField("acct");
      return;
    }
  }
  state.onbError = "";
  state.onbErrField = "";
  state.onbStep = "verify";
  render("setup", null, false);

  const token = ++state.onbToken;
  setTimeout(() => {
    if (token !== state.onbToken) return;
    state.onbStep = "success";
    render("setup", null, false);
    setTimeout(() => {
      if (state.setupContext !== "onboarding") return;
      if (token !== state.onbToken || state.linked) return;
      onbFinish();
    }, 2800);
  }, 1500);
}

function startLinkAccount() {
  state.setupContext = "manage";
  state.onbMode = "link";
  state.onbStep = "form";
  state.onbError = "";
  state.onbErrField = "";
  state.onbValues = {};
  render("setup");
}

function onbFinish() {
  state.onbToken++;
  state.onbStep = "form";
  state.onbError = "";
  state.onbErrField = "";
  if (state.setupContext === "manage") {
    const v = state.onbValues || {};
    const acct = (v.acct || "").trim();
    const key = (s) => String(s || "").replace(/\D/g, "");
    state.setupContext = "onboarding";
    state.stack = [];
    if (state.accounts.some((a) => key(a.acct) === key(acct))) {
      render("account", null, false);
      showToast("That account is already linked.");
      return;
    }
    state.accounts.push({
      acct,
      label: (v.nick || "").trim() || `Account ${state.accounts.length + 1}`,
      address: DATA.customer.address,
      type: "Residential",
      primary: false,
    });
    state.activeAcct = acct;
    render("account", null, false);
    showToast(`${acct} linked and set as active.`);
    return;
  }
  state.linked = true;
  state.stack = [];
  render("home", null, false);
  showToast(state.onbMode === "open" ? "Application received. We'll contact you soon." : "Welcome to PPCWD, Maria!");
}

function showToast(msg) {
  const phone = document.getElementById("phone-screen");
  if (!phone) return;
  const old = phone.querySelector(".toast");
  if (old) old.remove();
  const t = document.createElement("div");
  t.className = "toast";
  t.setAttribute("aria-hidden", "true");
  t.innerHTML = `${ICONS.checkC}<span>${msg}</span>`;
  phone.appendChild(t);
  /* Announce through the persistent live region; the visual toast is
     hidden from assistive tech so the message is not read twice. */
  const live = document.getElementById("app-live");
  if (live) live.textContent = msg;
  requestAnimationFrame(() => t.classList.add("show"));
  setTimeout(() => {
    t.classList.remove("show");
    setTimeout(() => t.remove(), 300);
  }, 2200);
}

/* ============================================================
   Gallery mode (static all-screens overview)
   ============================================================ */
const GALLERY = [
  ["welcome", "1. Welcome", "Brand intro & onboarding entry point"],
  ["setup", "2. Account Setup", "Link, add, or open a water service account"],
  ["home", "3. Home Dashboard", "Balance card, quick actions, advisory & usage"],
  ["bills", "4. Bills — Current", "Bill summary, breakdown, pay & download"],
  ["bills-history", "5. Bills — History", "Searchable records with month filters"],
  ["bill-detail", "6. Statement of Account", "Full statement details"],
  ["payments", "7. Payments", "GCash primary + partner accordions"],
  ["gcash-guide", "8. GCash Payment Guide", "Step-by-step instructions"],
  ["payment-success", "9. Payment Confirmation", "Manual mark as paid"],
  ["advisories", "10. Advisories", "Categories, featured card, list"],
  ["advisory-detail", "11. Advisory Details", "Affected areas & full article"],
  ["advisory-archive", "12. Advisory Archive", "Past advisories"],
  ["usage", "13. Water Consumption", "Trends & month comparison"],
  ["notifications", "14. Notifications", "Due dates, billing & advisories"],
  ["account", "15. Account", "Customer info, linked accounts, settings"],
  ["settings", "16. Settings & Preferences", "Notifications & accessibility"],
  ["help", "17. Help & Support", "Call, email, FAQ accordions"],
];

function buildGallery() {
  const wrap = document.getElementById("gallery");
  wrap.innerHTML = GALLERY.map(([key, title, sub]) => {
    let out;
    if (key === "bills-history") {
      state.billsTab = "history";
      out = SCREENS.bills();
      state.billsTab = "current";
    } else if (key === "setup") {
      const saved = { mode: state.onbMode, step: state.onbStep, err: state.onbError, errField: state.onbErrField, vals: state.onbValues };
      state.onbMode = "link";
      state.onbStep = "form";
      state.onbError = "";
      state.onbErrField = "";
      state.onbValues = {};
      out = SCREENS.setup();
      state.onbMode = saved.mode;
      state.onbStep = saved.step;
      state.onbError = saved.err;
      state.onbErrField = saved.errField;
      state.onbValues = saved.vals;
    } else {
      out = SCREENS[key]();
    }
    return `
    <div class="gallery-item">
      <div class="caption"><h3>${title}</h3><p>${sub}</p></div>
      <div class="phone">
        <div class="notch"></div>
        <div class="phone-screen">
          ${statusBar(false)}
          ${out.html}
          ${out.tab ? tabbar(out.tab) : ""}
          ${out.tab ? accountSheet() : ""}
          <div class="home-indicator"></div>
        </div>
      </div>
    </div>`;
  }).join("");
}

/* ============================================================
   View toggle + boot
   ============================================================ */
document.addEventListener("click", (e) => {
  const vt = e.target.closest("[data-view]");
  if (!vt) return;
  document.querySelectorAll("[data-view]").forEach((b) => {
    const on = b === vt;
    b.classList.toggle("active", on);
    b.setAttribute("aria-pressed", String(on));
  });
  const isProto = vt.dataset.view === "proto";
  document.getElementById("proto-view").hidden = !isProto;
  document.getElementById("gallery-view").hidden = isProto;
});

/* Keep the screen counts in the page chrome truthful. */
document.querySelector('[data-view="gallery"]').textContent = `All ${GALLERY.length} screens`;
document.querySelector("#gallery-view .stage-note").innerHTML =
  `Complete screen inventory &mdash; <b>${GALLERY.length} high-fidelity screens</b> covering onboarding and all core features.`;

document.getElementById("phone-shell").innerHTML = `<div class="phone"><div class="notch"></div><div class="phone-screen" id="phone-screen"></div></div>`;
render("welcome", null, false);
buildGallery();
