const text = `
RegExr was created by gskinner.com.

Edit the Expression & Text to see matches. Roll over matches or the expression for details. PCRE & JavaScript flavors of RegEx are supported. Validate your expression with Tests mode.

The side bar includes a Cheatsheet, full Reference, and Help. You can also Save & Share with the Community and view patterns you create or favorite in My Patterns.

Explore results with the Tools below. Replace & List output custom results. Details lists capture groups. Explain describes your expression in plain English.
`;

const regex1 = /([A-Z])\w+/gm;
const regex2 = /\d+/g;

console.log(regex1.test(text));
console.log(regex2.test(text));
console.log(text.match(regex1));
console.log(text.replace(/[\.\,]/g, ''));

// -------------------------------------------------------------------------------------------------------

const passwdRegex = /^(?=(.*[a-z]))(?=(.*[A-Z]))(?=(.*\d))(?=(.*[\W_]))[A-Za-z\d\W_]{8,}$/g;
const inputPasswd1 = "abcdefg";
const inputPasswd2 = "abcdefg123";
const inputPasswd3 = "ABcdefg123";
const inputPasswd4 = "ABcdefg123_";

console.log(inputPasswd1, passwdRegex.test(inputPasswd1));
console.log(inputPasswd2, passwdRegex.test(inputPasswd2));
console.log(inputPasswd3, passwdRegex.test(inputPasswd3));
console.log(inputPasswd4, passwdRegex.test(inputPasswd4));

// -------------------------------------------------------------------------------------------------------

const gmailRegex = /^[a-z]\w{4,}@gmail.com$/gi;
const email1 = "ali@yahoo.com"
const email2 = "ali_rajabi@yahoo.com"
const email3 = "ali@gmail.com"
const email4 = "Ali_rajabi@gmail.com"
const email5 = "ali_rajabi@gmail.com123123"
const email6 = "123ali_rajabi@gmail.com"

console.log(email1, gmailRegex.test(email1));
console.log(email2, gmailRegex.test(email2));
console.log(email3, gmailRegex.test(email3));
console.log(email4, gmailRegex.test(email4));
console.log(email5, gmailRegex.test(email5));
console.log(email6, gmailRegex.test(email6));
