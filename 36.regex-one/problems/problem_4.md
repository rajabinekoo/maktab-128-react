### [Exercise 4](https://regexone.com/problem/matching_html): Capturing HTML Tags

| Task    |                  Text                   | Capture Groups |
| ------- | :-------------------------------------: | :------------: |
| Capture |          <a>This is a link</a>          |       a        |
| Capture | <a href='https://regexone.com'>Link</a> |       a        |
| Capture |   <div class='test_style'>Test</div>    |      div       |
| Capture |   <div>Hello <span>world</span></div>   |      div       |

### Solution

```
/<(\w+)/g
```
