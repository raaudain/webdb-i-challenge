const db = require("./data/dbConfig");
const validate = require("./middleware/validation")

const router = require("express").Router();

router.get("/", (req, res) => {
    db
        .select("*")
        .from("accounts")
        .then(acct => {
            res.status(200).json(acct);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json("Server could not be contacted.")
        })
});

router.get("/:id", (req, res) => {
    db
        .select("*")
        .from("accounts")
        .where({id: req.params.id})
        .first()
        .then(acct => {
            res.status(200).json(acct);
        })
        .catch(err => {
            console.log(err)
            res.status(500).json("Server could not be contacted.")
        })
});

router.post("/", validate.validateAcct, (req, res) => {
    const body = req.body;
    console.log(body)
    
    db("accounts")
        .insert(body, "id")
        .then(ids => {
            const id = ids[0];
            return db("accounts")
                .select("id","name", "budget")
                .where({id})
                .first()
                .then(account => {
                    res.status(201).json(account);
                })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json("Server could not be contacted.")
        });
});

router.put("/:id", validate.validateAcct, (req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(body)
    db("accounts")
        .where({id})
        .update(body)
        .then(acct => {
            acct > 0 ? res.status(200).json("Account updated") : res.json(400).json("Account not found")
        })
        .catch(err => {
            console.log(err)
            res.status(500).json("Server could not be contacted.")
        });
});

router.delete("/:id", (req, res) => {
    db("accounts")
        .where({id: req.params.id})
        .del()
        .then(acct => {
            res.status(200).json("Account removed")
        })
        .catch(err => {
            console.log(err)
            res.status(500).json("Server could not be contacted.")
        });
});



module.exports = router;