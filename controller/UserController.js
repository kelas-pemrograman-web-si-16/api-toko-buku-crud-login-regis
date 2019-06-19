'use strict';

const user = require('../model/user');
const bcrypt = require('bcryptjs');


//Registrasi
exports.registerUser = (username, namalengkap, email, password) =>
    new Promise((resolve,reject) => {

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new user({

            username        : username,
            namalengkap     : namalengkap,
            email           : email,
            hashed_password : hash,
            created_at      : new Date()
        });

        newUser.save()

            .then(() => resolve({ status: 200, statuss: true, message: 'Berhasil registrasi' }))

            .catch(err => {

                if (err.code == 11000) {

                    reject({ status: 200, message: 'User atau email sudah terpakai' });

                } else {

                    reject({ status: 200, message: 'Internal Server Error !' });
                }
            });
    });

//login
exports.loginUser = (email, password) =>

    new Promise((resolve,reject) => {

        user.find({email: email})

            .then(users => {

                if (users.length == 0) {

                    reject({status: 200, message: 'Periksa email anda' });

                } else {

                    return users[0];

                }
            })

            .then(user => {

                const hashed_password = user.hashed_password;

                if (bcrypt.compareSync(password, hashed_password)) {

                    resolve({ status: 200, message: [ {email: user.email, username: user.username, namalengkap: user.namalengkap}] });

                } else {

                    reject({status: 200, message: 'Periksa kembali password anda' });
                }
            })

            .catch(err => reject({status: 200, message: 'Internal Server Error !' }));

    });

