type fn = (...args: any[]) => any;

interface TestCase {
  input: any[];
  // output: any;
  expected: any;
}

type TestCases = TestCase[];

export default function testCasesHelper(func: fn, testCases: TestCases) {
  let failureNum = 0;
  for (let i = 0, l = testCases.length; i < l; i++) {
    const testCase = testCases[i];
    const {
      input,
      expected,
    } = testCase;
    const result = func(...input);
    if (expected !== result) {
      failureNum += 1;
      console.error(`test case at index ${i} failed. expected: ${expected} but got: ${result}.
        input: ${JSON.stringify(input)}
      `);
    }
  }
  if (failureNum === 0) {
    console.log(`all test cases(${testCases.length}) passed!`);
  } else {
    console.error(`test cases passed: ${testCases.length - failureNum}/${testCases.length}`);
  }
}