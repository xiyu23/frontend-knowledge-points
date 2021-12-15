/**
 * 96ms, 60%
 * @param ratings
 * @returns
 */
function candy(ratings: number[]): number {
  const candies = new Array(ratings.length).fill(1);

  // traverse from left to right
  for (let i = 1; i < ratings.length; i++) {
    if (ratings[i - 1] < ratings[i]) {
      candies[i] = candies[i - 1] + 1;
    }
  }

  // traverse from right to left
  for (let i = ratings.length - 2; 0 <= i; i--) {
    if (ratings[i + 1] < ratings[i] && candies[i] <= candies[i + 1]) {
      candies[i] = candies[i + 1] + 1;
    }
  }

  return candies.reduce((acc, cur) => acc + cur, 0);
}

export { candy as candyMethod2 };