### [Exercise 12](https://regexone.com/lesson/nested_groups): Matching Nested Groups

| Task    |   Text   | Capture Groups |
| ------- | :------: | -------------- |
| Capture | Jan 1987 | Jan 1987, 1987 |
| Capture | May 1969 | May 1969, 1969 |
| Capture | Aug 2011 | Aug 2011, 2011 |

### Solution

```
/(\w+ (\d+))/g
```
