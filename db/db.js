var MongoClient = require('mongodb').MongoClient;

function _connectDB(callback){
    var url = "mongodb://localhost:27017/";
    // 连接数据库
    MongoClient.connect(url, { useNewUrlParser: true },function(err,db){
        callback(err,db);
    });
}

// 插入一条数据
exports.insertOne = function(collectionName,json,callback){
    _connectDB(function(err,db){
        if(err){
            callback(err,db);
            return;
        }
        var dbo = db.db('runoob');
        dbo.collection(collectionName).insertOne(json, function(err, result) {
            callback(err,result);
            db.close();
        });
    })

};
// 插入多条数据
exports.insertMany = function(collectionName,array,callback){
    _connectDB(function(err,db){
        if(err){
            callback(err,db);
            return;
        }
        var dbo = db.db('runoob');
        dbo.collection(collectionName).insertMany(array, function(err, result) {
            callback(err,result);
            db.close();
        });
    })

};

// 查找数据并分页
// args是一个对象{"pagecount":10,"page":10}
exports.find = function(collectionName,json,C,D){
    if(arguments.length == 3){
        var callback = C;
        var skipnum = 0;
        var limitnum = 0;

    }else if(arguments.length == 4){
        var callback = D;
        var args = C;
        var skipnum = args.pagecount * args.page || 0;
        var limitnum = args.pagecount || 0;
        var sort = args.sort || {};
    }
    // 连接数据库
    _connectDB(function(err,db){
        if(err){
            callback(err,db);
            return;
        }
        var dbo = db.db('runoob');
        dbo.collection(collectionName).find(json).limit(limitnum).skip(skipnum).sort(sort).toArray(function(err,result){
            if(err){
                callback(err,null);
                return;
            }
            callback(null,result);
            db.close();
        });

    });
}

// 删除
exports.deleteMany = function(collectionName,json,callback){
    _connectDB(function(err,db){
        if(err){
            callback(err,db);
            return;
        }
        var dbo = db.db('runoob');
        dbo.collection(collectionName).deleteMany(json,function(err,result){
            if(err){
                callback(err,null);
                return;
            }
            callback(null,result);
            db.close();
        });

    });
}

// 更新
exports.updateMany = function(collectionName,findJson,updateJson,callback){
    _connectDB(function(err,db){
        if(err){
            callback(err,db);
            return;
        }
        var dbo = db.db('runoob');
        var update = {$set:updateJson};
        dbo.collection(collectionName).updateMany(findJson,update,function(err,result){
            if(err){
                callback(err,null);
                return;
            }
            callback(null,result);
            db.close();
        });

    });
}

// 获取数据总条数
exports.getAllCount = function(collectionName,callback){
    _connectDB(function(err,db){
        var dbo = db.db('runoob');
        dbo.collection(collectionName).countDocuments({}).then(function(count){
            callback(count);
            db.close();
        });

    });
}