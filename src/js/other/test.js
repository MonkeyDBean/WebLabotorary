/**
 * url合法性简单判断，http或https开头但不包含\
 */
function testUrlReg(str) {
    const httpReg = /^https?[^\\]*$/;
    console.log(str + ": " + httpReg.test(str));
}

/**
 * 测试url是否为ip而不是域名
 */
function testIpReg(str) {
    const ipUrlReg = /\/\/\d+\.\d+\.\d+\.\d+/;
    console.log(str + ": " + ipUrlReg.test(str));
}

/**
 * 测试类型隐式转换
 * 实际做比较时, 尽可能避免隐式转换, 比较用"====",值和类型均比较, 或者使用!!转为布尔类型, 运算结果为true为false后再比较
 */
function testTypeConvert(){
    let a = 0;
    let b = "0";
    let c = "";
    let d = [];
    let e = {};
    console.log("testTypeConvert start");

    //true, 字符串类型与数值类型比较, 字符串类型首先转为数值类型, "0"转为0
    console.log(a == b);

    //true, ""转为0
    console.log(a == c);

    //true, 空数组toString()方法转为"", ""转为数值型为0
    console.log(a == d);

    //false, 空对象toString()方法转为"[object Object]", 再转为数值类型为NaN
    //js中{}可以是一个代码块, 进行比较时, 若在前, 则用括号括起来, 或者放在比较的右侧
    console.log(a == e);
    console.log((e) == {});
    console.log(e.toString());
    console.log(Number(e));
    console.log(isNaN(e));

    //false, 同一类型比对, 不同即不相等, 不发生转换
    console.log(b == c);

    //false, 空数组toString方法转为"", 与b为同一类型, 无需再次转换(每次隐式转换后去比对, 不可比对则继续转换)
    console.log(b == d);

    //布尔类型与非布尔类型比较时, 首先将布尔类型转为数值类型再比对, false转为0, true转为1
    //true
    console.log(false == 0);
    //true
    console.log(true == 1);
    //false
    console.log(true == 2);

    //true, []为true, ![]为false, 转为数值类型0, 则变成了[]与0比对, []转为""再换为0
    console.log("[] == ![], result: " + (d == !d));

    //js数据类型: Number,String,Boolean,Undefined,Null,Object
    //null进行typeof操作后，结果为object，原因是null类型被当做一个空对象引用
    console.log(typeof(null));
    console.log(typeof(123));
    console.log(typeof("abc"));
    console.log(typeof(true));
    console.log(typeof(undefined));
    console.log(typeof([]));
    console.log(typeof({}));
    console.log(typeof(testIpReg));

    //转为布尔值为false的情况: 0, "", '', null, undefined, NaN
    //空对象和空数组对应的布尔值均为true
    console.log(!!NaN);
    console.log(!!undefined);
    console.log(!!null);
    console.log(!![]);
    console.log(!!{});

    //NaN为数值类型, 无法计算结果时出现
    console.log(typeof(NaN) == "number");
    console.log(NaN == NaN);
    console.log(isNaN(NaN));
    console.log("testTypeConvert end");

    //空对象判断
    let isEmptyObj = true;
    for (let i in e) {
        isEmptyObj = false;
    }
    console.log("for each, empty object judge: " + isEmptyObj);
    isEmptyObj = false;
    if (Object.keys(e).length === 0) {
        isEmptyObj = true;
    }
    console.log("Object.keys, Array length, empty object judge: " + isEmptyObj);
}

/**
 * 根据序号获取类别，排布规则为
 * 第0行：大小大小
 * 第1行：小大小大
 * 第2行：大小大小
 * ...
 * 
 * @param {*} idx 数据序号，从0起递增
 */
const getItemSize = (idx) => {
    const isFirstFloor = Math.floor(idx / 4) % 2;
    if (isFirstFloor) {
        return idx % 2 ? 'big' : 'small';
    } else {
        return idx % 2 ? 'small' : 'big';
    }
}

/**
 * getItemSize的优化写法
 * 典型的奇偶判断 序号数据如下
 * 0 1 2 3
 * 4 5 6 7
 * 8 9 10 11
 * ...
 * 
 * @param {*} idx 数据序号，从0起递增
 */
// const getItemSizeOptimize = (idx) => {
//     return Math.floor(idx / 4) & 1 && idx & 1 || !(Math.floor(idx / 4) & 1) && !(idx & 1) ? "big" : "small";
// }
const getItemSizeOptimize = (idx) => {
    let rowOdd = Math.floor(idx / 4) & 1;
    let columnOdd = idx & 1;
    let isSmall = rowOdd ^ columnOdd;
    return isSmall ? "small" : "big";
}