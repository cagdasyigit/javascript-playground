const expect = (name, input, expectedResult) => {
  console.log(name, input === expectedResult ? 'Pass' : 'Fail');
};

module.exports = {
  expect,
};
