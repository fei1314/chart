const http=require('http');
const fs=require('fs');
const mysql=require('mysql');
const io=require('socket.io');
const regs=require('./libs/regs');



let db=mysql.createPool({host:"localhost",user:'root',password:"11111111",database:'web'});

let httpServer=http.createServer((req,res)=>{
  fs.readFile(`www${req.url}`,(err,data)=>{
    if(err){
      res.writeHeader(404);
      res.write('Not Found');
    }else{
      res.write(data);
    }
    res.end();
  })
});
httpServer.listen(8080);
  let aSock=[];
let wsServer=io.listen(httpServer);
wsServer.on('connection',sock=>{

aSock.push(sock);

  let cur_username='';
  let cur_userID=0;
  //注册
  sock.on('reg',(user,pass)=>{
    if(!regs.username.test(user)){
      sock.emit('reg_ret',1,'用户名不符合规范')
    }else if(!regs.password.test(pass)){
      sock.emit('reg_ret',1,'密码不符合规范')
    }else{
      db.query(`select id from user_table where username='${user}'`,(err,data)=>{
        if(err){
          sock.emit('reg_ret',1,'数据库有错');
        }else if(data.length>0){
          sock.emit('reg_ret',1,'此用户名已存在')
        }else{
          db.query(`insert into user_table (username,password,online)values('${user}','${pass}',0)`,err=>{
            if(err){
              sock.emit('reg_ret',1,'数据库有错')
            }else{
              sock.emit('reg_ret',0,'注册成功')
            }
          })
        }
      })
    }
  })

  //登录
  sock.on('login',(user,pass)=>{
    if(!regs.username.test(user)){
      sock.emit('login_ret',1,'用户名不符合规范')
    }else if(!regs.password.test(pass)){
      sock.emit('login_ret',1,'密码不符合规范')
    }else{
      db.query(`select id,password from user_table where username='${user}'`,(err,data)=>{
        console.log(data);
        if(err){
          sock.emit('login_ret',1,'数据库有错误');
        }else if(data.length==0){
          sock.emit('login_ret',1,'此用户名不存在')
        }else if(data[0].password!=pass){
          sock.emit('login_ret',1,'用户名或密码错误')
        }else {
          db.query(`update user_table set online=1 where id='${data[0].id}'`,err=>{
            if(err){
              sock.emit('login_ret',1,'数据库有错误')
            }else{
              sock.emit('login_ret',0,'登录成功');
              cur_username=user;
              cur_userID=data[0].id;


            }
          })
        }
      })
    }
  })

  //发言
  sock.on('msg',text=>{
    if(!text){
      sock.emit('msg_ret',1,'消息文本不能为空')
    }else{
      aSock.forEach(item=>{
        if(item==sock)return;

        sock.emit('msg',cur_username,txt);
      })
      sock.emit('msg_ret',0,'发送成功')

    }
  })
  //离线
  sock.on('disconnect',function(){
    db.query(`update user_table set online=0 where id=${cur_userID}`,err=>{
      if(err){
        console.log('数据库有错',err)
      }
      cur_userID=0;
      cur_username='';

      aSock.filter(item=>item!=sock);
    })
  })
})
