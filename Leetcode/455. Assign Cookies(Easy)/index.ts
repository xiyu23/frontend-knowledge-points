function assignCookies(kids: number[], cookies: number[]): number {
  kids.sort((a, b) => a - b);
  cookies.sort((a, b) => a - b);

  let i = 0; // kid's index
  let j = 0; // cookies' index
  const kidsLen = kids.length;
  const cookiesLen = cookies.length;
  while (i < kidsLen) {
    const kidHungry = kids[i];
    while (j < cookiesLen && cookies[j] < kidHungry) {
      j++;
    }
    if (j === cookiesLen) {
      return i;
    }
    i++;
    j++;
  }
  return i;
}

// test cases
const testCases = [
  { kids: [], cookies: [], expected: 0, },
  { kids: [], cookies: [1, 2], expected: 0, },
  { kids: [1], cookies: [], expected: 0, },
  { kids: [1, 2], cookies: [1, 2], expected: 2, },
  { kids: [1, 3], cookies: [2, 2], expected: 1, },
  { kids: [3, 4], cookies: [2, 2], expected: 0, },
  { kids: [1, 2], cookies: [1, 2, 2], expected: 2, },
  { kids: [1, 2], cookies: [1, 1, 1], expected: 1, },
  { kids: [2, 2], cookies: [1, 1, 1], expected: 0, },
  { kids: [1, 2, 2], cookies: [1, 1], expected: 1, },
  { kids: [2, 2, 2], cookies: [1, 1], expected: 0, },
  { kids: [3, 4], cookies: [4, 5, 6], expected: 2, },
];

let failureNum = 0;
for (let i = 0, l = testCases.length; i < l; i++) {
  const testCase = testCases[i];
  const {
    kids,
    cookies,
    expected,
  } = testCase;
  const result = assignCookies(kids, cookies);
  if (result !== expected) {
    failureNum += 1;
    console.error(`test case at index ${i} failed. expected: ${expected} but got: ${result}.
      kids: ${JSON.stringify(kids)}
      cookies: ${JSON.stringify(cookies)}}
    `);
  }
}
if (failureNum === 0) {
  console.log(`all test cases passed!`);
} else {
  console.error(`test cases passed: ${testCases.length - failureNum}/${testCases.length}`);
}

export { };
