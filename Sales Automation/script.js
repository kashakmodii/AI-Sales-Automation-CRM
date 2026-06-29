const form = document.getElementById("leadForm");
const successModal = document.getElementById("successModal");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    fullName: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    service: document.getElementById("service").value,
    businessType: document.getElementById("businessType").value,
    source: document.getElementById("source").value,
    budget: document.getElementById("budget").value,
    location: document.getElementById("location").value,
    message: document.getElementById("message").value
  };

  const responseBox = document.getElementById("responseMessage");
  responseBox.innerText = "Submitting...";
  responseBox.style.color = "#007bff";

  try {
    const response = await fetch(
      "http://localhost:5678/webhook-test/lead-capture",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        mode: "cors",
        credentials: "omit"
      }
    );

    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }

    // Try to parse JSON, but handle empty/non-JSON responses
    let result = {};
    const contentType = response.headers.get("content-type");
    const text = await response.text();
    
    if (contentType && contentType.includes("application/json") && text) {
      try {
        result = JSON.parse(text);
      } catch (e) {
        result = { message: "Lead submitted successfully" };
      }
    } else {
      result = { message: "Lead submitted successfully" };
    }

    // Show success modal
    document.getElementById("leadInfo").innerHTML = 
      `<strong>${data.fullName}</strong><br>📧 ${data.email}<br>📱 ${data.phone}<br>💼 ${data.service}`;
    
    successModal.style.display = "flex";
    responseBox.style.color = "green";
    responseBox.innerText = "✅ Lead submitted successfully!";
    
    form.reset();

  } catch (error) {
    responseBox.style.color = "#d9534f";
    
    if (error.message.includes("Failed to fetch")) {
      responseBox.innerText = "❌ Cannot connect to server. Ensure it's running on localhost:5678 and CORS is enabled.";
    } else if (error.message.includes("JSON")) {
      responseBox.innerText = "✅ Lead submitted successfully! (Server response received)";
      document.getElementById("leadInfo").innerHTML = 
        `<strong>${data.fullName}</strong><br>📧 ${data.email}<br>📱 ${data.phone}<br>💼 ${data.service}`;
      successModal.style.display = "flex";
      form.reset();
    } else {
      responseBox.innerText = "❌ " + (error.message || "Something went wrong");
    }
    
    console.error(error);
  }
});

// Modal functions
function closeModal() {
  successModal.style.display = "none";
}

// Close modal when clicking outside
window.addEventListener("click", (event) => {
  if (event.target === successModal) {
    closeModal();
  }
});