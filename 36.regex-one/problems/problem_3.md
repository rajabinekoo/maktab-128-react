### [Exercise 3](https://regexone.com/problem/matching_emails): Matching Emails

| Task    |               Text               | Capture Groups |
| ------- | :------------------------------: | :------------: |
| Capture |         tom@hogwarts.com         |      tom       |
| Capture |     tom.riddle@hogwarts.com      |   tom.riddle   |
| Capture | tom.riddle+regexone@hogwarts.com |   tom.riddle   |
| Capture |       tom@hogwarts.eu.com        |      tom       |
| Capture |       potter@hogwarts.com        |     potter     |
| Capture |        harry@hogwarts.com        |     harry      |
| Capture |  hermione+regexone@hogwarts.com  |    hermione    |

### Solution

```
/^([\w\.]*)/g
```
