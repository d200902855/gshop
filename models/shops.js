
var mongoose = require('mongoose');
var db = require('./db.js');

var shopSchema = new mongoose.Schema({
    bookname:{type:String},
    author:{type:String},
    price:{type:Number},
    type:{type:Array}
});

// 静态方法

// 通过经纬度查找
shopSchema.statics.findShopbyposition = function(longtitude,latitude,callback){
    this.model('Shop').find({longtitude,latitude},callback);
}


var shopModel = db.model('Shop',shopSchema);

module.exports = shopModel;

