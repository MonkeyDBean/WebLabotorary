/**
 * Md5摘要,转为16进制字符串(Md5字节数组转String默认即是十六进制)
 */
function md5HexUtil(value) {
    return CryptoJS.MD5(value).toString(CryptoJS.enc.HEX);
}

/**
 * Md5摘要,直接将字节流转为Base64
 * 方法一：
 */
function md5ByteDirectToBase64UtilMethod1(value) {
    return CryptoJS.MD5(value).toString(CryptoJS.enc.Base64);
}

/**
 * Md5摘要,直接将字节流转为Base64
 * 方法二：
 */
function md5ByteDirectToBase64UtilMethod2(value) {
    var base64 = CryptoJS.enc.Base64.stringify(CryptoJS.MD5(value));
    return base64;
}

/**
 * base64编码
 */
function base64Encode(value) {
    var wordArray = CryptoJS.enc.Utf8.parse(value);
    var base64 = CryptoJS.enc.Base64.stringify(wordArray);
    return base64;
}

/**
 * base64解码
 */
function base64Decode(base64) {
    var parsedWordArray = CryptoJS.enc.Base64.parse(base64);
    var parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
    return parsedStr;
}

/**
 * 测试方法
 */
function testEncryption() {
    console.log("-----start enryption test ------");
    let origin = "a12345678";
    console.log("origin string is :" + origin);
    console.log("md5 hex string is :" + md5HexUtil(origin));
    console.log("md5 byte direct to base64 method1 is :" + md5ByteDirectToBase64UtilMethod1(origin));
    console.log("md5 byte direct to base64 method2 is :" + md5ByteDirectToBase64UtilMethod2(origin));
    console.log("base4 encode finish :" + base64Encode(origin));
    console.log("base4 decode finish :" + base64Decode(base64Encode(origin)));
    console.log("md5 hex string, and then base4 is :" + base64Encode(md5HexUtil(origin)));
    console.log("-----end enryption test ------");
}