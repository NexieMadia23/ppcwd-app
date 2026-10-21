/* ============================================================
   PPCWD Mobile App — Prototype engine
   Vanilla JS screen router + all screen templates
   ============================================================ */

/* ---------------- Icons (inline SVG, stroke style) ---------------- */
const I = (p, extra = "") => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" ${extra}>${p}</svg>`;
const ICONS = {
  home: I('<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>'),
  bill: I('<path d="M6 2h9l5 5v13.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 6 20.5Z"/><path d="M14 2v5h5"/><path d="M9 13h6M9 17h4"/>'),
  pay: I('<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M2.5 10h19"/><path d="M6 15h4"/>'),
  mega: I('<path d="M3 11v2a1 1 0 0 0 1 1h3l7 4.5V6.5L7 11H4a1 1 0 0 0-1 0Z"/><path d="M18 9.5a3.5 3.5 0 0 1 0 5"/><path d="M20.5 7a7 7 0 0 1 0 10"/>'),
  user: I('<circle cx="12" cy="8" r="4"/><path d="M4.5 20.5a7.5 7.5 0 0 1 15 0"/>'),
  bell: I('<path d="M6 9a6 6 0 0 1 12 0c0 4.5 1.5 6 1.5 6h-15S6 13.5 6 9Z"/><path d="M10 19a2 2 0 0 0 4 0"/>'),
  chevR: I('<path d="m9 5 7 7-7 7"/>'),
  chevD: I('<path d="m5 9 7 7 7-7"/>'),
  chevL: I('<path d="m15 5-7 7 7 7"/>'),
  search: I('<circle cx="11" cy="11" r="7"/><path d="m20 20-3.2-3.2"/>'),
  download: I('<path d="M12 3v12"/><path d="m7 11 5 5 5-5"/><path d="M4 20h16"/>'),
  calendar: I('<rect x="3" y="5" width="18" height="16" rx="2.5"/><path d="M3 10h18M8 3v4M16 3v4"/>'),
  phone: I('<path d="M5 3.5h3.5L10.5 8 8 10a12 12 0 0 0 6 6l2-2.5 4.5 2V19a2 2 0 0 1-2 2A16.5 16.5 0 0 1 3 5.5a2 2 0 0 1 2-2Z"/>'),
  mail: I('<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="m3.5 7 8.5 6 8.5-6"/>'),
  clock: I('<circle cx="12" cy="12" r="9"/><path d="M12 7v5.5l3.5 2"/>'),
  drop: I('<path d="M12 3s6.5 7 6.5 11a6.5 6.5 0 0 1-13 0C5.5 10 12 3 12 3Z"/>'),
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
};

/* ---------------- Data ---------------- */
const DATA = {
  customer: { name: "Maria Santos", first: "Maria", initials: "MS", acct: "0012-3456-7890", address: "Brgy. Sta. Lucia, Puerto Princesa City", type: "Residential" },
  bill: {
    amount: "1,247.50", due: "November 10, 2026", dueShort: "Nov 10, 2026",
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
    { m: "May", v: 12 }, { m: "Jun", v: 14 }, { m: "Jul", v: 11 },
    { m: "Aug", v: 15 }, { m: "Sep", v: 13 }, { m: "Oct", v: 10 },
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
  ],
};

const HELP_FAQ = [
  { q: "How is my water bill computed?", a: "Your bill combines your water consumption (in cubic meters, based on your meter reading), a monthly service charge, and an environmental charge. Rates per cubic meter follow the tiered domestic rate schedule approved by the Local Water Utilities Administration (LWUA)." },
  { q: "When is my bill due?", a: "Bills are issued monthly and are due on the 10th of the following month. Paying on or before the due date avoids late payment surcharges." },
  { q: "I paid but my balance is still showing. What do I do?", a: "GCash payments post within minutes, while over-the-counter partner payments may take up to 24 hours to reflect. If 24 hours have passed, send your reference number to our email or call our hotline so we can trace your payment." },
  { q: "My water pressure is low. What should I check?", a: "Check the Advisories tab first for scheduled interruptions in your area. If there is no advisory, verify that your own faucet and service valve are open, then report the concern through our hotline." },
  { q: "How do I update my contact details?", a: "Go to Account, tap Personal Information, then Update Details. Keeping your mobile number current ensures you receive billing and advisory alerts." },
];

/* ---------------- State ---------------- */
const state = {
  screen: "home",
  stack: [],
  billsTab: "current",
  advFilter: "All",
  historyFilter: "All",
};

