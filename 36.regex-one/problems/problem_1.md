### [Exercise 1](https://regexone.com/problem/matching_decimal_numbers): Matching Numbers

| Task  |    Text    |
| ----- | :--------: |
| Match |  3.14529   |
| Match |  -255.34   |
| Match |    128     |
| Match |   1.9e10   |
| Match | 123,340.00 |
| Skip  |    720p    |

### Solution

```
^-?\d+(,\d+)*(\.\d+(e\d+)?)?$
```
