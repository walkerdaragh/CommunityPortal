document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const message = document.getElementById('message');

    if (password !== confirmPassword) {
        message.textContent = 'Passwords do not match!';
        return;
    }

    // Here, you would send a request to the server to register the user
    // For the sake of this example, we'll just display a success message
    message.style.color = 'green';
    message.textContent = 'Registration successful!';
});
