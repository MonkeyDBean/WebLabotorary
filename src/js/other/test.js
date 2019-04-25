/**
 * url合法性简单判断，http或https开头但不包含\
 */
function testUrlReg(str) {
    const httpReg = /^https?[^\\]*$/;
    console.log(str + ": " + httpReg.test(str))
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