/**
 * 2019新税收政策：个人Base工资计算
 * 
 * @param arr 月份工资及专项扣除的对象数组
 * @param minus 每月五险一金
 */
function callBasePay(arr, minus) {

  //每月工资起征点
  const monthExclude = 5000;

  //年base工资
  let beforeSum = 0

  //扣除五险一金及税收等，年base工资
  let afterSum = 0;

  //累计专项扣除
  let specialSum = 0;

  //全年交税累计
  let taxSum = 0;
  for (let i = 0; i < arr.length; i++) {

    //月份
    let n = i + 1;
    beforeSum += arr[i].m;
    specialSum += arr[i].special;

    //需交税总工资：累计收入 - 累计免税收入(国企津贴等) - 累计减除费用 - 累计专项扣除(五险一金) - 累计专项附件扣除(如住房租金)
    let preTax = beforeSum - 0 - monthExclude * n - minus * n - specialSum;

    //本月应交税：需交税总额 - 已累计交税
    let tax = calTaxSpeed(preTax) - taxSum;
    taxSum += tax;

    //本月实发工资
    let money = arr[i].m - minus - tax;
    afterSum += money;
    console.log(n + '月份:');
    console.log('税前工资: ', arr[i].m);
    console.log('扣税:', tax.toFixed(2));
    console.log('实发工资:', money.toFixed(2));
  }
  console.log('base税前工资(不计年终):', beforeSum);
  console.log('base税后工资(不计年终):', afterSum);
}

/**
 * 速算累计扣税
 * 
 * @param money 需交税收入
 */
function calTaxSpeed(money) {
  let s = 0;
  if (money < 36000) {
    s = money * .03;
  } else if (money < 144000) {
    s = money * .1 - 2520;
  } else if (money < 300000) {
    s = money * .2 - 16920;
  } else if (money < 420000) {
    s = money * .25 - 31920;
  } else if (money < 660000) {
    s = money * .3 - 52920;
  } else if (money < 960000) {
    s = money * .35 - 85920;
  } else {
    s = money * .45 - 181920;
  }
  return s.toFixed(2);
}

/**
 * 测试方法
 */
function testCallBasePay() {
  console.log("-----start payCalculate test ------");

  //专项扣除(仅租房扣除)
  const specialMoney = 1500;
  //五险一金
  const test51 = 2000;

  //测试数据
  let testData = [{
      m: 30000,
      special: 0
    },
    {
      m: 30000,
      special: 0
    },
    {
      m: 30000,
      special: 0
    },
    {
      m: 30000,
      special: specialMoney
    },
    {
      m: 30000,
      special: specialMoney
    },
    {
      m: 30000,
      special: specialMoney
    },
    {
      m: 30000,
      special: specialMoney
    },
    {
      m: 30000,
      special: specialMoney
    },
    {
      m: 30000,
      special: specialMoney
    },
    {
      m: 30000,
      special: specialMoney
    },
    {
      m: 30000,
      special: specialMoney
    },
    {
      m: 30000,
      special: specialMoney
    },
  ];
  callBasePay(testData, test51);
  console.log("-----end payCalculate test ------");
}