const express = require('express')
const {getAsync, setAsync} = require('../redis')
const router = express.Router()

router.get('/', async (_, res) =>{
    let amount = await getAsync('added_todos')
    if(!amount){
        await setAsync('added_todos', 0)
        amount = 0 
    }
    return res.send({
        added_todos: amount
    })
})


module.exports = router;