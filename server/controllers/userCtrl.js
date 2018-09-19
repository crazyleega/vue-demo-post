const userService = require('../service/userService.js')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const loginByUserName = async function(ctx){
    const account = {
        userName: ctx.request.body.userName
    }
    const result = await userService.loginByUserName(account);
    if(result){
        if(bcrypt.compareSync(ctx.request.body.password,result.password)){
            const userToken = {
                name: result.userName,
                id: result._id
            }
            const secret = 'crazy'; // 指定密钥
            const token = jwt.sign(userToken,secret); // 签发token
            ctx.body = {
                data: result,
                success: true,
                info: '成功！',
                token:token
            }
        }else{
            ctx.body = {
                success: false,
                info: '密码错误',
            }     
        }
        
    }else{
        ctx.body = {
            success: false,
            info: '帐号不存在'
        }
    }
}

const register = async function(ctx){
    const userInfo = {
        userName: ctx.request.body.userName,
        password: bcrypt.hashSync(ctx.request.body.password, 10)
    }
    const result = await userService.register(userInfo);
    if(result){
        ctx.body = {
            success: true,
            info: '注册成功！',
            data:''
        }
    }else{
        ctx.body = {
            success: false,
            info: '注册失败'
        }
    }
}

const loginByToken = async function(ctx){
  const userId = ctx.request.body.userInfo.id;
  const result = await userService.getUserInfoById(userId)
  if(result){
    ctx.body = {
        success: true,
        data: result
    }
  }else{
    ctx.body = {
        success: false,
        info: ''
    }
  }
}

module.exports = {
  loginByUserName,
  register,
  loginByToken
}