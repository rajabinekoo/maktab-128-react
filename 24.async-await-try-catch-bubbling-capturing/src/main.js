const url1 = "https://dummyjson.com/products";
const url2 = "https://dummyjson.com/posts";
const url3 = "https://dummyjson.com/users";

// let isLoading = true;
// fetch(url1)
//   .then((r) => r.json())
//   .then((b) => console.log(b))
//   .catch((e) => console.log(e))
//   .finally(() => {
//     isLoading = false;
//     console.log("end");
//   });

// ==================== async/await ====================
// group
// Agar khastid chand Promise be soorate tartibi post ham
// ejra shan, hatman as async await estefade kon
// Yadet bashe tabe async dakhelesh as await estefade mishe!
// Yadet bashe ke "async function" baraye to Promise bar migardoone!
// Pas mishe natije gereft, "async function" ye Higher Order Promise hastesh!
// Yani inke yek promisi hastesh ke chand promise dar bar migire.

// async function fetchProductsAndPostsAndUsers() {
//   const r1 = await fetch(url1);
//   const r2 = await fetch(url2);
//   const r3 = await fetch(url3);
//   return [await r1.json(), await r2.json(), await r3.json()];
// }

// fetchProductsAndPostsAndUsers().then((msg) => console.log(msg));

// ==================== try/catch/throw ====================

// const body = '{"lastName :"rajabi nekoo"}';
// console.log(JSON.parse(body));

// throw new Error("Something went wrong")
// throw { msgError: "Something went wrong" };

// try {
//   // throw new Error("something went wrong")
//   const body = '{"lastName :"rajabi nekoo"}';
//   console.log(JSON.parse(body));
// } catch (error) {
//   console.error(error.message);
// }
// console.log("ok");

// ==================== async/await within try/catch ====================

// async function fetchProductsAndPostsAndUsers2() {
//   // throw new Error('something went wrong')
//   const r1 = await fetch(url1);
//   const r2 = await fetch(url2);
//   const r3 = await fetch(url3);
//   return [await r1.json(), await r2.json(), await r3.json()];
// }

// fetchProductsAndPostsAndUsers2()
//   .then((msg) => console.log(msg))
//   .catch((err) => console.log(err.message));

// -- section 2

async function fetchProductsAndPostsAndUsers3() {
  try {
    const r1 = await fetch(url1);
    if (!r1.ok) throw new Error("Products fetching failed");
    const r2 = await fetch(url2);
    if (!r2.ok) throw new Error("Posts fetching failed");
    const r3 = await fetch(url3);
    if (!r3.ok) throw new Error("Users fetching failed");
    return [await r1.json(), await r2.json(), await r3.json()];
  } catch (error) {
    console.log(error.message);
    return [];
  } finally {
    console.log("end of requests, will running after try/catch execution");
  }
}

// then solution
// fetchProductsAndPostsAndUsers3().then(console.log);

// higher order void async function
async function main() {
  const results = await fetchProductsAndPostsAndUsers3();
  console.log(results);
}

main();
