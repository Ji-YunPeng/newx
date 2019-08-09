let mongodb = require("mongodb")
let mongoCt = mongodb.MongoClient
mongoCt.connect("mongodb://127.0.0.1:27017",(err,client)=>{
    if(!err){
        let db = client.db("shop")
        let user = db.collection("user")
        // user.find({},{},(errs,ress)=>{

        // })
        user.find({},{projection:{},sort:{key:-1}}).toArray((errs,ress)=>{
                console.log("12",ress)
        })
        console.log("1111",user)
        
    }
})