const TAB_SCREENS = ["home", "bills", "payments", "advisories", "account"];

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
    ["advisories", "Advisories", ICONS.mega],
    ["account", "Account", ICONS.user],
  ];
  return `<nav class="tabbar">${tabs.map(([id, label, ic]) => `
    <button data-tab="${id}" class="${active === id ? "active" : ""}">
      <span class="tab-ic">${ic}</span><span class="tl">${label}</span>
    </button>`).join("")}</nav>`;
};

const backHeader = (title, action = "") => `
  <div class="page-titlebar">
    <button class="back-btn" data-back>${ICONS.chevL}</button>
    <h2>${title}</h2>
    ${action}
  </div>`;

/* ============================================================
   SCREENS
   Each returns { tab?, blueStatus?, html }
   ============================================================ */
const SCREENS = {};

/* ---------- HOME ---------- */
SCREENS.home = () => ({
  tab: "home",
  html: `
  <div class="screen">
    <div class="app-header">
      <div class="hello">
        <small>Magandang araw,</small>
        <h2>${DATA.customer.name}</h2>
      </div>
      <button class="icon-btn" data-nav="notifications" aria-label="Notifications, 3 unread">
        ${ICONS.bell}<span class="badge">3</span>
      </button>
    </div>

    <div class="pad">
      <!-- Balance hero -->
      <section class="balance-card">
        <div class="balance-top">
          <div class="bt-left">
            <div class="lbl">Current balance</div>
            <div class="balance-amount">&#8369;${DATA.bill.amount}</div>
          </div>
          <span class="pill pill-glass"><span class="pdot"></span> Service Active</span>
        </div>
        <div class="balance-meta">
          <span class="pill pill-countdown">${ICONS.clock.replace("<svg", '<svg style="width:13px;height:13px"')} Due in 20 days</span>
          <span class="pill pill-glass">${ICONS.calendar.replace("<svg", '<svg style="width:13px;height:13px"')} ${DATA.bill.dueShort}</span>
        </div>
        <div class="balance-foot">
          <span class="acct-no">Account ${DATA.customer.acct}</span>
        </div>
        <div class="balance-actions">
          <button class="btn btn-aqua" data-nav="payments">${ICONS.pay} Pay Now</button>
          <button class="btn btn-white" data-nav="bill-detail">${ICONS.bill} View Bill</button>
        </div>
      </section>

      <!-- Quick actions -->
      <div class="quick-actions">
        <button class="qa" data-nav="payments"><span class="qa-ic">${ICONS.wallet}</span><span>Pay Bill</span></button>
        <button class="qa" data-nav="bills"><span class="qa-ic">${ICONS.bill}</span><span>My Bills</span></button>
        <button class="qa" data-nav="usage"><span class="qa-ic">${ICONS.drop}</span><span>My Usage</span></button>
        <button class="qa" data-nav="help"><span class="qa-ic">${ICONS.help}</span><span>Get Help</span></button>
      </div>

      <!-- Advisory preview -->
      <div class="section-head">
        <h3>Latest advisory</h3>
        <button class="link" data-tab="advisories">View all ${ICONS.chevR}</button>
      </div>
      <button class="adv-preview" data-nav="advisory-detail" data-id="a1">
        <span class="adv-preview-top">
          <span class="chip chip-orange"><span class="cd"></span> Service Interruption</span>
          <span class="adv-date">${DATA.advisories[0].date}</span>
        </span>
        <span class="adv-preview-title">${DATA.advisories[0].title}</span>
        <span class="adv-preview-more">Read More ${ICONS.chevR}</span>
      </button>

      <!-- Usage snapshot -->
      <div class="section-head">
        <h3>Water consumption</h3>
        <button class="link" data-nav="usage">Details ${ICONS.chevR}</button>
      </div>
      <div class="card">
        <div style="display:flex;align-items:center;justify-content:space-between">
          <div>
            <div class="text-muted" style="font-weight:700">This month</div>
            <div style="font-size:26px;font-weight:800;letter-spacing:-.6px;margin-top:2px">10 <span style="font-size:14px;color:var(--muted)">cu.m</span></div>
          </div>
          <span class="chip chip-green"><span class="cd"></span> 3 cu.m less than September</span>
        </div>
        ${miniChart()}
      </div>

      <p class="footer-note">PPCWD Customer App &middot; Serving Puerto Princesa City since 1974</p>
    </div>
    <div class="after-tabs" style="height:8px"></div>
  </div>
  ${tabbar("home")}`,
});

