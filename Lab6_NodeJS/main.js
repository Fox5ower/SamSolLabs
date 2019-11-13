import { Singleton } from "./singleton.js";

let s1 = new Singleton();
let s2 = new Singleton();
console.log(s1 === s2);
s1.setCookie("test", "val1");
console.log(s1.cookies);
console.log(s1.getCookie("test"));
s1.deleteCookie("test");
console.log(s1.cookies);
