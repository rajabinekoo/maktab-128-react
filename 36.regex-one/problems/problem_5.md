### [Exercise 5](https://regexone.com/problem/matching_filenames): Capturing Filename Data

| Task    |        Text         |    Capture Groups    |
| ------- | :-----------------: | :------------------: |
| Skip    |    .bash_profile    |                      |
| Skip    |    workspace.doc    |                      |
| Capture |     img0912.jpg     |     img0912, jpg     |
| Capture | updated_img0912.png | updated_img0912, png |
| Skip    | documentation.html  |                      |
| Capture |     favicon.gif     |     favicon, gif     |
| Skip    |   img0912.jpg.tmp   |                      |
| Skip    |     access.lock     |                      |

### Solution

```
/^(\w+).(jpg|png|gif)$/g
```
