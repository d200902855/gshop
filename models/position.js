var mongoose = require('mongoose');
var db = require('./db.js');

var positionSchema = new mongoose.Schema({
    address:{type:String},
    city:{type:String},
    geohash:{type:String},
    latitude:{type:String},
    longitude:{type:String},
    name:{type:String}
});

// 静态方法

// 通过经纬度查找位置详情
positionSchema.statics.findPositionbyposition = function(longitude,latitude,callback){
    this.model('Position').find({longitude,latitude},callback);
}

var positionModel = db.model('Position',positionSchema);

module.exports = positionModel;

