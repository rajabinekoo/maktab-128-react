### [Exercise 6](https://regexone.com/problem/trimming_whitespace): Matching Lines

| Task    |                                  Text                                  |      Capture Groups      |
| ------- | :--------------------------------------------------------------------: | :----------------------: |
| Capture | &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;The quick brown fox... |  The quick brown fox...  |
| Capture |               &nbsp;&nbsp;&nbsp;jumps over the lazy dog.               | jumps over the lazy dog. |

### Solution

```
/^\s*(.*)\s*$/g
```