function miniChart() {
  const max = 16;
  return `<div class="chart" style="height:110px;margin-top:14px">${DATA.usage.map((d, i) => `
    <div class="col ${i === DATA.usage.length - 1 ? "now" : ""}">
      <span class="vval">${d.v}</span>
      <div class="bar" style="height:${(d.v / max) * 78}px"></div>
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
      <button class="icon-btn" data-nav="notifications">${ICONS.bell}</button>
    </div>
    <div class="pad">
      <div class="seg">
        <button data-billtab="current" class="${state.billsTab === "current" ? "active" : ""}">Current Bill</button>
        <button data-billtab="history" class="${state.billsTab === "history" ? "active" : ""}">Billing History</button>
      </div>
      ${state.billsTab === "current" ? billsCurrent() : billsHistory()}
    </div>
    <div class="after-tabs" style="height:20px"></div>
  </div>
  ${tabbar("bills")}`,
});

function billsCurrent() {
  return `
  <div class="mt-16 card">
    <div class="bill-hero">
      <span class="period">${DATA.bill.period} &middot; Statement</span>
      <span class="amount">&#8369;${DATA.bill.amount}</span>
      <span class="sub">Due on or before <b style="color:var(--orange)">${DATA.bill.due}</b></span>
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
      <div class="sv" style="font-size:14px;margin-top:9px">2026-10-7890</div>
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
  return `
  <div class="mt-14 search-field">
    ${ICONS.search}
    <input type="text" placeholder="Search by month or reference no." />
  </div>
  <div class="filter-scroll mt-12">
    ${filters.map((f) => `<button class="fchip ${state.historyFilter === f ? "active" : ""}" data-hfilter="${f}">${f === "All" ? "All months" : f}</button>`).join("")}
    <button class="fchip">${ICONS.calendar.replace("<svg", '<svg style="width:14px;height:14px;vertical-align:-2px;margin-right:4px"')} Pick date</button>
  </div>
  <div class="row-card mt-14">
    ${DATA.history.map((h) => `
      <button class="list-row" data-nav="bill-detail">
        <span class="list-ic">${ICONS.receipt}</span>
        <span class="list-body">
          <span class="t">${h.period}</span>
          <span class="s">${h.date}</span>
        </span>
        <span class="list-end">
          <span style="text-align:right">
            <span class="amt">&#8369;${h.amt}</span>
            <span style="display:block;margin-top:4px"><span class="chip ${h.chip}"><span class="cd"></span>${h.status}</span></span>
          </span>
          ${ICONS.chevR}
        </span>
      </button>`).join("")}
  </div>
  <p class="footer-note">Showing 6 of 24 billing records</p>`;
}

