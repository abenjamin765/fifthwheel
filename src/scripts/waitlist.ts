// This repo is the marketing site. `/api/waitlist` still lives on the existing
// Vercel app; the payload shape below must stay compatible with Airtable there.
const ENDPOINT = "https://www.5thwheel.app/api/waitlist";

const form = document.getElementById("waitlistForm");
const statusEl = document.getElementById("formStatus");
const btn = document.getElementById("submitBtn");
const formPanel = document.getElementById("formPanel");
const thanksPanel = document.getElementById("thanksPanel");
const heroEmail = document.getElementById("hero-email");
const jump = document.querySelector("[data-jump]");
const lookingFor = document.getElementById("f-looking");

const lookingForStops = ["Casual", "Open", "Relationship"] as const;

function lookingForLabel(value: string): (typeof lookingForStops)[number] {
  const index = Number(value);
  return lookingForStops[index] ?? "Open";
}

function syncLookingFor(input: HTMLInputElement): void {
  const label = lookingForLabel(input.value);
  input.setAttribute("aria-valuenow", input.value);
  input.setAttribute("aria-valuetext", label);

  const stops = input.parentElement?.querySelectorAll("[data-stop]");
  if (!stops) return;
  stops.forEach((stop) => {
    stop.classList.toggle(
      "is-current",
      stop.getAttribute("data-stop") === input.value,
    );
  });
}

if (
  !(form instanceof HTMLFormElement) ||
  !(statusEl instanceof HTMLElement) ||
  !(btn instanceof HTMLButtonElement) ||
  !(formPanel instanceof HTMLElement) ||
  !(thanksPanel instanceof HTMLElement) ||
  !(heroEmail instanceof HTMLInputElement) ||
  !(jump instanceof HTMLElement) ||
  !(lookingFor instanceof HTMLInputElement)
) {
  throw new Error("Waitlist form markup is incomplete.");
}

syncLookingFor(lookingFor);
lookingFor.addEventListener("input", () => {
  syncLookingFor(lookingFor);
});

function setStatus(el: HTMLElement, msg: string, kind?: "err" | "ok"): void {
  el.textContent = msg;
  el.className = "form-status" + (kind ? ` ${kind}` : "");
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function revealThanks(): void {
  const scrollBehavior: ScrollBehavior = prefersReducedMotion()
    ? "auto"
    : "smooth";
  const show = (): void => {
    formPanel.hidden = true;
    thanksPanel.hidden = false;
    thanksPanel.scrollIntoView({
      behavior: scrollBehavior,
      block: "center",
    });
  };

  if (prefersReducedMotion()) {
    show();
    return;
  }

  let finished = false;
  const finish = (): void => {
    if (finished) return;
    finished = true;
    show();
  };

  formPanel.classList.add("is-leaving");
  formPanel.addEventListener("transitionend", finish, { once: true });
  window.setTimeout(finish, 320);
}

// Hero field is a hand-off, not a second form: copy the value into the real
// email input, scroll to #waitlist, then focus name (or email if the field was empty).
jump.addEventListener("click", () => {
  const value = heroEmail.value.trim();
  if (value) {
    const emailField = document.getElementById("f-email");
    if (emailField instanceof HTMLInputElement) {
      emailField.value = value;
    }
  }
  document.getElementById("waitlist")?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
  window.setTimeout(() => {
    const target = document.getElementById(value ? "f-name" : "f-email");
    if (target instanceof HTMLElement) {
      target.focus({ preventScroll: true });
    }
  }, 500);
});

heroEmail.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    jump.click();
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const email = String(data.get("email") ?? "").trim();
  const name = String(data.get("first_name") ?? "").trim();
  const openTo = data.getAll("open_to").map(String);

  if (!name) {
    setStatus(
      statusEl,
      "Add your first name so we know who we’re seating.",
      "err",
    );
    document.getElementById("f-name")?.focus();
    return;
  }
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    setStatus(statusEl, "That email address looks incomplete.", "err");
    document.getElementById("f-email")?.focus();
    return;
  }
  if (!data.get("age_range")) {
    setStatus(statusEl, "Select your age range.", "err");
    document.getElementById("f-age")?.focus();
    return;
  }
  if (!data.get("identity")) {
    setStatus(
      statusEl,
      "Let us know how you identify — it’s how we balance the table.",
      "err",
    );
    return;
  }
  if (openTo.length === 0) {
    setStatus(
      statusEl,
      "Choose at least one option under “Seat you with.”",
      "err",
    );
    return;
  }
  if (!data.get("age_open_to")) {
    setStatus(statusEl, "Tell us what ages you’re open to meeting.", "err");
    document.getElementById("f-age-open")?.focus();
    return;
  }
  if (!data.get("surprise_game")) {
    setStatus(
      statusEl,
      "Let us know if you’d like a surprise game at the table.",
      "err",
    );
    return;
  }
  if (!data.get("neighborhood")) {
    setStatus(statusEl, "Pick a neighborhood you’d walk to.", "err");
    document.getElementById("f-hood")?.focus();
    return;
  }

  // Collapse multi-selects so they land in Airtable as readable text.
  // Empty nights stay "Not specified". `_gotcha` is the honeypot.
  const payload = {
    first_name: name,
    email,
    age_range: data.get("age_range"),
    neighborhood: data.get("neighborhood"),
    identity: data.get("identity"),
    open_to: openTo.join(", "),
    nights: data.getAll("nights").join(", ") || "Not specified",
    referral: String(data.get("referral") ?? "").trim(),
    source: "landing-page",
    submitted_at: new Date().toISOString(),
    _gotcha: data.get("_gotcha") || "",
    age_open_to: data.get("age_open_to"),
    looking_for: lookingForLabel(String(data.get("looking_for") ?? "1")),
    surprise_game: data.get("surprise_game"),
  };

  btn.disabled = true;
  btn.textContent = "Sending…";
  setStatus(statusEl, "");

  fetch(ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      if (!res.ok) throw new Error("bad response");
      revealThanks();
    })
    .catch(() => {
      btn.disabled = false;
      btn.textContent = "Join the waitlist";
      setStatus(
        statusEl,
        "That didn’t go through. Try again, or email hello@5thwheel.app and we’ll add you by hand.",
        "err",
      );
    });
});
