import { Http } from "../utils/http"

class Activity{
    static locationD = 'a-2'
    static async getLocationD(){
      const res = await Http.request({
        url:`/activity/name/${this.locationD}`
      })
      return res.data
    }
    static async getCounponsByActivityName(activityName){
      const res = await Http.request({
        url:`/activity/name/${activityName}/with_coupon`
      })
      return res.data
    }
}


export{
  Activity
}
