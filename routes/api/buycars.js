let express = require("express")
let router = express.Router()
let mgdb = require('../../utils/mgdb')

router.get('/',(req,res,next)=>{
    let {mid,sid,qb} = req.query
    if(!mid) res.json({err:1,mess:'缺少必传参数'})
    if(sid){
        console.log(1)
        mgdb({
            dbName: 'shop',
            collectionName: 'buycar'
            }, ( collection, client, ObjectId ) => {
                collection.deleteOne({mid,sid},(err,result)=>{
                    if(!err){
                        res.send({err:0,mess:'成功'})
                        client.close();
                    }else{
                        res.send({err:1,mess:'失败'})  
                        client.close();               
                    }

                })
        })
    }
    if(qb){
        for(let a = 0;a<qb;a++){
            mgdb({
                dbName: 'shop',
                collectionName: 'buycar'
                }, ( collection, client, ObjectId ) => {
                    collection.deleteOne({mid},(err,result)=>{
                        if(!err&&a == qb-1){
                            res.send({err:0,mess:'成功'})
                            client.close();
                        }
                        client.close();

                    })
            })
        }
    }

})


module.exports = router;