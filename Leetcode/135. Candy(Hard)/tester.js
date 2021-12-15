"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testCasesHelper_1 = require("../testCasesHelper");
var index_1 = require("./index");
var index2_1 = require("./index2");
// test cases
var testCases = [
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
testCasesHelper_1.default(index_1.candyMethod1, testCases);
console.log('test candy method2');
testCasesHelper_1.default(index2_1.candyMethod2, testCases);
