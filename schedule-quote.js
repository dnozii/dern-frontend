// frontend/schedule-quote.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const message = document.getElementById("quote-message");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        message.textContent = "⚠️ Please log in to schedule.";
        message.style.color = "orange";
        return;
      }
  
      const payload = {
        preferredDate: form.date.value,
        preferredTime: form.time.value,
        notes: form.notes.value,
        userEmail: user.email
      };
  
      try {
        const res = await fetch("http://localhost:5000/api/schedules", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
  
        if (res.status === 201) {
          message.textContent = "✅ Schedule submitted!";
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
  