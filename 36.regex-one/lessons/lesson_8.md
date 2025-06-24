### [Exercise 8](https://regexone.com/lesson/optional_characters): Matching Optional Characters

| Task  |      Text       |
| ----- | :-------------: |
| Match |  1 file found?  |
| Match |  2 file found?  |
| Match | 24 files found? |
| Skip  | No files found. |

### Solution

```
/\d+ file[s]? found[?]/g
```
