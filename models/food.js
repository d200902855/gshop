
var mongoose = require('mongoose');
var db = require('./db.js');

var foodSchema = new mongoose.Schema({
    id:{type:Number},
    is_in_serving:{type:Boolean},
    description:{type:String},
    title:{type:String},
    link:{type:String},
    image_url:{type:String},
    icon_url:{type:String},
    title_color:{type:String},
    __v:{type:Number}

});

// 静态方法
// 查找食品分类列表
foodSchema.statics.findFoodtypelist = function(callback){
    this.model('Food').find({},callback);
}

// 通过食品分类查找
foodSchema.statics.findFoodbytype = function(type,callback){
    this.model('Food').find({type:type},callback);
}

var foodModel = db.model('Food',foodSchema);

module.exports = foodModel;

