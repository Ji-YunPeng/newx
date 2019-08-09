let express = require("express")
let router = express.Router()
let pathLib = require('path');
let fs = require('fs');
let mgdb = require('../../utils/mgdb')

router.get('/',(req,res,next)=>{
    let {mid,sid,dataName,num} = req.query
    if(!mid || !sid || !dataName || !num) res.json({err:1,mess:'缺少必传参数'})
    let spsj = {};
    mgdb({
      dbName: 'shop',
      collectionName: dataName
    },(collection, client, ObjectId)=>{

      collection.find({
         _id:ObjectId(sid)
      }).toArray((err,result)=>{
        if(!err){
       
          if(result.length>0){
            // console.log(result)
            // res.send({err:0, mess:'成功', data:result[0]})
            spsj = {data:result[0]}
            console.log(1,spsj)
            tt()
          }else{
            res.send({err:1,mess:'数据不存在'})
          }
          client.close();
        }else{
          res.send({err:1,mess:'库链接错误'})
          client.close();
        }
      })
    })


function tt(){
  mgdb({
        dbName: 'shop',
        collectionName: 'buycar'
      }, ( collection, client, ObjectId ) => {
    
        collection.find({
            sid,mid
        }).toArray((err,result)=>{
          // console.log(2,result)
          if(!err){
            if(result.length>0){
              collection.deleteOne({sid,mid},(err,result)=>{
                  if(!err){
                    collection.insertOne({
                        mid,sid,dataName,num,spsj
                      },{
                        projection:{}
                      },(err,result)=>{
                        if(!err){
                          if(result.result.ok>0){
                            console.log(result.result.insertedId)
                            res.send({err:0,mess:'成功'})
                          }else{
                            res.send({err:1,mess:'失败'})
                          }
                        }else{
                          res.send({err:1,mess:'库链接错误'})
                        }
                        client.close();
                    })
                  }else{
                    res.send({err:1,mess:'失败'})
                    client.close();
                  }
              })
            }else{
              //插入
              collection.insertOne({
                mid,sid,dataName,num,spsj
              },{
                projection:{}
              },(err,result)=>{
                if(!err){
                  if(result.result.ok>0){
                    res.send({err:0,mess:'成功'})
                  }else{
                    res.send({err:1,mess:'失败'})
                  }
                }else{
                  res.send({err:1,mess:'库链接错误'})
                }
                client.close();
              })
            }
          }else{
            res.send({err:1,mess:'库链接错误'})
            client.close();
          }
        })
      })
}
    
})
module.exports = router;