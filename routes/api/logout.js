let express = require('express')
let router = express.Router()
router.delete('/',(req,res,next)=>{
  req.session['shop'] = undefined
  res.send({err:0,msg:'注销成功'})
})
module.exports = router;
