const registerEmail = document.getElementById("registerEmail");
const registerPassword = document.getElementById("registerPassword");
const loginEmail = document.getElementById("loginEmail");
const loginPassword = document.getElementById("loginPassword");

function login(event) {
  event.preventDefault();
  const email = loginEmail.value;
  const password = loginPassword.value;
  console.log(email);
  console.log(password);
  fetch('http://localhost:3000/login', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  }).then(r => console.log(r))
}
function register() {
  const email = registerEmail.value;
  const password = registerPassword.value;
  fetch('http://localhost:3000/register', {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to register');
      }
      return response.json();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function logout() {
  fetch('http://localhost:3000/logout', {
    method: 'POST',
    credentials: 'same-origin',
  })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        localStorage.removeItem('loggedIn');
      } else {
        console.error('Failed to logout');
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
}
