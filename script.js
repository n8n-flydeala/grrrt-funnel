// ── CONFIG ───────────────────────────────────────────────────────────────────
// Replace this with your n8n webhook URL for the FUNNEL
// (You can reuse your existing one or create a new workflow)
const WEBHOOK_URL = "https://flydeala.app.n8n.cloud/webhook/efc5cc4a-63c8-4386-a512-38f216236821";

// ── FORM SUBMIT ───────────────────────────────────────────────────────────────
const form      = document.getElementById("leadForm");
const submitBtn = document.getElementById("submitBtn");
const btnText   = document.getElementById("btnText");
const btnLoad   = document.getElementById("btnLoading");
const errDiv    = document.getElementById("formError");

if (form) {
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name  = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    // Loading state
    submitBtn.disabled = true;
    btnText.classList.add("hidden");
    btnLoad.classList.remove("hidden");
    errDiv.classList.add("hidden");

    try {
      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          source: "grrrt-funnel",       // so you know which form sent it
          lead_magnet: "money-blueprint"
        }),
      });

      if (res.ok) {
        // Redirect to thank you page
        window.location.href = "thank-you.html";
      } else {
        throw new Error("Server error");
      }

    } catch (err) {
      // Show error
      errDiv.classList.remove("hidden");
      submitBtn.disabled = false;
      btnText.classList.remove("hidden");
      btnLoad.classList.add("hidden");
    }
  });
}