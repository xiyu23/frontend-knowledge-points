/**
 * 1664ms, 13%
 * @param ratings
 * @returns
 */
function candy(ratings: number[]): number {
  const candies: number[] = [];
  for (let i = 0, l = ratings.length; i < l; i++) {
    const leftRating = ratings[i - 1] || 0;
    const leftCandies = candies[i - 1] || 0;
    const currentRating = ratings[i];
    if (leftRating < currentRating) {
      candies[i] = leftCandies + 1;
    } else if (leftRating > currentRating) {
      candies[i] = 1;
      // move towards left to make sure the constraints are followed between
      // the left child and current child
      let k = i;
      while (0 < k) {
        const ratingsDiff = ratings[k - 1] - ratings[k];
        const candiesDiff = candies[k - 1] - candies[k];
        const leftRatingShouldHaveMoreCandies = 0 < ratingsDiff && candiesDiff <= 0;
        const leftRatingShouldHaveLessCandies = 0 > ratingsDiff && candiesDiff >= 0;
        if (leftRatingShouldHaveMoreCandies) {
          // left child should have more candies thant current child
          candies[k - 1] = candies[k] + 1;
          k--;
        } else {
          if (leftRatingShouldHaveLessCandies) {
            console.error(`This should not happen.
              k: ${k}
              current rating: ${ratings[k]}
              current candies: ${candies[k]}
              left rating: ${ratings[k - 1]}
              left candies: ${candies[k - 1]}

              ratings: ${JSON.stringify(ratings)}
              candies: ${JSON.stringify(candies)}
            `);
          }
          break;
        }
      }
    } else if (leftRating === currentRating) {
      candies[i] = 1;
    }
  }

  // sum
  return candies.reduce((acc, current) => acc + current, 0);
}

// to fix ts complains: Cannot redeclare block-scoped variable 'testCases'
export { candy as candyMethod1 };
