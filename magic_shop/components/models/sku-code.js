import { combination } from "../../utils/util"

class Code{
  Code 
  SpuId
  seqments = []
  constructor(Code){
    this.Code = Code
    this.splitCode()
  }
  splitCode(){
    // 2$1-45#3-9#4-14
    const SpuAndSpec = this.Code.split('$')
    this.SpuId = SpuAndSpec[0]
    const SpecArray = SpuAndSpec[1].split('#')
    //进行组合 组合的次数就是数组的长度 1个 两两 3选三
    let length = SpecArray.length
    for(let i =1;i<=length;i++){
      const result =combination(SpecArray,i)
      // 打印出来的结果是几个二维数组  [[],[],[]]... 三种选择组合的二维数组
     let joinedResult= result.map(r=>{
        return r.join('#')
      })
     this.seqments= this.seqments.concat(joinedResult)
    }
  }
}

export{
  Code
}
