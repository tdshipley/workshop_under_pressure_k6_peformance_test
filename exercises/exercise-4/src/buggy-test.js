import http from 'k6/http';

let usernameArr = ['admin', 'test_user', 'guest'];
let passwordArr = ['123', '1234', '12345'];

export default function() {
    // Get random username and password from array
    let rand = Math.floor(Math.random() * 3);
    let username = usernameArr[rand];
    let password = passwordArr[rand];

    http.post('http://test.k6.io/login.php', { login: username, password: password });
}