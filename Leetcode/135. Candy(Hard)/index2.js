"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candyMethod2 = void 0;
function candy(ratings) {
    var candies = new Array(ratings.length).fill(1);
    // traverse from left to right
    for (var i = 1; i < ratings.length; i++) {
        if (ratings[i - 1] < ratings[i]) {
            candies[i] = candies[i - 1] + 1;
        }
    }
    // traverse from right to left
    for (var i = ratings.length - 2; 0 <= i; i--) {
        if (ratings[i + 1] < ratings[i] && candies[i] <= candies[i + 1]) {
            candies[i] = candies[i + 1] + 1;
        }
    }
    return candies.reduce(function (acc, cur) { return acc + cur; }, 0);
}
exports.candyMethod2 = candy;
