### [Exercise 8](https://regexone.com/problem/extracting_url_data): Extracting Data From URLs

| Task    |                            Text                             |         Capture Groups         |
| ------- | :---------------------------------------------------------: | :----------------------------: |
| Capture | ftp://file_server.com:21/top_secret/life_changing_plans.pdf |    ftp, file_server.com, 21    |
| Capture |      https://regexone.com/lesson/introduction#section       |      https, regexone.com       |
| Capture |               file://localhost:4040/zip_file                |     file, localhost, 4040      |
| Capture |               https://s3cur3-server.com:9999/               | https, s3cur3-server.com, 9999 |
| Capture |                market://search/angry%20birds                |         market, search         |

### Solution

```
/(\w+):\/\/([\w\.]+):(\d+)/g
```
