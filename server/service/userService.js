var User = require("../schema/user")

const register = function(userInfo){
  var user = new User(userInfo);
  return user.save();
}

const loginByUserName = function(userInfo){
  return User.findOne(userInfo);
}

const getUserInfoById = function(id){
  return User.findOne({_id:id});
}

module.exports = {
  register,
  loginByUserName,
  getUserInfoById,
}