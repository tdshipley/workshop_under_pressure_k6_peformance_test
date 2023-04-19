import http from 'k6/http';
import { check } from 'k6';

let usernameArr = ['admin', 'test_user'];
let passwordArr = ['123', '1234'];

export default function() {

    // Get random username and password from array
    let rand = Math.floor(Math.random() * 2);
    let username = usernameArr[rand];
    let password = passwordArr[rand];
	console.log('username: ' + username, ' / password: ' + password);

    let response = http.post('http://test.k6.io/login.php', { login: username, password: password });
    check(response, {
        'is status 200': (r) => r.status === 200,
    })
}