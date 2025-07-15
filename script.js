let shareClicks = 0;
const maxShares = 5;

const form = document.getElementById("registrationForm");
const shareBtn = document.getElementById("whatsappShareBtn");
const shareCountText = document.getElementById("shareCount");
const submitBtn = document.getElementById("submitBtn");
const successMessage = document.getElementById("successMessage");

// Disable form if already submitted
if (localStorage.getItem("submitted") === "true") {
  form.classList.add("hidden");
  successMessage.classList.remove("hidden");
}

// Handle WhatsApp share click
shareBtn.addEventListener("click", () => {
  if (shareClicks < maxShares) {
    shareClicks++;
    shareCountText.textContent = `Click count: ${shareClicks}/5`;

    const message = encodeURIComponent("Hey Buddy, Join Tech For Girls Community!");
    const whatsappURL = `https://wa.me/?text=${message}`;
    window.open(whatsappURL, "_blank");

    if (shareClicks >= maxShares) {
      shareCountText.textContent = "Sharing complete. Please continue.";
      submitBtn.disabled = false;
    }
  }
});

// Handle form submission
form.addEventListener("submit", function (e) {
  e.preventDefault();

  if (shareClicks < maxShares) {
    alert("Please complete WhatsApp sharing before submitting.");
    return;
  }

  const formData = new FormData(form); // ← automatic, no need to append each field manually

  fetch('https://script.google.com/macros/s/AKfycbzJaWNsseB7ylQasEJMlepdgujBa7d2taMOp32N7CZdYTSw2lubZI_EGhLfJdEDtUfM/exec', {
    method: "POST",
    body: formData
  })
    .then(response => response.text())
    .then(result => {
      console.log("Server says:", result);
      form.reset();
      form.classList.add("hidden");
      successMessage.classList.remove("hidden");
      localStorage.setItem("submitted", "true");
    })
    .catch(error => {
      alert("Error submitting form. Please try again.");
      console.error("Fetch error:", error);
    });
});
