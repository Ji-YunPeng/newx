let express = require("express")
let router = express.Router()
let mgdb = require('../../utils/mgdb')

router.get('/',(req,res,next)=>{
    let {mid} = req.query
    if(!mid) res.send({err:1,mess:'缺少必传参数'})

    mgdb({
        dbName: 'shop',
        collectionName: 'buycar'
      }, ( collection, client, ObjectId ) => {
        collection.find({
            mid
        }   
        ,{
            sort: { [mid]: 1 },
            projection:{mid:0}
        }).toArray((err,result)=>{
          // console.log(result)
          if(!err){
              res.send({err:0, mess:'成功', data:result})
              client.close();
          }else{
            return client.close();
              // res.send({err:1, mess:'失败'})
              
          }
          
          
        })
      })
})

module.exports = router;