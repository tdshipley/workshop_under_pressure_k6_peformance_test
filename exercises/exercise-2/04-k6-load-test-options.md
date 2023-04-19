# k6 Load Test Options

Up until now, you've been running the same script with a single VU and a single iteration. In this section, you'll learn how to scale that out and run a full-sized load test against your application.

Test options are configuration values that affect how your test script is executed, such as the number of VUs or iterations, the duration of your test, and more. They are also sometimes called "test parameters".

k6 comes with some default test options, but there are four different ways to change the test parameters for a script:
1. You can include command-line flags when running a k6 script (such as `k6 run --vus 10 --iterations 30`).
2. You can define [environment variables](https://k6.io/docs/using-k6/environment-variables/) on the command-line that are passed to the script.
3. You can define them within the test script itself.
4. You can include a configuration file.

For now, you'll learn to do the third option: defining test parameters within the script itself. The advantages of this approach are:
- Simplicity: no extra files or commands are required.
- Repeatability: Adding these parameters to the script make it easier for a colleague to run tests you've written.
- Version controllability: Changes to the test parameters can be tracked along with test code.

To use test options within a script, add the following lines to your script. By convention, it's best to add it after the import statements and before the default function, so that the options are easily read upon opening the script:

```js
export let options = {
  vus: 10,
  iterations: 40,
};
```

If you set multiple options, make sure you end each one with  `,`.

## VUs

```js
vus: 10,
```

In this line, you can change the number of virtual users that k6 will run.

Note that if you only define VUs and no other test options, you may get the following error:

```plain
          /\      |‾‾| /‾‾/   /‾‾/   
     /\  /  \     |  |/  /   /  /    
    /  \/    \    |     (   /   ‾‾\  
   /          \   |  |\  \ |  (‾)  | 
  / __________ \  |__| \__\ \_____/ .io

WARN[0000] the `vus=10` option will be ignored, it only works in conjunction with `iterations`, `duration`, or `stages` 
  execution: local
     script: test.js
     output: -
```

If you set the number of VUs, you need to additionally specify how long those users should be executed for, using one of the following options:
- iterations
- durations
- stages

## Iterations

```js
  vus: 10,
  iterations: 40,
```

Setting the number of iterations in test options defines it for *all* users. In the example above, the test will run for a total of 40 iterations, with each of the 10 users executing the script exactly 4 times.

## Duration

```js
  vus: 10,
  duration: '2m'
```

Setting the duration instructs k6 to repeat (iterate) the script for each of the specified number of users until the duration is reached.

Duration can be set using `h` for hours, `m` for minutes, and `s` for seconds, like these examples:
- `duration: '1h30m'`
- `duration: '30s'`
- `duration: '5m30s'`

If you set duration but don't specify a number of VUs, k6 will use the default VU number of 1.

If you set the duration in conjunction with setting the number of iterations, the value that ends earlier is used. For example, given the following options:

```js
  vus: 10,
  duration: '5m',
  iterations: 40,
```

k6 will execute the test for 40 iterations or 5 minutes, *whichever ends earlier*. If it takes 1 minute to finish 40 total iterations, the test will end after 1 minute. If it takes 10 minutes to finish 40 total iterations, the test will end after 5 minutes.

### Stages

Defining iterations and durations both cause k6 to execute your test script using a [simple load profile](../XX-Future-Ideas/Parameters-of-a-load-test.md#Simple-load-profile): VUs are started, sustained for a certain time or number of iterations, and then ended.

![A simple load profile](./images/load_profile-no_ramp-up_or_ramp-down.png)

_Simple load profile_

What if you want to add a [ramp-up or ramp-down](../XX-Future-Ideas/Parameters-of-a-load-test.md#ramp-up-and-ramp-down-periods), so that the profile looks more like this?

![Constant load profile, with ramps](./images/load_profile-constant.png)

_Constant load profile, with ramps_

In that case, you may want to use [stages](https://k6.io/docs/using-k6/options/#stages).

```js
export let options = {
  stages: [
    { duration: '30m', target: 100 },
    { duration: '1h', target: 100 },
    { duration: '5m', target: 0 },
  ],
};
```

The stages option lets you define different steps or phases for your load test, each of which can be configured with a number of VUs and duration. The example above consists of three steps (but you can add more if you'd like).

1. The first step is a gradual ramp-up from 0 VUs to 100 VUs.
2. The second step defines the [steady state](../XX-Future-Ideas/Parameters-of-a-load-test.md#Steady-state). The load is held constant at 100 VUs for 1 hour.
3. Then, the third step is a gradual ramp-down from 100 VUs back to 0, at which point the test ends.

Stages are the most versatile way to define test parameters for a single scenario. They give you flexibility in shaping the load of your test to match the situation in production that you're trying to simulate.

## The full script so far

If you're using stages, here's what your script should look like so far:

```js
import http from 'k6/http';
import sleep from 'k6';

export let options = {
  stages: [
    { duration: '30m', target: 100 },
    { duration: '1h', target: 100 },
    { duration: '5m', target: 0 },
  ],
};

export default function() {
  let url = 'https://httpbin.test.k6.io/post';
  let response = http.post(url, 'Hello world!');
  sleep(Math.random() * 5);
}
```

## Test your knowledge

In your `./src` folder is a test called `stages-of-testing.js`. Use the cat command below to take a quick look at it in your terminal:

```
cat ./src/stages-of-testing.js
```

### Checkpoint:
 Fourteen lines of code should be in your terminal. 

</br>
<details>
    <summary>**Problem** Don't see fourteen lines of code? Click me for help.</summary>

You should see an output in your terminal similar to this:

```
thomas.shipley@HOME exercise-2 % cat ./src/stages-of-testing.js
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
```

If you see an output like this:

```
cat: .stages-of-testing.js: No such file or directory
```

Check your terminal is in the exercise-2 folder
</details>
</br>

It looks like some code is missing! Your task is to add the missing code back into the script.
Each `Code Missing:` comment in the script will tell you what the code should do.

For this exercise, you have three `Code Missing` tasks:

1. Add an options object which creates two stages in your test that last one minute each.
2. Make a get request using K6 to the URL above

Once done, run your test and it should execute in stages!

```
docker run --rm -i grafana/k6 run - <./src/stages-of-testing.js
```

Move on to [05-k6-results-output-options.md](05-k6-results-output-options.md)