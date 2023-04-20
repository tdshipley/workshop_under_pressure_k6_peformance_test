# Final Task: Create a Test of Golden Signals

For this final task, I would like you to consider the golden signals, which are:

Latency - How long does my API take to Respond?
Traffic - How many Requests? How many per second?
Errors - How many failed vs successful requests?
Saturation - How close is the API to 100% resource utilization?
There is a test in your source folder: `./src/golden-signals.js` take a look at it:

```
cat ./src/golden-signals.js
```

### Checkpoint:
 Ten lines of code should be in your terminal. 

</br>
<details>
    <summary>**Problem** Don't see ten lines of code? Click me for help.</summary>

You should see an output in your terminal similar to this:

```
thomas.shipley@HOME exercise-6 % cat ./src/golden-signals.js
import http from 'k6/http';
import { check } from 'k6';

export default function() {
  let url = 'https://httpbin.test.k6.io/post';
  let response = http.post(url, 'Hello world!');
  check(response, {
      'Application says hello': (r) => r.body.includes('Hello world!')
  });
} 
```

If you see an output like this:

```
cat: .golden-signals.js: No such file or directory
```

Check your terminal is in the exercise-6 folder
</details>
</br>

For this task, update the test to incorporate golden signals-based checks.
The task is deliberately open-ended, encouraging you to explore what you might implement in your test. Some ideas to get you started:

* Adding some specific checks using k6 built in metrics that correspond to
golden signals.
* Adding thresholds to define an acceptable range for a golden signal which
will cause to test to fail if missed.
* Adding your own custom metrics to define golden signal specific metrics
to conduct checks against.

Speak to your fellow workshop attendees and see what they think or ask
me for help getting started.

Remember to command to run the test using docker is:

```
docker run --rm -i grafana/k6 run - <./src/golden-signals.js
```