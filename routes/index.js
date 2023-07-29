var express = require('express');
var router = express.Router();
var mongooseConnect = require('../model/connect.js');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Trang chủ' });
});
//xem
router.get('/xem', async (req, res, next) => {
  const data = await mongooseConnect.find();
  res.render('xem', { title: 'Xem dữ liệu' ,data:data});
});
//them
router.get('/them', function (req, res, next) {
  res.render('them', { title: 'Thêm dữ liệu'});
});

router.post('/them', function (req, res, next) {
  var dataC = {
    ten : req.body.ten,
    dienthoai : req.body.dt
  }
  const savedata = mongooseConnect(dataC);
  savedata.save();
  res.redirect('/xem');
});
//xoa
router.get('/xoa/:idxoa', async (req, res, next) => {
  var idxoa = req.params.idxoa;
  await mongooseConnect.findByIdAndDelete(idxoa);
  res.redirect('/xem');
});

//sua
router.get('/sua/:idcansua', async (req, res, next) => {
  var idcansua = req.params.idcansua;
  const data = await mongooseConnect.find({_id:idcansua});
  res.render('sua',{title:"Sửa dữ liệu",data:data});
});
router.post('/sua/:idcansua', async (req, res, next) => {
  var idcansua = req.params.idcansua;
  var dataUpdate = {
    ten : req.body.ten,
    dienthoai : req.body.dt 
  }
  await mongooseConnect.findByIdAndUpdate(idcansua,dataUpdate);
  res.redirect('/xem');
});





module.exports = router;