/* ---------- BILL DETAIL (Statement of Account) ---------- */
SCREENS["bill-detail"] = () => ({
  html: `
  <div class="screen on-tint">
    ${backHeader("Statement of Account", `<button class="icon-btn" data-toast="Statement downloaded to your device.">${ICONS.download}</button>`)}
    <div class="pad after-bar">
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div>
            <div class="text-muted" style="font-weight:700">Account name</div>
            <div style="font-weight:800;font-size:15.5px;margin-top:2px">${DATA.customer.name}</div>
            <div class="text-muted mt-4" style="margin-top:4px">Acct no. ${DATA.customer.acct}</div>
          </div>
          <span class="chip chip-orange"><span class="cd"></span> Unpaid</span>
        </div>
        <div class="bill-divider"></div>
        <div class="kv"><span class="k">Billing period</span><span class="v">${DATA.bill.period}</span></div>
        <div class="kv"><span class="k">Meter reading</span><span class="v">04,213 cu.m</span></div>
        <div class="kv"><span class="k">Consumption</span><span class="v">10 cu.m</span></div>
        <div class="kv"><span class="k">Due date</span><span class="v" style="color:var(--orange)">${DATA.bill.dueShort}</span></div>
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
      <section class="balance-card" style="background:linear-gradient(140deg,rgba(255,255,255,.16),rgba(255,255,255,.05)),linear-gradient(140deg,#0A3584,#1764BC 55%,#30B3DD)">
        <div class="balance-top">
          <div>
            <div class="lbl">Recommended &middot; Instant posting</div>
            <div style="font-size:25px;font-weight:800;margin-top:8px;letter-spacing:-.5px">Pay with GCash</div>
          </div>
          <span class="acc-logo l-gcash" style="width:52px;height:52px;font-size:14px;border-radius:15px">GCash</span>
        </div>
        <p style="font-size:13px;opacity:.9;margin-top:10px;line-height:1.5">No extra fees. Your payment reflects on your account within minutes.</p>
        <div class="balance-actions">
          <button class="btn btn-aqua" data-nav="gcash-guide">${ICONS.send} Start payment guide</button>
        </div>
      </section>

      <div class="section-head"><h3>How to pay with GCash</h3></div>
      <div class="card">
        <ol class="steps">
          <li><span class="n"></span> Open your GCash app and log in.</li>
          <li><span class="n"></span> Tap <b>Pay Bills</b>, then choose <b>Water Utility</b>.</li>
          <li><span class="n"></span> Select <b>PPCWD</b> as the biller.</li>
          <li><span class="n"></span> Enter your account number <b>${DATA.customer.acct}</b> and the amount due.</li>
          <li><span class="n"></span> Confirm, then keep the GCash reference number for your records.</li>
        </ol>
        <div class="need-box">
          <div class="nb-t">${ICONS.info} You will need</div>
          <p>Account number (${DATA.customer.acct}) &middot; Account name (${DATA.customer.name}) &middot; Amount due (&#8369;${DATA.bill.amount})</p>
        </div>
      </div>

      <!-- Other partners -->
      <div class="section-head"><h3>Other payment partners</h3></div>
      <p class="text-muted" style="margin-bottom:12px">Pay over the counter at any partner near you. Tap a partner to see the steps.</p>

      <div class="acc">
        <button class="acc-head" data-acc>
          <span class="acc-logo l-palawan">Palawan</span>
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
        <button class="acc-head" data-acc>
          <span class="acc-logo l-ecpay">ECPay</span>
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
        <button class="acc-head" data-acc>
          <span class="acc-logo l-sm">SM</span>
          <span class="acc-body-t"><span class="t">SM Bills Pay</span><span class="s">Any SM Business Center or cashier</span></span>
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
        <button class="acc-head" data-acc>
          <span class="acc-logo l-ml">ML</span>
          <span class="acc-body-t"><span class="t">MLhuillier</span><span class="s">Kwarta Padala branches nationwide</span></span>
          <span class="acc-chev">${ICONS.chevD}</span>
        </button>
        <div class="acc-panel"><div class="acc-panel-inner">
          <ol class="steps">
            <li><span class="n"></span> Go to any MLhuillier branch.</li>
            <li><span class="n"></span> Fill out the <b>Bills Payment</b> form and write PPCWD as the biller.</li>
            <li><span class="n"></span> Provide your account number and pay the amount due in cash.</li>
            <li><span class="n"></span> Verify the details printed on your ML receipt before leaving.</li>
          </ol>
          <div class="need-box"><div class="nb-t">${ICONS.info} Required information</div>
            <p>Account name &middot; Account number &middot; Amount due &middot; Contact number</p></div>
        </div></div>
      </div>

      <div class="acc">
        <button class="acc-head" data-acc>
          <span class="acc-logo l-ussc">USSC</span>
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
      <p class="footer-note">Payments posted within 24 hours &middot; Office hours 8:00 AM &ndash; 5:00 PM</p>
    </div>
    <div class="after-tabs" style="height:16px"></div>
  </div>
  ${tabbar("payments")}`,
});

