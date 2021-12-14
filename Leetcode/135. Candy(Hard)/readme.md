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

## 思路

记：

第*i*个孩子为*k<sub>i</sub>*，他的评分为*s<sub>i</sub>*  
他左边孩子的评分*s<sub>i-1</sub>*  
他右边孩子的评分*s<sub>i+1</sub>*  

- 如果左孩子评分小于他，他的糖果数量=左孩子的糖果数量+1；
- 如果左孩子评分大于他，他的糖果数量=1；
  - 如果左孩子的糖果数量<=1，则给[0, i)每个孩子都增加1个糖果
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