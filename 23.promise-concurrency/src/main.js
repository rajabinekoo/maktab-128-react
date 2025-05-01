// const url1 = "https://dummyjson.com/products";
// const url2 = "https://dummyjson.com/posts";
// const url3 = "https://dummyjson.com/users";

// =================== fetch api / promise ===================

// - simple
// fetch(url1, { method: "GET" })
//   .then(function (r) {
//     console.log(r);
//     r.json()
//       .then(function (j) {
//         console.log(j);
//       })
//       .catch(function (e) {
//         console.log(e);
//       });
//   })
//   .catch(function (e) {
//     console.log(e);
//   });

// - advanced
// fetch(url1, { method: "GET" })
//   .then((r) => r.json())
//   .then(function (j) {
//     console.log(j);
//     return fetch(url2, { method: "GET" });
//   })
//   .then((r) => r.json())
//   .then(function (j) {
//     console.log(j);
//     return fetch(url3, { method: "GET" });
//   })
//   .then((r) => r.json())
//   .then(function (j) {
//     console.log(j);
//   })
//   .catch(function (e) {
//     console.log(e);
//   });

// =================== xhr callback mode ===================

// function fetchXhr(url, method, cb1, cb2) {
//   const xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function () {
//     if (this.readyState === 4 && this.status >= 200 && this.status < 300) {
//       cb1(JSON.parse(this.response));
//     } else if (this.readyState === 4) {
//       cb2(this.response);
//     }
//   };
//   xhr.open(method, url, true);
//   xhr.send();
// }

// callback hell
// fetchXhr(
//   url1,
//   "GET",
//   function (r) {
//     console.log(r);
//     fetchXhr(
//       url2,
//       "GET",
//       function (r) {
//         console.log(r);
//         fetchXhr(
//           url3,
//           "GET",
//           function (r) {
//             console.log(r);
//           },
//           function (e) {
//             console.log(e);
//           }
//         );
//       },
//       function (e) {
//         console.log(e);
//       }
//     );
//   },
//   function (e) {
//     console.log(e);
//   }
// );

// =================== setTimeout promisify ===================

// function fetchXhr2(url, method) {
//   return new Promise((resolve, reject) => {
//     const xhr = new XMLHttpRequest();
//     xhr.onreadystatechange = function () {
//       if (this.readyState === 4 && this.status >= 200 && this.status < 300) {
//         resolve(JSON.parse(this.response));
//       } else if (this.readyState === 4) {
//         reject(this.response);
//       }
//     };
//     xhr.open(method, url, true);
//     xhr.send();
//   });
// }

// function setTimeout2(timeout) {
//   return new Promise((resolve, _reject) => {
//     setTimeout(() => {
//       resolve("chert");
//     }, timeout);
//   });
// }

// setTimeout2(3000).then((msg) => console.log(msg));
// fetchXhr2(url1, "GET")
//   .then((result) => console.log("result", result))
//   .catch((err) => console.log(err));

// ====================== call stack ======================

// function c() {
//   console.log("c");
// }

// function b() {
//   c();
//   console.log("b");
// }

// function a() {
//   b();
//   console.log("a");
// }

// setTimeout(() => {
//   console.log("ok");
// }, 0);

// a();

// =================== fetch api / promise ===================

const posts = [];
const fetchPostUrl = (id) => `https://dummyjson.com/posts/${id}`;

// - sequential
// console.time("task1")
// const startId = 1;
// const endId = 20;
// for (let id = startId; id <= endId; id++) {
//   const url = fetchPostUrl(id);
//   const xhr = new XMLHttpRequest();
//   xhr.open("GET", url, false);
//   xhr.send();
//   posts.push(JSON.parse(xhr.responseText));
// }
// console.log(posts);
// console.timeEnd("task1")

// - concurrent (xhr)
// console.time("task2");
// const startId = 1;
// const endId = 20;
// for (let id = startId; id <= endId; id++) {
//   const url = fetchPostUrl(id);
//   const xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function () {
//     if (this.readyState === 4 && this.status === 200) {
//       posts.push(JSON.parse(xhr.responseText));
//       if (posts.length === 20) {
//         console.log(posts);
//         console.timeEnd("task2");
//       }
//     }
//   };
//   xhr.open("GET", url, true);
//   xhr.send();
// }

// - concurrent (fetch) - 1
// const startId = 1;
// const endId = 20;
// const promises = [];
// for (let id = startId; id <= endId; id++) {
//   const url = fetchPostUrl(id);
//   promises.push(fetch(url, { method: "GET" }).then((r) => r.json()));
// }
// Promise.all(promises)
//   .then((r) => console.log(r))
//   .catch((e) => console.log(e));

// - concurrent (fetch) - 2
const startId = 1;
const endId = 20;
const urls = [];
for (let id = startId; id <= endId; id++) urls.push(fetchPostUrl(id));
Promise.all(urls.map((url) => fetch(url).then((r) => r.json())))
  .then((r) => console.log(r))
  .catch((e) => console.log(e));
