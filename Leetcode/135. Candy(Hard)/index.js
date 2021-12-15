"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candyMethod1 = void 0;
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
exports.candyMethod1 = candy;
