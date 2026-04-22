import { getCookie } from "./externalLogic.js";

const userID = getCookie('userID');

if (userID) {
  document.getElementById('loginButton').style.display = 'none';
  document.getElementById('profileButton').style.display = 'span';
} else {
  document.getElementById('loginButton').style.display = 'span';
  document.getElementById('profileButton').style.display = 'none';
}