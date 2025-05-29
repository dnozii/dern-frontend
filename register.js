// frontend/register.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const message = document.getElementById("register-message");
  
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const email = form.email.value;
      const password = form.password.value;
      const role = form.role.value;
  
      try {
        const res = await fetch("http://localhost:5000/api/users/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password, role })
        });
  
        if (res.status === 201) {
          message.textContent = "✅ Registered successfully!";
          message.style.color = "lightgreen";
          setTimeout(() => window.location.href = "login.html", 1500);
        } else {
          message.textContent = "⚠️ Registration failed.";
          message.style.color = "crimson";
        }
      } catch (err) {
        console.error(err);
        message.textContent = "⚠️ Server error";
      }
    });
  });
  