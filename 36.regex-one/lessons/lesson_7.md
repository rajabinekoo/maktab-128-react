### [Exercise 7](https://regexone.com/lesson/kleene_operators): Matching Repeated Characters

| Task  |  Text   |
| ----- | :-----: |
| Match | aaaabcc |
| Match | aabbbbc |
| Match |  aacc   |
| Skip  |    a    |

### Solution

```
/a{2,}b{0,}c{1,}/g
/aa+b*c+/g
```
