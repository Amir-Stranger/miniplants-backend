const express = require('express');
global.config = require('./config');
const app = express();
let users = require('./users')
const config = require('./config');
require('dotenv').config();
const mongoose = require('mongoose');

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.listen(config.port, () => {
    console.log(`sever is running on port ${config.port}`);
})

app.get('/', (req, res) => {
    res.status(200).json({
        data: users,
        success: true
    });
})

app.get('/:id', (req, res) => {
    console.log(req.params);
    let user = users.find(user => {
        if (user.id == req.params.id) {
            return user;
        }
    })
    res.status(200).json({
        data: user,
        success: true
    });
})

app.post('/', (req, res) => {
    console.log(req.body);
    users.push(req.body)
    res.status(200).json(
        {
            data: "کاربر جدید اضافه شد",
            success: true
        }
    )
})

app.put('/:id', (req, res) => {
    users = users.map(user => {
        if (user.id == req.params.id) {
            return req.body;
        } else {
            return user;
        }
    })
    res.json({
        data: 'کاربر مورد نظر با موفقیت بروز رسانی شد',
        success: true
    })

});

app.delete('/:id', (req, res) => {
    users = users.filter(user => {
        if (user.id != req.params.id) {
            return user;
        }
    })

    res.json({
        data: 'کاربر مورد نظر با موفقیت حذف شد',
        success: true
    })
})