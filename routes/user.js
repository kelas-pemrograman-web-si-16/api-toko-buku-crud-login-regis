'use strict';

const auth = require('basic-auth');
const jwt = require('jsonwebtoken');
const user = require('../model/user');

const register = require('../controller/UserController');
const login = require('../controller/UserController');
const config = require('../config/config');

module.exports = router => {

    router.get('/', (req, res) => res.end('Api its work !'));


    //login user
    router.post('/login', (req, res) => {
        const credentials = auth(req);

        if (!credentials) {

            res.status(400).json({success : false,message: 'Invalid Request !'});

        } else {
            //
            login.loginUser(credentials.name, credentials.pass)

                .then(result => {
                    const token = jwt.sign(result, config.secret, {expiresIn: 50000});
                    user.update(
                        { "email": result.message.email}, // Filter
                        {"api_token": token}, // Update
                        {upsert: true}) // add document with req.body._id if not exists
                    res.status(result.status).json({success : true,message: result.message, token : token});

                })

                .catch(err => res.status(err.status).json({success: false, message: err.message}));
        }
    });


    //register user
    router.post('/registrasi', (req, res) => {

        var username = req.body.username;
        var namalengkap = req.body.namalengkap;
        var email = req.body.email;
        var password = req.body.password;

        if (!username || !namalengkap || !email || !password || !username.trim() || !namalengkap.trim()
            || !email.trim() || !password.trim()) {

            res.status(400).json({message: 'Gagal'});

        } else {

            register.registerUser(username, namalengkap, email, password)

                .then(result => {

                    res.setHeader('Location', '/user/' + email);
                    res.status(result.status).json({success : true,message: result.message})
                })

                .catch(err => res.status(err.status).json({success : false,message: err.message}));
        }
    });

}
