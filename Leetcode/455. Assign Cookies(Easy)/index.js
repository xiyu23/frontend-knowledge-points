function assignCookies(kids, cookies) {
    kids.sort(function (a, b) { return a - b; });
    cookies.sort(function (a, b) { return a - b; });
    var i = 0; // kid's index
    var j = 0; // cookies' index
    var kidsLen = kids.length;
    var cookiesLen = cookies.length;
    while (i < kidsLen) {
        var kidHungry = kids[i];
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
var testCases = [
    { kids: [], cookies: [], expected: 0 },
    { kids: [], cookies: [1, 2], expected: 0 },
    { kids: [1], cookies: [], expected: 0 },
    { kids: [1, 2], cookies: [1, 2], expected: 2 },
    { kids: [1, 3], cookies: [2, 2], expected: 1 },
    { kids: [3, 4], cookies: [2, 2], expected: 0 },
    { kids: [1, 2], cookies: [1, 2, 2], expected: 2 },
    { kids: [1, 2], cookies: [1, 1, 1], expected: 1 },
    { kids: [2, 2], cookies: [1, 1, 1], expected: 0 },
    { kids: [1, 2, 2], cookies: [1, 1], expected: 1 },
    { kids: [2, 2, 2], cookies: [1, 1], expected: 0 },
    { kids: [3, 4], cookies: [4, 5, 6], expected: 2 },
];
var failureNum = 0;
for (var i = 0, l = testCases.length; i < l; i++) {
    var testCase = testCases[i];
    var kids = testCase.kids, cookies = testCase.cookies, expected = testCase.expected;
    var result = assignCookies(kids, cookies);
    if (result !== expected) {
        failureNum += 1;
        console.error("test case at index " + i + " failed. expected: " + expected + " but got: " + result + ".\n      kids: " + JSON.stringify(kids) + "\n      cookies: " + JSON.stringify(cookies) + "}\n    ");
    }
}
if (failureNum === 0) {
    console.log("all test cases passed!");
}
else {
    console.error("test cases passed: " + (testCases.length - failureNum) + "/" + testCases.length);
}
