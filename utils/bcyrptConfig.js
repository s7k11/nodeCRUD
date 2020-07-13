let bcrypt = require('bcryptjs');





const encryptPassword = async (password) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt)=> {
            bcrypt.hash(password, salt, (err, hash)=> {
                if (err)
                    reject(err)
                else
                    resolve(hash)
            });
        })
    }
    )
}


const comparePassword=async(password,hash)=>{
    return new Promise((resolve,reject)=>{
        bcrypt.compare(password,hash,(err,success)=>{
            if(err)
                reject(err)
            else
                resolve(success)
        })
    })
}


module.exports={encryptPassword,comparePassword}
