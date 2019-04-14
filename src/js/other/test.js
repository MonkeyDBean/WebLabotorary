/**
 * url合法性简单判断，http或https开头但不包含\
 */
function testUrlReg(str) {
    const httpReg = /^https?[^\\]*$/;
    console.log(str + ": " + httpReg.test(str))
}