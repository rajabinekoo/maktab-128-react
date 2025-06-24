### [Exercise 13](https://regexone.com/lesson/more_groups): Matching Nested Groups

| Task    |   Text    | Capture Groups |
| ------- | :-------: | -------------- |
| Capture | 1280x720  | 1280, 720      |
| Capture | 1920x1600 | 1920, 1600     |
| Capture | 1024x768  | 1024, 768      |

### Solution

```
/(\d{4,})x(\d{3,})/g
/(\d+)x(\d+)/g
```
