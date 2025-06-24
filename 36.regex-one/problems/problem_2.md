### [Exercise 2](https://regexone.com/problem/matching_phone_numbers): Matching Phone Numbers

| Task    |      Text      | Capture Groups |
| ------- | :------------: | :------------: |
| Capture |  415-555-1234  |      415       |
| Capture |  650-555-2345  |      650       |
| Capture | (416)555-3456  |      416       |
| Capture |  202 555 4567  |      202       |
| Capture |   4035555678   |      403       |
| Capture | 1 416 555 9292 |      416       |

### Solution

```
/(\d{3})/
```
