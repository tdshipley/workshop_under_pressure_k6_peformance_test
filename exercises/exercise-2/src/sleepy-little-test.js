import http from 'k6/http';
// Code Missing: Import the sleep method from k6

export default function() {
  let url = 'https://httpbin.test.k6.io/post';
  // The next line shows you how to post a string
  // to a URL and save the response. Handy.
  let response = http.post(url, 'Hello world!');

  // Let's just log the response to console for now
  // later we will talk about checks instead.
  console.log(response)
  
  // Code Missing: Add a random sleep time below of 3 seconds.

  // Code Missing: Add a random sleep between
  //               1 and 3 seconds below using randomIntBetween.
}