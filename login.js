// frontend/login.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const message = document.getElementById("login-message");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = form.email.value;
      const password = form.password.value;
  
      try {
        const res = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
  
        if (data.success) {
          message.textContent = "✅ Login successful!";
          message.style.color = "lightgreen";
          localStorage.setItem("user", JSON.stringify(data.user));
          setTimeout(() => window.location.href = "support-request.html", 1500);
        } else {
          message.textContent = "❌ Invalid credentials";
          message.style.color = "crimson";
        }
      } catch (err) {
        console.error(err);
        message.textContent = "⚠️ Server error";
      }
    });
  });
  