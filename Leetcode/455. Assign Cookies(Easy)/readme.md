## 题目描述
有一群孩子和一堆饼干，每个孩子有一个饥饿度，每个饼干都有一个大小。每个孩子只能吃
最多一个饼干，且只有饼干的大小大于孩子的饥饿度时，这个孩子才能吃饱。求解最多有多少孩
子可以吃饱。

## 输入输出样例
输入两个数组，分别代表孩子的饥饿度和饼干的大小。输出最多有多少孩子可以吃饱的数
量。
```
Input: [1,2], [1,2,3]
Output: 2
```

## 思路

让孩子吃饱，饼干的大小必须大于孩子的饥饿度，那对饼干、孩子饥饿度按升序排列。
记最小饥饿度孩子为k0，他的饥饿度为h0，能满足k0的最小饼干为ci（i为下标），这里h0 <= ci。

伪代码：
```
对孩子的饥饿度、饼干大小按升序排序
let j = 0;
for each kid in kids {
  let h be the kid's hungry
  // find the first cookie could satisfy this kid's hungry
  while (j < cookiesLength && cookies[j] < h) {
    j++
  }
  if (j === cookies.length) {
    // means that no cookie could satisfy the kid's hungry
    return current index of kid
  }
  
  // cookie at index j is available
  let kid be the next kid
  j++
}
// result is the lastest kid's index
```

复杂度：

时间复杂度：nlogn * 2 + n

空间复杂度：1

