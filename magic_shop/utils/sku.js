/*
 * 将specs 数组对象转换为字符串
 *
 */
import { Joiner } from './joiner'
const parseSpecValue = function (specs) {
  if (!specs) {
    return
  }
  const joiner = new Joiner(';', 2)
  specs.map((spec) => {
    joiner.join(spec.value)
  })
  return joiner.getStr()
}

export { parseSpecValue }
