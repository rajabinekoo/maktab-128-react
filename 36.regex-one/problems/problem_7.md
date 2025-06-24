### [Exercise 7](https://regexone.com/problem/extracting_log_data): Extracting Data From Log Entries

| Task    |                          Text                          |        Capture Groups         |
| ------- | :----------------------------------------------------: | :---------------------------: |
| Skip    |   W/dalvikvm( 1553): threadid=1: uncaught exception    |                               |
| Skip    |            E/( 1553): FATAL EXCEPTION: main            |                               |
| Skip    |  E/( 1553): java.lang.StringIndexOutOfBoundsException  |                               |
| Capture | E/( 1553): at widget.List.makeView(ListView.java:1727) | makeView, ListView.java, 1727 |
| Capture | E/( 1553): at widget.List.fillDown(ListView.java:652)  | fillDown, ListView.java, 652  |
| Capture | E/( 1553): at widget.List.fillFrom(ListView.java:709)  | fillFrom, ListView.java, 709  |

### Solution

```
/at.\w+\.\w+.(\w+)+\((\w+.\w+)+:(\d+)+\)$/g
/(\w+)\(([\w\.]+):(\d+)\)/g
```
