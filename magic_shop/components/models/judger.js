import { Code } from "./sku-code"

class judger{
  fenceGroup
  pathDirt = []
  constructor(fenceGroup){
    this.fenceGroup = fenceGroup
    this.initpathDirt()
  }
  initpathDirt(){
    this.fenceGroup.spu.sku_list.forEach(s=>{
      const SkuCode = new Code(s.code)
      this.pathDirt=this.pathDirt.concat(SkuCode.seqments)
    })
    console.log(this.pathDirt)
  }
  
}
export{
  judger
}
