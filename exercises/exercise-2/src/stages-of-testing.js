import http from 'k6/http';
import sleep from 'k6';


// Code Missing: Add options to create two stages
// in your test run one of one minute
// and another of two minutes 

export default function() {
  let url = 'https://test.k6.io/contacts.php';
  // Code Missing: Make a get request using k6 to
  // the URL above.
  sleep(Math.random() * 5);
}