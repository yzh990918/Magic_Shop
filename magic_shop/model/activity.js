import { Http } from "../utils/http"

class Activity{
    static locationD = 'a-2'
    static async getLocationD(){
      const res = await Http.request({
        url:`/activity/name/${this.locationD}`
      })
      return res.data
    }
}


export{
  Activity
}
