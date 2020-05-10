// 计算两个有精度的数字 辅助函数

function accAdd(num1, num2) {
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (Math.round(num1 * baseNum) + Math.round(num2 * baseNum)) / baseNum;
}

function accMultiply(num1, num2) {
// 计算出小数点后的长度
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (Math.round(num1 * baseNum) * Math.round(num2 * baseNum)) / baseNum / baseNum;
}

function accSubtract(num1, num2) {
  const num1Digits = (num1.toString().split('.')[1] || '').length;
  const num2Digits = (num2.toString().split('.')[1] || '').length;
  const baseNum = Math.pow(10, Math.max(num1Digits, num2Digits));
  return (Math.round(num1 * baseNum) - Math.round(num2 * baseNum)) / baseNum;
}


export {
  accAdd,
  accMultiply,
  accSubtract
}