/* ---------- GCASH GUIDE ---------- */
SCREENS["gcash-guide"] = () => ({
  html: `
  <div class="screen on-tint">
    ${backHeader("Pay with GCash")}
    <div class="pad after-bar">
      <div class="card" style="text-align:center;padding:22px">
        <span class="acc-logo l-gcash" style="width:64px;height:64px;font-size:16px;border-radius:19px;margin:0 auto">GCash</span>
        <div class="text-muted mt-12" style="font-weight:700">Amount to pay</div>
        <div style="font-size:34px;font-weight:800;letter-spacing:-1px;margin-top:4px">&#8369;${DATA.bill.amount}</div>
        <div class="mt-10"><span class="chip chip-blue"><span class="cd"></span> ${DATA.bill.period} bill &middot; Due ${DATA.bill.dueShort}</span></div>
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
              <p>Account number: <b>${DATA.customer.acct}</b><br>Account name: <b>${DATA.customer.name}</b><br>Amount: <b>&#8369;${DATA.bill.amount}</b><br> Email (optional): for your digital receipt</p>
            </div>
          </li>
        </ol>
      </div>

      <div class="mt-14 verified-banner">
        ${ICONS.clock}
        <p>GCash payments post to your PPCWD account within minutes. Your balance in the app updates automatically.</p>
      </div>

      <button class="btn btn-primary btn-block mt-16" data-nav="payment-success">${ICONS.send} I have paid &mdash; mark as paid</button>
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
      <h2 style="font-size:22px;font-weight:800">Payment recorded</h2>
      <p class="text-muted mt-8" style="max-width:280px">Thank you! Your GCash payment is being verified and will post to your account within minutes.</p>

      <div class="card mt-20" style="width:100%;text-align:left">
        <div class="kv"><span class="k">Amount paid</span><span class="v">&#8369;${DATA.bill.amount}</span></div>
        <div class="kv"><span class="k">Biller</span><span class="v">PPCWD</span></div>
        <div class="kv"><span class="k">Account no.</span><span class="v">${DATA.customer.acct}</span></div>
        <div class="kv"><span class="k">Billing period</span><span class="v">${DATA.bill.period}</span></div>
        <div class="kv"><span class="k">Date paid</span><span class="v">Oct 21, 2026 &middot; 9:41 AM</span></div>
        <div class="bill-divider"></div>
        <div class="kv total"><span class="k">Reference no.</span><span class="v" style="font-size:14px">GCASH-8F42K91L</span></div>
      </div>

      <div class="mt-16" style="display:flex;gap:10px;width:100%">
        <button class="btn btn-outline btn-sm" style="flex:1" data-toast="Receipt saved to your device.">${ICONS.download} Save receipt</button>
        <button class="btn btn-outline btn-sm" style="flex:1" data-toast="Share sheet opened.">${ICONS.share} Share</button>
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
        <div class="mt-14 adv-feature" data-nav="advisory-detail" data-id="${featured.id}">
          <span class="cat">${ICONS.alert.replace("<svg", '<svg style="width:13px;height:13px"')} ${featured.cat}</span>
          <h4>${featured.title}</h4>
          <p>${featured.excerpt}</p>
          <div class="meta">${ICONS.calendar.replace("<svg", '<svg style="width:14px;height:14px"')} ${featured.date}</div>
        </div>` : `<div class="mt-14 card text-muted" style="text-align:center">No advisories in this category.</div>`}

        ${rest.length ? `
        <div class="section-head"><h3>Recent advisories</h3><button class="link" data-nav="advisory-archive">Archive ${ICONS.chevR}</button></div>
        <div class="row-card">
          ${rest.map((a) => `
            <button class="adv-item" data-nav="advisory-detail" data-id="${a.id}">
              <span class="adv-bar ${a.color === "sky" ? "" : a.color}"></span>
              <span style="flex:1">
                <span class="t">${a.title}</span>
                <span class="s"><span class="chip chip-${a.color === "sky" ? "blue" : a.color === "aqua" ? "aqua" : "orange"}">${a.cat}</span> ${a.date}</span>
              </span>
              <span class="list-end">${ICONS.chevR}</span>
            </button>`).join("")}
        </div>` : ""}

        <p class="footer-note">Advisories are posted by PPCWD Information Office</p>
      </div>
      <div class="after-tabs" style="height:16px"></div>
    </div>
    ${tabbar("advisories")}`,
  };
};

SCREENS["advisory-archive"] = () => ({
  html: `
  <div class="screen on-tint">
    ${backHeader("Advisory Archive")}
    <div class="pad after-bar">
      <div class="search-field">${ICONS.search}<input placeholder="Search past advisories" /></div>
      <div class="section-head"><h3>2025 &amp; earlier</h3></div>
      <div class="row-card">
        ${DATA.advisories.filter((a) => a.archive).map((a) => `
          <button class="adv-item" data-nav="advisory-detail" data-id="${a.id}">
            <span class="adv-bar ${a.color === "sky" ? "" : a.color}"></span>
            <span style="flex:1">
              <span class="t">${a.title}</span>
              <span class="s">${a.date} &middot; Archived</span>
            </span>
            <span class="list-end">${ICONS.chevR}</span>
          </button>`).join("")}
        <button class="adv-item" data-nav="advisory-detail" data-id="a6">
          <span class="adv-bar green"></span>
          <span style="flex:1"><span class="t">Water quality report: 3rd quarter results</span><span class="s">August 30, 2025 &middot; Archived</span></span>
          <span class="list-end">${ICONS.chevR}</span>
        </button>
      </div>
      <p class="footer-note">Advisories older than 2 years are available upon request</p>
    </div>
  </div>`,
});

SCREENS["advisory-detail"] = (params) => {
  const a = DATA.advisories.find((x) => x.id === (params && params.id)) || DATA.advisories[0];
  return {
    html: `
    <div class="screen on-tint">
      ${backHeader("Advisory", `<button class="icon-btn" data-toast="Advisory shared.">${ICONS.share}</button>`)}
      <div class="pad after-bar">
        <div class="card">
          <span class="chip chip-${a.color === "sky" ? "blue" : a.color === "aqua" ? "aqua" : "orange"}"><span class="cd"></span>${a.cat}</span>
          <h3 style="font-size:19px;font-weight:800;line-height:1.35;margin-top:12px;letter-spacing:-.3px">${a.title}</h3>
          <div style="display:flex;align-items:center;gap:7px;color:var(--muted);font-size:12.5px;font-weight:600;margin-top:10px">
            ${ICONS.clock.replace("<svg", '<svg style="width:15px;height:15px"')} ${a.date} &middot; PPCWD Information Office
          </div>
          ${a.areas.length ? `
          <div class="bill-divider"></div>
          <div class="text-muted" style="font-weight:700;margin-bottom:8px">Affected areas</div>
          <div style="display:flex;gap:8px;flex-wrap:wrap">${a.areas.map((ar) => `<span class="chip chip-gray">${ar}</span>`).join("")}</div>` : ""}
        </div>

        <div class="card mt-14">
          ${a.body.split("\n\n").map((p) => `<p style="font-size:14px;line-height:1.65;color:var(--ink-2);font-weight:500;margin-bottom:12px">${p}</p>`).join("").replace(/margin-bottom:12px$/, "")}
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
    <div class="page-titlebar"><h2>Account</h2></div>
    <div class="pad">
      <div class="card" style="display:flex;align-items:center;gap:14px">
        <span class="avatar" style="width:56px;height:56px;font-size:19px">${DATA.customer.initials}</span>
        <div style="flex:1">
          <div style="font-weight:800;font-size:17px">${DATA.customer.name}</div>
          <div class="text-muted" style="margin-top:2px">Acct no. ${DATA.customer.acct}</div>
          <div class="mt-8"><span class="chip chip-green"><span class="cd"></span> Service Active</span> <span class="chip chip-blue"><span class="cd"></span> ${DATA.customer.type}</span></div>
        </div>
        <button class="icon-btn" data-toast="Editing personal information&hellip;">${ICONS.edit}</button>
      </div>

      <div class="section-head"><h3>Linked accounts</h3></div>
      <div class="row-card">
        <button class="list-row" data-toast="Account details opened.">
          <span class="list-ic">${ICONS.drop}</span>
          <span class="list-body"><span class="t">${DATA.customer.acct}</span><span class="s">${DATA.customer.address}</span></span>
          <span class="list-end"><span class="chip chip-green"><span class="cd"></span>Primary</span>${ICONS.chevR}</span>
        </button>
        <button class="list-row" data-toast="Add another water account.">
          <span class="list-ic aqua">${ICONS.plus}</span>
          <span class="list-body"><span class="t">Add another account</span><span class="s">Link a second water connection</span></span>
          <span class="list-end">${ICONS.chevR}</span>
        </button>
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
        <button class="list-row" data-toast="You have been signed out.">
          <span class="list-ic red">${ICONS.logout}</span>
          <span class="list-body"><span class="t danger-text">Sign out</span></span>
        </button>
      </div>
      <p class="footer-note">PPCWD Customer App &middot; Version 2.0</p>
    </div>
    <div class="after-tabs" style="height:16px"></div>
  </div>
  ${tabbar("account")}`,
});

/* ---------- SETTINGS ---------- */
SCREENS.settings = () => ({
  html: `
  <div class="screen on-tint">
    ${backHeader("Settings")}
    <div class="pad after-bar">
      <div class="section-head" style="margin-top:6px"><h3>Notifications</h3></div>
      <div class="row-card">
        <div class="toggle-row">
          <span class="list-ic orange">${ICONS.calendar}</span>
          <span class="tr-body"><span class="t">Due date reminders</span><span class="s">Alert 3 days before your bill is due</span></span>
          <button class="switch on" data-switch></button>
        </div>
        <div class="toggle-row">
          <span class="list-ic">${ICONS.bill}</span>
          <span class="tr-body"><span class="t">Billing alerts</span><span class="s">Notify me when a new bill is issued</span></span>
          <button class="switch on" data-switch></button>
        </div>
        <div class="toggle-row">
          <span class="list-ic aqua">${ICONS.mega}</span>
          <span class="tr-body"><span class="t">Advisory notifications</span><span class="s">Service interruptions and announcements</span></span>
          <button class="switch on" data-switch></button>
        </div>
        <div class="toggle-row">
          <span class="list-ic green">${ICONS.checkC}</span>
          <span class="tr-body"><span class="t">Payment confirmations</span><span class="s">Receipt alerts when payments post</span></span>
          <button class="switch on" data-switch></button>
        </div>
      </div>

      <div class="section-head"><h3>Accessibility</h3></div>
      <div class="row-card">
        <div class="toggle-row">
          <span class="list-ic sky">${ICONS.text}</span>
          <span class="tr-body"><span class="t">Larger text</span><span class="s">Increase text size across the app</span></span>
          <button class="switch" data-switch></button>
        </div>
        <div class="toggle-row">
          <span class="list-ic">${ICONS.spark}</span>
          <span class="tr-body"><span class="t">High contrast</span><span class="s">Stronger colors for better readability</span></span>
          <button class="switch" data-switch></button>
        </div>
      </div>

      <div class="section-head"><h3>Payment preferences</h3></div>
      <div class="row-card">
        <button class="list-row" data-tab="payments">
          <span class="acc-logo l-gcash" style="width:42px;height:42px;border-radius:12px;font-size:11px">GCash</span>
          <span class="list-body"><span class="t">Preferred payment method</span><span class="s">GCash &middot; ending in 7890</span></span>
          <span class="list-end">${ICONS.chevR}</span>
        </button>
      </div>
      <p class="footer-note">Preferences are saved automatically</p>
    </div>
  </div>`,
});

/* ---------- NOTIFICATIONS ---------- */
SCREENS.notifications = () => ({
  html: `
  <div class="screen on-tint">
    ${backHeader("Notifications", `<button class="icon-btn" data-toast="All notifications marked as read.">${ICONS.check}</button>`)}
    <div class="pad after-bar">
      <div class="section-head" style="margin-top:6px"><h3>Today</h3></div>
      <div class="row-card">
        <div class="notif unread">
          <span class="list-ic orange" style="width:38px;height:38px;border-radius:11px">${ICONS.calendar}</span>
          <span style="flex:1"><span class="t">Your October bill is due in 20 days</span><span class="s">Pay &#8369;${DATA.bill.amount} on or before ${DATA.bill.dueShort} to avoid late charges.</span><span class="time">9:00 AM</span></span>
          <span class="unread-dot"></span>
        </div>
        <div class="notif unread">
          <span class="list-ic aqua" style="width:38px;height:38px;border-radius:11px">${ICONS.alert}</span>
          <span style="flex:1"><span class="t">Water interruption tomorrow in Sta. Lucia</span><span class="s">Service off from 9:00 AM to 3:00 PM for main line repairs.</span><span class="time">8:15 AM</span></span>
          <span class="unread-dot"></span>
        </div>
      </div>
      <div class="section-head"><h3>Earlier</h3></div>
      <div class="row-card">
        <div class="notif">
          <span class="list-ic green" style="width:38px;height:38px;border-radius:11px">${ICONS.checkC}</span>
          <span style="flex:1"><span class="t">Payment received &mdash; September bill</span><span class="s">&#8369;1,112.00 via GCash. Thank you!</span><span class="time">Oct 8</span></span>
        </div>
        <div class="notif">
          <span class="list-ic sky" style="width:38px;height:38px;border-radius:11px">${ICONS.mega}</span>
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
  const max = 16;
  const now = 10, prev = 13;
  const diff = ((now - prev) / prev) * 100;
  return {
    html: `
    <div class="screen on-tint">
      ${backHeader("Water Consumption")}
      <div class="pad after-bar">
        <div class="card" style="background:linear-gradient(140deg,rgba(255,255,255,.16),rgba(255,255,255,.05)),linear-gradient(150deg,#061A56,#0A3584 55%,#1764BC);border:1px solid var(--glass-border);color:#fff;box-shadow:var(--shadow-blue)">
          <div class="lbl" style="font-size:13px;font-weight:600;opacity:.85">October 2026 usage</div>
          <div style="font-size:40px;font-weight:800;letter-spacing:-1.2px;margin-top:4px">10 <span style="font-size:16px;opacity:.85">cu.m</span></div>
          <div class="mt-10"><span class="pill pill-glass"><span class="pdot" style="background:var(--aqua)"></span> ${Math.abs(diff).toFixed(0)}% less than last month</span></div>
          <div class="balance-meta" style="margin-top:12px">
            <span class="acct-no">Meter read: Oct 15, 2026 &middot; Previous: 4,203 cu.m</span>
          </div>
        </div>

        <div class="section-head"><h3>Last 6 months</h3></div>
        <div class="card">
          <div class="chart">
            ${DATA.usage.map((d, i) => `
              <div class="col ${i === DATA.usage.length - 1 ? "now" : ""}">
                <span class="vval">${d.v}</span>
                <div class="bar" style="height:${(d.v / max) * 100}px"></div>
                <span class="mlbl">${d.m}</span>
              </div>`).join("")}
          </div>
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
        <div style="font-size:22px;font-weight:800;color:var(--aqua);margin-top:6px;letter-spacing:-.4px;text-shadow:0 0 16px rgba(75,246,240,.5)">(048) 726-3344</div>
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
          <button class="acc-head" data-acc style="padding:16px">
            <span class="acc-body-t"><span class="t" style="font-size:14px">${f.q}</span></span>
            <span class="acc-chev">${ICONS.chevD}</span>
          </button>
          <div class="acc-panel"><div class="acc-panel-inner" style="padding-top:12px">
            <p style="font-size:13.5px;line-height:1.6;color:var(--ink-2);font-weight:500">${f.a}</p>
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
  const def = SCREENS[screenKey];
  if (!def) return;
  const out = def(params);
  const phone = document.getElementById("phone-screen");
  phone.innerHTML = `${statusBar(false)}<div id="screen-mount" style="flex:1;display:flex;flex-direction:column;min-height:0">${out.html}</div><div class="home-indicator"></div>`;

  if (push && state.screen !== screenKey) {
    if (TAB_SCREENS.includes(screenKey)) state.stack = [];
    else state.stack.push(state.screen);
  }
  state.screen = screenKey;
  const sc = phone.querySelector(".screen");
  if (sc) sc.scrollTop = 0;
}

/* Delegated events */
document.addEventListener("click", (e) => {
  const accBtn = e.target.closest("[data-acc]");
  if (accBtn) {
    accBtn.parentElement.classList.toggle("open");
    return;
  }
  const sw = e.target.closest("[data-switch]");
  if (sw) {
    sw.classList.toggle("on");
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
    render("bills", null, false);
    state.billsTab = "history";
    render("bills", null, false);
    return;
  }
  const toastBtn = e.target.closest("[data-toast]");
  if (toastBtn) showToast(toastBtn.dataset.toast);
});

function showToast(msg) {
  const phone = document.getElementById("phone-screen");
  const old = phone.querySelector(".toast");
  if (old) old.remove();
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = `${ICONS.checkC}<span>${msg}</span>`;
  phone.appendChild(t);
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
  ["home", "1. Home Dashboard", "Balance card, quick actions, advisory & usage"],
  ["bills", "2. Bills — Current", "Bill summary, breakdown, pay & download"],
  ["bills-history", "3. Bills — History", "Searchable records with month filters"],
  ["bill-detail", "4. Statement of Account", "Full statement details"],
  ["payments", "5. Payments", "GCash primary + partner accordions"],
  ["gcash-guide", "6. GCash Payment Guide", "Step-by-step instructions"],
  ["payment-success", "7. Payment Confirmation", "Receipt & reference number"],
  ["advisories", "8. Advisories", "Categories, featured card, list"],
  ["advisory-detail", "9. Advisory Details", "Affected areas & full article"],
  ["advisory-archive", "10. Advisory Archive", "Past advisories"],
  ["usage", "11. Water Consumption", "Trends & month comparison"],
  ["notifications", "12. Notifications", "Due dates, billing & advisories"],
  ["account", "13. Account", "Customer info, linked accounts, settings"],
  ["settings", "14. Settings & Preferences", "Notifications & accessibility"],
  ["help", "15. Help & Support", "Call, email, FAQ accordions"],
];

function buildGallery() {
  const wrap = document.getElementById("gallery");
  wrap.innerHTML = GALLERY.map(([key, title, sub]) => {
    let out;
    if (key === "bills-history") {
      state.billsTab = "history";
      out = SCREENS.bills();
      state.billsTab = "current";
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
  document.querySelectorAll("[data-view]").forEach((b) => b.classList.toggle("active", b === vt));
  const isProto = vt.dataset.view === "proto";
  document.getElementById("proto-view").hidden = !isProto;
  document.getElementById("gallery-view").hidden = isProto;
});

document.getElementById("phone-shell").innerHTML = `<div class="phone"><div class="notch"></div><div class="phone-screen" id="phone-screen"></div></div>`;
render("home", null, false);
buildGallery();
