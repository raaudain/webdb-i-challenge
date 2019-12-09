const db = require("../data/dbConfig");

// validate account id
function validateAcctId(req, res, next){
    const {id} = req.params;

    db
        .select("*")
        .from("accounts")
        .where(id)
        .then(acct => {
            console.log(account)
            if(!acct){
                res.status(400).json("Invalid account ID")
            }
            else{
                next();
                console.log(account)
            }
        })
}

function validateAcct(req, res, nex){
    const body = req.body

    if(body && Object.keys(body).length === 0){
        res.status(400).json("Missing account data")
    }
    else if(body && (!body.name || !body.budget)){
        res.status(400).json("Missing require field")
    }
    else{
        next();
    }
}

module.exports = {validateAcctId, validateAcct}