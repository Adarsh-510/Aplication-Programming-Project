import { getCookie } from "../../globalFiles/externalLogic.js";

if (getCookie('userID')) {
  window.location = '../Profile/profile.html';
}

let data;
const signup = document.getElementById('signup');
const signin = document.getElementById('signin');
const error = document.getElementById('error');

if(signup) signup.addEventListener('submit', (event) => {
  event.preventDefault();

  const userID = document.getElementById('userID').value;
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const repassword = document.getElementById('repassword').value;
  console.log(userID + ' ' + username + ' ' + password);

  if (password != repassword) {
    error.innerHTML = 'Re-entered password should match the password.'
    return;
  }

  data = { userID: userID, username: username, password: password, create: true };
  sendFetch();
});

if (signin) signin.addEventListener('submit', (event) => {
  event.preventDefault();
  
  console.log("in signin");

  const user = document.getElementById('user').value;
  const password = document.getElementById('password').value;
  console.log(user + password);

  data = { user: user, password: password, create: false };
  sendFetch();
});

async function sendFetch() {
  console.log('fetch request');
  const response = await fetch('../../API/authenticate.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });

  let result = await response.json();
  let status = result.status;
  error.innerHTML = status;

  if (getCookie('userID')) {
    window.location = '../Profile/profile.html';
  }
}