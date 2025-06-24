### [Exercise 4](https://regexone.com/lesson/excluding_characters): Excluding Characters

| Task  | Text |
| ----- | :--: |
| Match | hog  |
| Match | dog  |
| Skip  | bog  |

### Solution

```
/[hd]og/g
/[^b]og/g
```
