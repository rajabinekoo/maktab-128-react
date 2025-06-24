### [Exercise 9](https://regexone.com/lesson/whitespaces): Matching Whitespaces

| Task  |                                  Text                                   |
| ----- | :---------------------------------------------------------------------: |
| Match |                         1.&nbsp;&nbsp;&nbsp;abc                         |
| Match |                      2.&nbsp;&nbsp;&nbsp;&nbsp;abc                      |
| Match | 3.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;abc |
| Skip  |                                  4.abc                                  |

### Solution

```
/\d\.\s+abc/g
```
