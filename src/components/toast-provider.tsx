type ToastType = "success" | "error" | "info";

const CONTAINER_ID = "loose-toast-container";

function getOrCreateContainer(): HTMLElement {
  let container = document.getElementById(CONTAINER_ID);
  if (!container) {
    container = document.createElement("div");
    container.id = CONTAINER_ID;
    container.style.cssText = "position:fixed;bottom:24px;left:50%;transform:translateX(-50%);z-index:9999;display:flex;flex-direction:column;gap:8px;pointer-events:none;";
    document.body.appendChild(container);
  }
  return container;
}

function createToastElement(message: string, type: ToastType): HTMLElement {
  const el = document.createElement("div");
  el.style.cssText = `
    pointer-events:auto;display:flex;align-items:center;gap:12px;padding:12px 16px;
    border-radius:12px;border:1px solid;font-size:14px;font-weight:500;
    cursor:pointer;opacity:0;transform:translateY(10px);
    transition:opacity 0.3s,transform 0.3s;
    box-shadow:0 25px 50px -12px rgba(0,0,0,0.5);
  `;

  if (type === "success") {
    el.style.background = "#0f1a0a";
    el.style.borderColor = "rgba(119,255,51,0.4)";
    el.style.color = "#77FF33";
  } else if (type === "error") {
    el.style.background = "#1a0a0a";
    el.style.borderColor = "rgba(239,68,68,0.4)";
    el.style.color = "#f87171";
  } else {
    el.style.background = "#111019";
    el.style.borderColor = "rgba(255,255,255,0.2)";
    el.style.color = "#ffffff";
  }

  const icon = type === "success"
    ? `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    : type === "error"
    ? `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 9v4m0 4h.01M12 3l9.5 16.5H2.5L12 3z" stroke-linecap="round" stroke-linejoin="round"/></svg>`
    : `<svg width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 8v4m0 4h.01" stroke-linecap="round"/></svg>`;

  el.innerHTML = `<span style="flex-shrink:0">${icon}</span><span>${message}</span>`;

  el.addEventListener("click", () => {
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";
    setTimeout(() => el.remove(), 300);
  });

  return el;
}

export function toast(message: string, type: ToastType = "success") {
  if (typeof window === "undefined") return;
  const container = getOrCreateContainer();
  const el = createToastElement(message, type);
  container.appendChild(el);

  requestAnimationFrame(() => {
    el.style.opacity = "1";
    el.style.transform = "translateY(0)";
  });

  setTimeout(() => {
    el.style.opacity = "0";
    el.style.transform = "translateY(10px)";
    setTimeout(() => el.remove(), 300);
  }, 3000);
}

