# Exercise 2 - Getting Started with k6

:wave:

Welcome to exercise two of the workshop! Using k6.io, we are going to create performance tests written in JavaScript. Before getting started - the prerequisites.

## Prerequisites

For this workshop, you will need:

1. [Docker](https://docs.docker.com/get-docker/)

    The latest version should work. But if not, try Docker version 20.10.17, build 100c701, which the author used at the time of writing.


2. Text Editor or IDE. Such as [VSCode](https://code.visualstudio.com/)
4. Basic familiarity with JavaScript
3. **Windows Users** A bash-style terminal. Such as [cmder](https://cmder.app/)

We will not be installing k6 locally during this workshop. All the scripts we execute today will be via a docker image containing k6 instead. However, if you want to know more about how to install k6, follow the [Installation Guide](https://k6.io/docs/get-started/installation/)

## Running your first test

Look in the `./src` folder for this exercise and see a file called `my-first-k6-test.js.` this is your first test. Let's look at the source in your command line run:

```
cat ./src/my-first-k6-test.js
```

### Checkpoint:
 Seven lines of code should be in your terminal. 

</br>
<details>
    <summary>**Problem** Don't see seven lines of code? Click me for help.</summary>

You should see an output in your terminal similar to this:

```
thomas.shipley@HOME exercise-2 % cat ./src/my-first-k6-test.js
import http from 'k6/http';
import { sleep } from 'k6';

export default function () {
 http.get('https://test.k6.io');
 sleep(1);
}%  
```

If you see an output like this:

```
cat: .my-first-k6-test.js: No such file or directory
```

Check your terminal is in the exercise-2 folder
</details>
</br>

These seven lines are enough to create a performance test. To begin, let's consider what each section does. The first two lines:

```
import http from 'k6/http';
import { sleep } from 'k6';
```

These lines import two core parts of k6 functionality you will need for nearly all your tests:

* [http](https://k6.io/docs/javascript-api/k6-http/) a module to interact with HTTP APIs
* [sleep](https://k6.io/docs/javascript-api/k6/sleep/) is a function which creates a thread sleep. 

Next, your test is the default function which k6 will execute when called. It has two key lines:

```
export default function () {
  http.get('https://test.k6.io');
  sleep(1);
}
```

The `http.get('https://test.k6.io');` line makes a get request to the k6 test page for performance testing. Finally, the `sleep(1);` causes the thread to sleep for one second. That is it your first test done! Let's run it:

```
docker run --rm -i grafana/k6 run - <./src/my-first-k6-test.js
```

If everything worked you should see an output like this:

```
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

  execution: local
     script: -
     output: -

  scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
           * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)


running (00m01.0s), 1/1 VUs, 0 complete and 0 interrupted iterations
default   [   0% ] 1 VUs  00m01.0s/10m0s  0/1 iters, 1 per VU

     data_received..................: 17 kB 10 kB/s
     data_sent......................: 438 B 268 B/s
     http_req_blocked...............: avg=483.35ms min=483.35ms med=483.35ms max=483.35ms p(90)=483.35ms p(95)=483.35ms
     http_req_connecting............: avg=135.1ms  min=135.1ms  med=135.1ms  max=135.1ms  p(90)=135.1ms  p(95)=135.1ms 
     http_req_duration..............: avg=147.38ms min=147.38ms med=147.38ms max=147.38ms p(90)=147.38ms p(95)=147.38ms
       { expected_response:true }...: avg=147.38ms min=147.38ms med=147.38ms max=147.38ms p(90)=147.38ms p(95)=147.38ms
     http_req_failed................: 0.00% ✓ 0        ✗ 1  
     http_req_receiving.............: avg=271.69µs min=271.69µs med=271.69µs max=271.69µs p(90)=271.69µs p(95)=271.69µs
     http_req_sending...............: avg=41.23µs  min=41.23µs  med=41.23µs  max=41.23µs  p(90)=41.23µs  p(95)=41.23µs 
     http_req_tls_handshaking.......: avg=164.6ms  min=164.6ms  med=164.6ms  max=164.6ms  p(90)=164.6ms  p(95)=164.6ms 
     http_req_waiting...............: avg=147.06ms min=147.06ms med=147.06ms max=147.06ms p(90)=147.06ms p(95)=147.06ms
     http_reqs......................: 1     0.611898/s
     iteration_duration.............: avg=1.63s    min=1.63s    med=1.63s    max=1.63s    p(90)=1.63s    p(95)=1.63s   
     iterations.....................: 1     0.611898/s
     vus............................: 1     min=1      max=1
     vus_max........................: 1     min=1      max=1


running (00m01.6s), 0/1 VUs, 1 complete and 0 interrupted iterations
default ✓ [ 100% ] 1 VUs  00m01.6s/10m0s  1/1 iters, 1 per VU
```

## Test your knowledge

Create a new JavaScript file in the `./src` folder and call it `my-second-k6-test.js` in it create a new test which:

1. Makes a HTTP Get request to `https://test.k6.io/news.php`
2. Waits for `3 seconds` after making the request.

Then update the docker command above to run your test and watch the result.

<details>
<summary>Need help with docker command? Click here.</summary>
To run your test with Docker take the previous Docker command and replace the path with your new script name:

```
docker run --rm -i grafana/k6 run - <./src/my-second-k6-test.js
```
</details>
</br>

Now you can execute a test let's learn more about understanding the results. Move on to [02-Understanding-k6-results.md](02-Understanding-k6-results.md)