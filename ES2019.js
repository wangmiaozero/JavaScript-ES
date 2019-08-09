// Array.flat () 该方法不修改原始数组，而是创建一个新的数组,可以改变递归数组嵌套深度
const arr1 = [1, 2, [3, 4]];
arr1.flat(); //[1, 2, 3, 4]   // 浏览器支持 node 不支持
const arr2 = [1, 2, [3, 4, [5, 6]]];
arr2.flat(2); // [1, 2, 3, 4, 5, 6]
const arr3 = [1, 2, [3, 4, [5, 6, [7, 8]]]]; //多个可以用无限大
arr3.flat(Infinity); // [1, 2, 3, 4, 5, 6, 7, 8]
// 可以用来处理多个`,`
const arr4 = [1, 2, , 4, 5];
arr4.flat(); // [1, 2, 4, 5]

// 一个新的方法，结合了基本的map函数，然后使用新的Array.flat()方法

//Array.flatMap()

const arr1 = [1,2,3];
arr1.map(i => [i * 4]) // [[4],[8],[12]]  由此可见map 可以的到这样的数组
arr1.flatMap(x => [x * 4]); // [4, 8, 12] 而flatMap 可以数组中的值相乘不增加嵌套

// String.trimStart() and String.trimEnd() 相信很多人用过 来进行正则处理空格
// 没有想到还可以选择处理空格 哈哈哈啊哈
const test = " hello ";

test.trim(); // "hello";
test.trimStart(); // "hello ";
test.trimEnd(); // " hello";

//Object.fromEntries 把对象变为二维数组
const obj = { prop1: 2, prop2: 10, prop3: 15 };                                   
let array = Object.entries(obj); // [["prop1", 2], ["prop2", 10], ["prop3", 15]]
array = array.map(([key, value]) => [key, Math.pow(value, 2)]); // [["prop1", 4], ["prop2", 100], ["prop3", 225]]

// Function.toString()

function /* foo comment */ foo() {}

foo.toString(); // "function foo() {}" JSON.parse() 给他转换回来