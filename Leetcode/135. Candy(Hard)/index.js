"use strict";
exports.__esModule = true;
var testCasesHelper_1 = require("../testCasesHelper");
function candy(ratings) {
    var candies = [];
    for (var i = 0, l = ratings.length; i < l; i++) {
        var leftRating = ratings[i - 1] || 0;
        var leftCandies = candies[i - 1] || 0;
        var currentRating = ratings[i];
        if (leftRating < currentRating) {
            candies[i] = leftCandies + 1;
        }
        else if (leftRating > currentRating) {
            candies[i] = 1;
            // move towards left to make sure the constraints are followed between
            // the left child and current child
            var k = i;
            while (0 < k) {
                var ratingsDiff = ratings[k - 1] - ratings[k];
                var candiesDiff = candies[k - 1] - candies[k];
                var leftRatingShouldHaveMoreCandies = 0 < ratingsDiff && candiesDiff <= 0;
                var leftRatingShouldHaveLessCandies = 0 > ratingsDiff && candiesDiff >= 0;
                if (leftRatingShouldHaveMoreCandies) {
                    // left child should have more candies thant current child
                    candies[k - 1] = candies[k] + 1;
                    k--;
                }
                else {
                    if (leftRatingShouldHaveLessCandies) {
                        console.error("This should not happen.\n              k: " + k + "\n              current rating: " + ratings[k] + "\n              current candies: " + candies[k] + "\n              left rating: " + ratings[k - 1] + "\n              left candies: " + candies[k - 1] + "\n\n              ratings: " + JSON.stringify(ratings) + "\n              candies: " + JSON.stringify(candies) + "\n            ");
                    }
                    break;
                }
            }
        }
        else if (leftRating === currentRating) {
            candies[i] = 1;
        }
    }
    // sum
    return candies.reduce(function (acc, current) { return acc + current; }, 0);
}
// test cases
var testCases = [
    {
        input: [
            [],
        ],
        expected: 0
    },
    {
        input: [
            [0],
        ],
        expected: 1
    },
    {
        input: [
            [1],
        ],
        expected: 1
    },
    {
        input: [
            [2],
        ],
        expected: 1
    },
    {
        input: [
            [2, 1],
        ],
        expected: 3
    },
    {
        input: [
            [1, 1],
        ],
        expected: 2
    },
    {
        input: [
            [1, 2],
        ],
        expected: 3
    },
    {
        input: [
            [1, 1, 1],
        ],
        expected: 3
    },
    {
        input: [
            [1, 2, 3],
        ],
        expected: 6
    },
    {
        input: [
            [3, 2, 1],
        ],
        expected: 6
    },
    {
        input: [
            [1, 2, 1],
        ],
        expected: 4
    },
    {
        input: [
            [1, 2, 2],
        ],
        expected: 4
    },
    {
        input: [
            [2, 1, 2],
        ],
        expected: 5
    },
    {
        input: [
            [1, 3, 2],
        ],
        expected: 4
    },
    {
        input: [
            [1, 3, 3, 2],
        ],
        expected: 6
    },
];
testCasesHelper_1["default"](candy, testCases);
