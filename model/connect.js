const mongoose = require('mongoose');
const mongoosevip = new mongoose.Schema({ ten: String, dienthoai: String },{collection:'mongoosevip'});
module.exports = mongoose.model('mongoosevip', mongoosevip);