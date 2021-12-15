import testCasesHelper from '../testCasesHelper';

function candy(ratings: number[]): number {
  const candies = [];
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

testCasesHelper(candy, testCases);

// to fix ts complains: Cannot redeclare block-scoped variable 'testCases'
export { };
