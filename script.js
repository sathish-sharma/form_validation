$(document).ready(function () {
  // Show/Hide Passwords
  $("#togglePassword").click(function () {
    toggleVisibility("#password", this);
  });

  $("#toggleConfirmPassword").click(function () {
    toggleVisibility("#confirmPassword", this);
  });

  function toggleVisibility(selector, button) {
    const field = $(selector);
    const type = field.attr("type") === "password" ? "text" : "password";
    field.attr("type", type);
    $(button).text(type === "password" ? "Show" : "Hide");
  }

  // Phone input: Only allow digits, max 10 digits
  $("#phone").on("input", function () {
    let val = $(this).val().replace(/\D/g, ""); // Remove non-digits
    if (val.length > 10) val = val.slice(0, 10); // Max 10 digits
    $(this).val(val);
  });

  // Form Submission Validation
  $("#registrationForm").submit(function (event) {
    event.preventDefault();
    $("#messageBox").hide();

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const phone = $("#phone").val().trim();
    const password = $("#password").val();
    const confirmPassword = $("#confirmPassword").val();

    let errors = [];

    if (name === "") {
      errors.push("Name is required.");
    }

    if (!validateEmail(email)) {
      errors.push("Invalid email format.");
    }

    if (!/^\d{10}$/.test(phone)) {
      errors.push("Phone number must be exactly 10 digits.");
    }

    if (!validatePassword(password)) {
      errors.push("Password must be at least 8 characters, include uppercase, lowercase, and a number.");
    }

    if (password !== confirmPassword) {
      errors.push("Passwords do not match.");
    }

    if (errors.length > 0) {
      displayMessage(errors.join("<br>"), "error");
    } else {
      displayMessage("Form submitted successfully!", "success");
      this.reset();
      $("#togglePassword").text("Show");
      $("#toggleConfirmPassword").text("Show");
    }
  });

  // Utility Functions
  function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  }

  function displayMessage(message, type) {
    $("#messageBox")
      .html(message)
      .removeClass()
      .addClass(type)
      .fadeIn();
  }
});
