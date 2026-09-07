// Idea Board: a rules-based flow-chart generator + a freehand whiteboard,
// composited into one PNG and emailed to Viktech via FormSubmit.
//
// Note: the flow chart is generated from a template library keyed by
// project type + selected features - it is NOT calling a real AI model.
// Doing that safely would need a backend to hold an API key (this site
// is fully static). This still gives a genuinely useful instant blueprint.
(function () {
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  // ---------- Canvas setup ----------
  function setupCanvas(canvas, cssHeight) {
    const wrap = canvas.parentElement;
    const width = wrap.clientWidth;
    canvas.width = width * DPR;
    canvas.height = cssHeight * DPR;
    const ctx = canvas.getContext("2d");
    ctx.scale(DPR, DPR);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, width, cssHeight);
    return ctx;
  }

  function cssSize(canvas) {
    return { w: canvas.width / DPR, h: canvas.height / DPR };
  }

  // ==================== FLOW CHART ====================
  const flowCanvas = document.getElementById("flowCanvas");
  const flowEmpty = document.getElementById("flowEmpty");
  const generateBtn = document.getElementById("generateFlow");
  const projectType = document.getElementById("projectType");

  const NODE_LIB = {
    start: { label: "Landing Page", side: false },
    login: { label: "Sign Up / Login", side: false },
    search: { label: "Search & Filters", side: false },
    catalog: { label: "Browse Catalog", side: false },
    booking: { label: "Select Date / Time", side: false },
    cart: { label: "Cart", side: false },
    upload: { label: "Upload Files", side: false },
    payments: { label: "Checkout & Payment", side: false },
    contact: { label: "Contact Form", side: false },
    end: { label: "Confirmation / Launch", side: false },
    blog: { label: "Blog / Articles", side: true },
    admin: { label: "Admin Dashboard", side: true },
    notifications: { label: "Notifications", side: true },
    multilang: { label: "Language Switch", side: true },
  };
  const MAIN_ORDER = ["start", "login", "search", "catalog", "booking", "cart", "upload", "payments", "contact", "end"];

  function buildFlow(type, selected) {
    const set = new Set(selected);
    set.add("start");
    set.add("end");
    if (set.has("cart") || set.has("catalog")) set.add("payments");
    if (set.has("booking")) set.add("payments");

    const main = MAIN_ORDER.filter((k) => set.has(k));
    const side = Object.keys(NODE_LIB).filter((k) => NODE_LIB[k].side && set.has(k));
    return { main, side, type };
  }

  function drawFlow(ctx, w, h, flow) {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

    const boxW = 168;
    const boxH = 44;
    const gapY = 34;
    const count = flow.main.length;
    const totalH = count * boxH + (count - 1) * gapY;
    const startY = Math.max(24, (h - totalH) / 2);
    const cx = flow.side.length ? w * 0.36 : w / 2;

    ctx.font = "600 12px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";

    const centers = [];
    flow.main.forEach((key, i) => {
      const y = startY + i * (boxH + gapY);
      centers.push(y + boxH / 2);
      const x = cx - boxW / 2;

      // connector
      if (i > 0) {
        const prevY = centers[i - 1];
        ctx.strokeStyle = "#e93232";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(cx, prevY + boxH / 2);
        ctx.lineTo(cx, y - 6);
        ctx.stroke();
        // arrowhead
        ctx.beginPath();
        ctx.moveTo(cx - 5, y - 10);
        ctx.lineTo(cx, y - 2);
        ctx.lineTo(cx + 5, y - 10);
        ctx.fillStyle = "#e93232";
        ctx.fill();
      }

      // box
      const isEndpoint = key === "start" || key === "end";
      roundRect(ctx, x, y, boxW, boxH, 10);
      ctx.fillStyle = isEndpoint ? "#071c4d" : "#f8f9fc";
      ctx.fill();
      ctx.strokeStyle = isEndpoint ? "#071c4d" : "#e6e9f0";
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.fillStyle = isEndpoint ? "#ffffff" : "#071c4d";
      ctx.fillText(NODE_LIB[key].label, cx, y + boxH / 2, boxW - 16);
    });

    // side (optional/parallel) nodes, dashed-connected to nearest main node
    if (flow.side.length) {
      const sideX = w * 0.76;
      const sideBoxW = 158;
      const sideGap = 30;
      const sideTotalH = flow.side.length * boxH + (flow.side.length - 1) * sideGap;
      const sideStartY = Math.max(24, (h - sideTotalH) / 2);

      flow.side.forEach((key, i) => {
        const y = sideStartY + i * (boxH + sideGap);
        const x = sideX - sideBoxW / 2;

        const anchorIdx = Math.min(flow.main.length - 1, Math.floor((i + 1) * flow.main.length / (flow.side.length + 1)));
        const anchorY = centers[anchorIdx] || h / 2;

        ctx.setLineDash([4, 4]);
        ctx.strokeStyle = "#7c3aed";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(cx + boxW / 2, anchorY);
        ctx.lineTo(x, y + boxH / 2);
        ctx.stroke();
        ctx.setLineDash([]);

        roundRect(ctx, x, y, sideBoxW, boxH, 10);
        ctx.fillStyle = "#f5f1ff";
        ctx.fill();
        ctx.strokeStyle = "#dcd0fb";
        ctx.lineWidth = 1.4;
        ctx.stroke();
        ctx.fillStyle = "#5b21b6";
        ctx.fillText(NODE_LIB[key].label, sideX, y + boxH / 2, sideBoxW - 16);
      });
    }

    // title
    ctx.textAlign = "left";
    ctx.font = "700 13px Inter, sans-serif";
    ctx.fillStyle = "#5b6472";
    ctx.fillText(flow.type ? `${flow.type} — flow chart` : "Flow chart", 16, 20);
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  let lastFlow = null;
  if (flowCanvas && generateBtn) {
    generateBtn.addEventListener("click", () => {
      const selected = Array.from(document.querySelectorAll('input[name="feature"]:checked')).map((el) => el.value);
      const type = projectType ? projectType.value : "";
      const flow = buildFlow(type, selected);
      const ctx = setupCanvas(flowCanvas, 420);
      const { w, h } = cssSize(flowCanvas);
      drawFlow(ctx, w, h, flow);
      lastFlow = flow;
      if (flowEmpty) flowEmpty.style.display = "none";
      flowCanvas.style.display = "block";
    });
  }

  // ==================== WHITEBOARD ====================
  const whiteboardCanvas = document.getElementById("whiteboardCanvas");
  let wbCtx = null;
  let currentTool = "pen";
  let currentColor = "#071c4d";
  let drawing = false;
  let lastPoint = null;
  let history = [];
  const HISTORY_LIMIT = 25;

  function pushHistory() {
    if (!whiteboardCanvas) return;
    history.push(whiteboardCanvas.toDataURL());
    if (history.length > HISTORY_LIMIT) history.shift();
  }

  function restoreFromDataUrl(dataUrl) {
    const { w, h } = cssSize(whiteboardCanvas);
    const img = new Image();
    img.onload = () => {
      wbCtx.clearRect(0, 0, w, h);
      wbCtx.drawImage(img, 0, 0, w, h);
    };
    img.src = dataUrl;
  }

  function getPos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    const clientX = evt.touches ? evt.touches[0].clientX : evt.clientX;
    const clientY = evt.touches ? evt.touches[0].clientY : evt.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  }

  function addStickyNote(x, y, text, color) {
    const { w } = cssSize(whiteboardCanvas);
    const padding = 10;
    wbCtx.font = "600 13px Inter, sans-serif";
    const lines = wrapText(wbCtx, text, 180);
    const boxW = 200;
    const boxH = lines.length * 18 + padding * 2;
    const bx = Math.min(Math.max(x - boxW / 2, 4), w - boxW - 4);
    const by = Math.max(y - boxH / 2, 4);

    roundRect(wbCtx, bx, by, boxW, boxH, 10);
    wbCtx.fillStyle = color + "1a";
    wbCtx.fill();
    wbCtx.strokeStyle = color;
    wbCtx.lineWidth = 1.6;
    wbCtx.stroke();

    wbCtx.fillStyle = color;
    wbCtx.textAlign = "left";
    wbCtx.textBaseline = "middle";
    lines.forEach((line, i) => {
      wbCtx.fillText(line, bx + padding, by + padding + i * 18 + 9);
    });
  }

  function wrapText(ctx, text, maxWidth) {
    const words = text.split(/\s+/);
    const lines = [];
    let line = "";
    words.forEach((word) => {
      const test = line ? line + " " + word : word;
      if (ctx.measureText(test).width > maxWidth && line) {
        lines.push(line);
        line = word;
      } else {
        line = test;
      }
    });
    if (line) lines.push(line);
    return lines.slice(0, 6);
  }

  function openNoteInput(x, y) {
    const wrap = whiteboardCanvas.parentElement;
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "Type a note, press Enter…";
    input.style.cssText = `position:absolute; left:${x}px; top:${y}px; transform:translate(-50%,-50%); z-index:5; width:180px; padding:8px 10px; border-radius:8px; border:1.5px solid ${currentColor}; font:600 13px Inter, sans-serif; outline:none; background:#fff;`;
    wrap.style.position = "relative";
    wrap.appendChild(input);
    input.focus();

    function commit() {
      const text = input.value.trim();
      input.remove();
      if (text) {
        pushHistory();
        addStickyNote(x, y, text, currentColor);
      }
    }
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") commit();
      if (e.key === "Escape") input.remove();
    });
    input.addEventListener("blur", commit);
  }

  let wbInitialized = false;
  function initWhiteboard() {
    if (wbInitialized) return;
    const wrap = whiteboardCanvas.parentElement;
    if (!wrap || wrap.clientWidth === 0) return; // not laid out yet - wait for the observer
    wbInitialized = true;
    wbCtx = setupCanvas(whiteboardCanvas, 420);
    pushHistory();
  }

  if (whiteboardCanvas) {
    // The wrapper may have zero width for a moment before the page finishes
    // laying out (varies by device/connection speed), so size the canvas
    // once real dimensions are available rather than assuming they exist as
    // soon as this script runs. ResizeObserver also re-syncs on any later
    // resize (window resize, orientation change).
    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(() => {
        if (!wbInitialized) {
          initWhiteboard();
        } else if (wbCtx) {
          const prev = whiteboardCanvas.toDataURL();
          wbCtx = setupCanvas(whiteboardCanvas, 420);
          restoreFromDataUrl(prev);
        }
      });
      ro.observe(whiteboardCanvas.parentElement);
    } else {
      initWhiteboard();
      window.addEventListener("resize", () => {
        if (!wbCtx) return;
        const prev = whiteboardCanvas.toDataURL();
        wbCtx = setupCanvas(whiteboardCanvas, 420);
        restoreFromDataUrl(prev);
      });
    }

    whiteboardCanvas.addEventListener("pointerdown", (e) => {
      if (!wbCtx) return;
      if (currentTool === "note") {
        const pos = getPos(whiteboardCanvas, e);
        openNoteInput(pos.x, pos.y);
        return;
      }
      drawing = true;
      pushHistory();
      lastPoint = getPos(whiteboardCanvas, e);
    });
    whiteboardCanvas.addEventListener("pointermove", (e) => {
      if (!drawing || currentTool !== "pen") return;
      const pos = getPos(whiteboardCanvas, e);
      wbCtx.strokeStyle = currentColor;
      wbCtx.lineWidth = 2.4;
      wbCtx.lineCap = "round";
      wbCtx.lineJoin = "round";
      wbCtx.beginPath();
      wbCtx.moveTo(lastPoint.x, lastPoint.y);
      wbCtx.lineTo(pos.x, pos.y);
      wbCtx.stroke();
      lastPoint = pos;
    });
    ["pointerup", "pointerleave"].forEach((evt) =>
      whiteboardCanvas.addEventListener(evt, () => {
        drawing = false;
      })
    );

    document.querySelectorAll(".tool-btn[data-tool]").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".tool-btn[data-tool]").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        currentTool = btn.dataset.tool;
      });
    });
    document.querySelectorAll(".color-swatch").forEach((btn) => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".color-swatch").forEach((b) => b.classList.remove("is-active"));
        btn.classList.add("is-active");
        currentColor = btn.dataset.color;
      });
    });

    const undoBtn = document.getElementById("undoBtn");
    if (undoBtn) {
      undoBtn.addEventListener("click", () => {
        if (history.length) restoreFromDataUrl(history.pop());
      });
    }
    const clearBtn = document.getElementById("clearBtn");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        pushHistory();
        const { w, h } = cssSize(whiteboardCanvas);
        wbCtx.clearRect(0, 0, w, h);
        wbCtx.fillStyle = "#ffffff";
        wbCtx.fillRect(0, 0, w, h);
      });
    }
  }

  // ==================== COMPOSITE + SEND ====================
  function compositeCanvas() {
    const hasFlow = flowCanvas && flowCanvas.style.display !== "none" && lastFlow;
    const parts = [whiteboardCanvas, hasFlow ? flowCanvas : null].filter(Boolean);
    if (!parts.length) return null;

    const widths = parts.map((c) => c.width / DPR);
    const heights = parts.map((c) => c.height / DPR);
    const outW = Math.max(...widths);
    const outH = heights.reduce((a, b) => a + b, 0) + (parts.length - 1) * 8;

    const out = document.createElement("canvas");
    out.width = outW * DPR;
    out.height = outH * DPR;
    const octx = out.getContext("2d");
    octx.scale(DPR, DPR);
    octx.fillStyle = "#ffffff";
    octx.fillRect(0, 0, outW, outH);

    let y = 0;
    // flow chart first (if generated), then whiteboard
    const ordered = hasFlow ? [flowCanvas, whiteboardCanvas] : [whiteboardCanvas];
    ordered.forEach((c) => {
      const cw = c.width / DPR;
      const ch = c.height / DPR;
      octx.drawImage(c, 0, y, cw, ch);
      y += ch + 8;
    });
    return out;
  }

  const downloadBtn = document.getElementById("downloadBtn");
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const combined = compositeCanvas();
      if (!combined) return;
      combined.toBlob((blob) => {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "viktech-idea-board.png";
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1000);
      }, "image/png");
    });
  }

  const ideaForm = document.getElementById("ideaForm");
  const ideaFormNote = document.getElementById("ideaFormNote");
  if (ideaForm) {
    ideaForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const submitBtn = document.getElementById("sendIdeaBtn");
      const originalLabel = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending...";
      ideaFormNote.textContent = "";

      try {
        const formData = new FormData(ideaForm);
        const selectedFeatures = Array.from(document.querySelectorAll('input[name="feature"]:checked'))
          .map((el) => el.dataset.label)
          .join(", ");
        formData.append("project_type", projectType ? projectType.value || "Not specified" : "Not specified");
        formData.append("features", selectedFeatures || "None selected");

        const combined = compositeCanvas();
        if (combined) {
          const blob = await new Promise((resolve) => combined.toBlob(resolve, "image/png"));
          if (blob) formData.append("idea-board-screenshot", blob, "viktech-idea-board.png");
        }

        const endpoint = `https://formsubmit.co/ajax/${ideaForm.action.split("/").pop()}`;
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData,
        });
        if (!response.ok) throw new Error("Request failed");
        ideaFormNote.textContent = "Got it! We've received your idea and will follow up soon — often the same day.";
        ideaForm.reset();
      } catch (err) {
        ideaFormNote.textContent = "Something went wrong sending that. Please email us directly at hello@viktechsoftware.com.";
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    });
  }
})();
