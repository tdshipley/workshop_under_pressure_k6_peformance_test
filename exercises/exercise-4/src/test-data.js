import http from 'k6/http';
import { check } from 'k6';

// Incomplete Code: Add code to parse the ./src/test-data.json
// file into a const
const jsonData = ''

export default function() {
    // Incomplete Code: Using your jsonData object set the username
    // and password to the values for test-user (the second entry)
    let username = "";
    let password = "";
	console.log('username: ' + username, ' / password: ' + password);

    let response = http.post('http://test.k6.io/login.php', { login: username, password: password });
    check(response, {
        'is status 200': (r) => r.status === 200,
    })
}