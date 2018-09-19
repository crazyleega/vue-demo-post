var mongoose = require('mongoose');

module.exports = function(){
    // var db;
    // try{
        var db = mongoose.connect('mongodb://localhost:27017/local',{server: {poolSize: 20}},function(err){
            if(!err){
                console.log('connect db success');
            }else{
                console.log('connect db fail',err);
            }
        });
    // }catch(e){
    //     cnosole.log('is in catch');
    //     console.error(e);
    // }finally{
        return db;
    // }
    
    
}


