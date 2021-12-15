"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function testCasesHelper(func, testCases) {
    var failureNum = 0;
    for (var i = 0, l = testCases.length; i < l; i++) {
        var testCase = testCases[i];
        var input = testCase.input, expected = testCase.expected;
        var result = func.apply(void 0, input);
        if (expected !== result) {
            failureNum += 1;
            console.error("test case at index " + i + " failed. expected: " + expected + " but got: " + result + ".\n        input: " + JSON.stringify(input) + "\n      ");
        }
    }
    if (failureNum === 0) {
        console.log("all test cases(" + testCases.length + ") passed!");
    }
    else {
        console.error("test cases passed: " + (testCases.length - failureNum) + "/" + testCases.length);
    }
}
exports.default = testCasesHelper;
