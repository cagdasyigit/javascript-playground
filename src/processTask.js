/*
  Problem: Given tasks by x parameter should be processed by priority.
  1. Task names are order numbers of items in array and they multiplied by the numbers (Task 1, Task 1, Task 1, Task 2, Task 2, etc...)
  2. Lowest number has the highest priority
  3. Lowest index has the highest priority for the same numbers
  4. It should process the dependent task first if it's greater than -1 with the same index in parameter y.
  5. No circular dependency (only one level dependency)

  Solution: Return the task name for the index given by parameter z.
*/

const { expect } = require('./utils');

// Params: x = [3, 2, 3, 1, 4], y = [-1, 4, -1, -1, 3]

const RUN_TESTS = true;

class PriorityQueue {
  queue = [];

  add(job) {
    this.queue.push(job);
    this.queue = this.queue.map((job, index) => ({
      ...job,
      prioritized: true,
      priority: index,
    }));
  }

  isPrioritized(originalIndex) {
    return (
      this.queue.find((job) => job.originalIndex === originalIndex)
        ?.prioritized || false
    );
  }

  getList() {
    return this.queue.sort((a, b) => a.priority - b.priority);
  }
}

const getTaskIndexAtCycle = (x, y, z) => {
  const pq = new PriorityQueue();

  const jobs = x
    .map((num, index) => ({
      value: num,
      originalIndex: index,
      dependencyIndex: y[index],
      prioritized: false,
    }))
    .sort((a, b) => a.value - b.value);

  jobs.forEach((job) => {
    if (job.dependencyIndex > -1 && !pq.isPrioritized(job.dependencyIndex)) {
      pq.add(jobs.find((item) => item.originalIndex === job.dependencyIndex));
    }
    if (!pq.isPrioritized(job.originalIndex)) {
      pq.add(job);
    }
  });

  const tasks = pq.getList().reduce((acc, curr) => {
    for (let i = 0; i < curr.value; i++) {
      acc.push(curr.originalIndex);
    }

    return acc;
  }, []);

  if (!RUN_TESTS) {
    console.log('tasks: ', tasks);
  }

  return tasks[z - 1];
};

if (RUN_TESTS) {
  const test1 = getTaskIndexAtCycle([3, 2, 1, 6, 3], [-1, -1, -1, -1, -1], 5);
  const test2 = getTaskIndexAtCycle(
    [4, 5, 10, 2, 3, 7],
    [-1, 0, 0, 0, 0, 0],
    5
  );
  const test3 = getTaskIndexAtCycle(
    [4, 5, 10, 2, 3, 7],
    [5, 0, 1, -1, -1, 0],
    5
  );
  const test4 = getTaskIndexAtCycle(
    [8, 20, 19, 11, 3, 14, 13, 14, 10, 14],
    [5, 0, 1, -1, -1, 0, -1, -1, 0, 2],
    27
  );
  const test5 = getTaskIndexAtCycle([1, 2], [-1, 0], 1);

  console.log('*** Process Task Tests ***');
  expect('Test 1:', test1, 0);
  expect('Test 1:', test2, 3);
  expect('Test 1:', test3, 4);
  expect('Test 1:', test4, 8);
  expect('Test 1:', test5, 0);
  console.log('*** Process Task Tests End ***');
} else {
  const task = getTaskIndexAtCycle(
    [8, 20, 19, 11, 3, 14, 13, 14, 10, 14],
    [5, 0, 1, -1, -1, 0, -1, -1, 0, 2],
    27
  );

  /* 
  Result: 
    4, 4, 4 (3)
    5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5 (14)
    0, 0, 0, 0, 0, 0, 0, 0, (8)
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8 (10)
    3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3 (11)
    6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6 (13)
    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7 (14)
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2 (19)
    9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9 (14)
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1 (20)
  */

  console.log('Task: ', task);
}
