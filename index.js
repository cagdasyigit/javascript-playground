const {
  EXECUTE_PROCESS_TASK,
  EXECUTE_VALIDATE_CHAR_PAIRS,
} = require('./src/constants.js');

if (EXECUTE_PROCESS_TASK) {
  require('./src/challenges/processTask.js');
}

if (EXECUTE_VALIDATE_CHAR_PAIRS) {
  require('./src/challenges/validateCharPairs.js');
}
