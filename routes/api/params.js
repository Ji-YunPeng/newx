module.exports = (req,res,next)=>{
    req.query._page = req.query._page ? req.query._page-1 : require("../../config/params")._page-0;
    req.query._limit = req.query._limit ? req.query._limit-1 : require("../../config/params")._limit-0;
    req.query.p = req.query.p ? req.query.p : require("../../config/params").p;
    req.query._sort = req.query._sort ? req.query._sort : require("../../config/params")._sort;

    req.body._page = req.body._page ? req.body._page-1 : require("../../config/params")._page-0;
    req.body._limit = req.body._limit ? req.body._limit-1 : require("../../config/params")._limit-0;
    req.body.p = req.body.p ? req.body.p : require("../../config/params").p;
    req.body._sort = req.body._sort ? req.body._sort : require("../../config/params")._sort;

    req.rootParams = req.params[0].split('/')[0]

    next();
}