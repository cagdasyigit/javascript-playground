/*
  Problem: Open and close characters should match inside the given parameter as a string.
  Correct examples: [()], {}, ({[]}), etc
  Incorrect examples: [, (}){, {], etc
*/

const { expect } = require('../utils');

const RUN_TESTS = true;

const validate = (str) => {
  if (str.length === 0) {
    return true;
  } else if (str.length % 2 !== 0) {
    return false;
  }

  const pairs = {
    ')': '(',
    '}': '{',
    ']': '[',
  };

  for (let char of str) {
    if (pairs[char]) {
      const index = str.indexOf(char);

      if (str[index - 1] === pairs[char]) {
        const newStr =
          str.slice(0, index - 1) + str.slice(index + 1, str.length);
        return newStr.length === 0 ? true : validate(newStr);
      } else {
        return false;
      }
    }
  }

  return false;
};

if (RUN_TESTS) {
  console.log('*** Validate Char Pairs Tests ***');
  expect('Test 1:', validate(''), true);
  expect('Test 2:', validate('[({})]'), true);
  expect('Test 3:', validate('[({)]'), false);
  expect('Test 4:', validate('[(}{)]'), false);
  expect('Test 5:', validate('[(){}]'), true);
  console.log('*** Validate Char Pairs Tests End ***');
} else {
  const isValid = validate('[({)}]');
  console.log(isValid);
}
