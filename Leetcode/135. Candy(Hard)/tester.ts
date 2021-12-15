import testCasesHelper from '../testCasesHelper';
import { candyMethod1 } from './index';
import { candyMethod2 } from './index2';

// test cases
const testCases = [
  {
    input: [
      [],
    ],
    expected: 0,
  },
  {
    input: [
      [0],
    ],
    expected: 1,
  },
  {
    input: [
      [1],
    ],
    expected: 1,
  },
  {
    input: [
      [2],
    ],
    expected: 1,
  },
  {
    input: [
      [2, 1],
    ],
    expected: 3,
  },
  {
    input: [
      [1, 1],
    ],
    expected: 2,
  },
  {
    input: [
      [1, 2],
    ],
    expected: 3,
  },
  {
    input: [
      [1, 1, 1],
    ],
    expected: 3,
  },
  {
    input: [
      [1, 2, 3],
    ],
    expected: 6,
  },
  {
    input: [
      [3, 2, 1],
    ],
    expected: 6,
  },
  {
    input: [
      [1, 2, 1],
    ],
    expected: 4,
  },
  {
    input: [
      [1, 2, 2],
    ],
    expected: 4,
  },
  {
    input: [
      [2, 1, 2],
    ],
    expected: 5,
  },
  {
    input: [
      [1, 3, 2],
    ],
    expected: 4,
  },
  {
    input: [
      [1, 3, 3, 2],
    ],
    expected: 6,
  },
  {
    input: [
      [1, 3, 3, 2],
    ],
    expected: 6,
  },
];

console.log('test candy method1');
testCasesHelper(candyMethod1, testCases);

console.log('test candy method2');
testCasesHelper(candyMethod2, testCases);
