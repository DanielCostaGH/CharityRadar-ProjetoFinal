const localstrategy = require('passport-local').Strategy;
const bcrypt= require('bcryptjs');
//models e dados 
const models= require('../Banco de Dados/models/db');
const usuario = require('../Banco de Dados/models/PostUser');
//--------

//logica do login no js
module.exports = function(passport){
    passport.use(new localstrategy({ usernameField : 'email',passwordField: 'senha'},(email,senha,done)=>{
        usuario.findOne({email: email}).then((usuario) =>{
            if(!usuario){
                return done (null,false,{message: ' Credenciais inválidas'})
            }

            bcrypt.compare(senha,usuario.senha,(erro,bate) =>{
                if(bate){
                    return done (null,usuario);
                }else{
                    return done(null,false,{message: " Credenciais inválidas senha"})
                }
            })

        })
    }))

    passport.serializeUser((usuario,done) =>{
        done(null,usuario.id)
    })

    passport.deserializeUser((id,done)=>{
        usuario.findById(id,(err,usuario)=>{
            done(err,usuario);
        })
    })
          
}
          
//---------------------
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
          
            /* if(!usuario){
                return done (null,false,{msg:" Usuário não encontrado !"});
            }
            const res = bcrypt.compare(senha,usuario.senha,(err,resposta)=>{
                if(!resposta){
                    return done(null,usuario);
                }else{
                    return done(null,false,{msg: " Erro ao logar !" + err});
                }
            });

        });
    }));
    passaport.serializeUser((usuario,done)=>{
        done(null,usuario.id);
    });
    passaport.deserializerUser((id,done)=>{
        Usuario.findOne({where:{id:id}}).then((res)=>{
            if(res){
                return done(null,false,{msg: " Não foi encontrado "});
            }else{
                done(null,res);
            }
        
        })
    });

};*/