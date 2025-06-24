### [Exercise 6](https://regexone.com/lesson/repeating_characters): Matching Repeated Characters

| Task  |   Text    |
| ----- | :-------: |
| Match | wazzzzzup |
| Match |  wazzzup  |
| Skip  |   wazup   |

### Solution

```
/waz{2,}up/g
```
