### [Exercise 11](https://regexone.com/lesson/capturing_groups): Matching Groups

| Task    |            Text            | Capture Groups         |
| ------- | :------------------------: | ---------------------- |
| Capture | file_record_transcript.pdf | file_record_transcript |
| Capture |     file_07241999.pdf      | file_07241999          |
| Skip    |   testfile_fake.pdf.tmp    |

### Solution

```
/^(file_.+)\.pdf$/g
```
