// Store users in localStorage (simulated database)
let users = JSON.parse(localStorage.getItem('users')) || {};

function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function toggleForm(formType) {
    const authContainer = document.getElementById('authContainer');
    const securedPage = document.getElementById('securedPage');
    const formTitle = document.getElementById('formTitle');
    const submitBtn = document.getElementById('submitBtn');
    const message = document.getElementById('message');

    message.textContent = '';
    if (formType === 'register') {
        formTitle.textContent = 'Register';
        submitBtn.textContent = 'Register';
        submitBtn.onclick = register;
    } else {
        formTitle.textContent = 'Login';
        submitBtn.textContent = 'Login';
        submitBtn.onclick = login;
    }
}

function register() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    if (users[username]) {
        message.textContent = 'Username already exists!';
        message.className = 'error';
        return;
    }
    if (username && password) {
        users[username] = password;
        saveUsers();
        message.textContent = 'Registration successful! Please login.';
        setTimeout(() => toggleForm('login'), 1000);
    } else {
        message.textContent = 'Please fill in all fields!';
        message.className = 'error';
    }
}

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');

    if (users[username] && users[username] === password) {
        document.getElementById('authContainer').style.display = 'none';
        document.getElementById('securedPage').style.display = 'block';
    } else {
        message.textContent = 'Invalid username or password!';
        message.className = 'error';
    }
}

function logout() {
    document.getElementById('authContainer').style.display = 'block';
    document.getElementById('securedPage').style.display = 'none';
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('message').textContent = '';
    toggleForm('login');
}

// Initial form setup
toggleForm('login');