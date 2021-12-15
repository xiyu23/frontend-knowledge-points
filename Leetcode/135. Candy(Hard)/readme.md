## 题目描述
一群孩子站成一排，每一个孩子有自己的评分。现在需要给这些孩子发糖果，规则是如果一
个孩子的评分比自己身旁的一个孩子要高，那么这个孩子就必须得到比身旁孩子更多的糖果；所
有孩子至少要有一个糖果。求解最少需要多少个糖果。

## 输入输出样例
输入是一个数组，表示孩子的评分。输出是最少糖果的数量

```
Input: [1,0,2]
Output: 5
```

## 思路一

记：

第*i*个孩子为*k<sub>i</sub>*，他的评分为*s<sub>i</sub>*  
他左边孩子的评分*s<sub>i-1</sub>*  
他右边孩子的评分*s<sub>i+1</sub>*  

- 如果左孩子评分小于他，他的糖果数量=左孩子的糖果数量+1；
- 如果左孩子评分大于他，他的糖果数量=1；
  - 如果左孩子的糖果数量<=1，则给[0, i)每个孩子都增加1个糖果（buggy#1）
- 如果左孩子评分等于他，他的糖果数量=1； 
- 如果没有左孩子，则他的糖果数量=1

现在这i个孩子是稳定的了；

令i = i+1，然后再执行上述过程

时间复杂度：N^2（遍历一遍数组，对某个孩子可能需要回溯左边的孩子，即1+2+...+N）

空间复杂度：N（需要一个数组记录每个人分配到的糖果数）

伪代码：
```
let i = 0
let candies = [];
for each score in scores
  leftKidScore = scores[i - 1] || 0
  leftKidCandies = candies[i - 1] || 0
  if (leftKidScore < score) {
    candies[i] = leftKidCandies + 1
  } else if (leftKidScore > score) {
    candies[i] = 1
    if (leftKidCandies <= 1) {
      for each kid in kids in [0, i)
        candies[j]++
    }
  } else if (leftKidScore === score) {
    candies[i] = 1
  }
  i++

result = candies.reduce((acc, current) => {
  return acc + current
})
```

buggy#1处是有问题的，如[1,3,3,2]。

这里不能简单地给左侧每个孩子都+1，没必要。只要判断当前孩子和左边孩子的糖果数，如果左边评分大但是糖果小于等于当前孩子，那么左孩子糖果数等于当前孩子糖果数+1；并且需要继续向左侧遍历，因为左孩子的数量增加了，那么他的左孩子如果评分比他还要高，也需要比较他们俩的糖果数。当然这里不会出现左孩子评分低，但右孩子的糖果数还不比他多的情况，因为如果这个发生，就意味着之前的状态已经是错误的。

## 思路二（我没想到）

时间复杂度：O(N) * 2

初始化时给每个孩子1个糖果，然后先从左向右遍历，右孩子比左孩子分高，则右孩子的糖果数=左孩子糖果数+1；再从右向左遍历，如果左孩子比右孩子分高，且糖果数不大于右孩子的糖果数，则左孩子糖果数=右孩子糖果数+1。

太巧妙了。

为什么这样遍历两次就可以？

一个孩子需要和相邻的两个孩子对比，可以看成两步骤。对这一列中的每个孩子k<sub>i</sub>，先保证他相比于左边的孩子，满足题干规则。那就从左向右遍历，只看左边的这个k<sub>i-1</sub>与自己的关系；遍历完成后，每个孩子相较于左边的孩子，糖果数是符合题干约束的。第二次再考虑他和右边孩子的关系，从最右侧开始向左遍历， 如果左孩子比右孩子大，且糖果数不大于右孩子，那么令左孩子糖果数=右孩子糖果数+1。

两次遍历完成后，对任意一个孩子而言，左、右两侧孩子与自己的关系已经正确了。

伪代码
```
assign 1 candy for every children

// starts from [1]
for each rating in ratings
  if (leftRating < rating) {
    candies[i] = candies[i-1] + 1
  }

// starts from [len - 2]
for each rating in ratings
  if (rightRating < rating && rightCandies >= currentCandies) {
    candies[i] = candies[i + 1] + 1
  }

result = candies.reduce((acc, current) => {
  return acc + current
})
```