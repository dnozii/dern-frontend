// frontend/support-request.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const message = document.getElementById("support-message");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        message.textContent = "⚠️ Please log in first.";
        message.style.color = "orange";
        return;
      }
  
      const payload = {
        device: form.device.value,
        issue: form.issue.value,
        urgency: form.urgency.value,
        userEmail: user.email
      };
  
      try {
        const res = await fetch("http://localhost:5000/api/support", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
  
        if (res.status === 201) {
          message.textContent = "✅ Support request submitted!";
          message.style.color = "lightgreen";
          form.reset();
        } else {
          message.textContent = "❌ Submission failed.";
          message.style.color = "crimson";
        }
      } catch (err) {
        console.error(err);
        message.textContent = "⚠️ Server error.";
      }
    });
  });
  