'use strict';

const bukuController = require('../controller/bukuController')


module.exports = router => {

    //input buku
    router.post('/inputbuku', (req, res) => {

        const kodebuku      = req.body.kodebuku;
        const judul         = req.body.judulbuku;
        const sinopsis      = req.body.sinopsis;
        const pengarang     = req.body.pengarang;
        const harga         = req.body.harga;

        if (!kodebuku || !judul || !sinopsis || !pengarang|| !harga || !kodebuku.trim() || !judul.trim()
            || !sinopsis.trim() || !pengarang.trim() || !harga.trim()) {

            res.status(400).json({message: 'Gagal'});

        } else {

            bukuController.inputBuku(kodebuku, judul, sinopsis, pengarang, harga)

                .then(result => {

                    // res.setHeader('Location', '/user/' + email);
                    res.status(result.status).json({success : true,message: result.message})
                })

                .catch(err => res.status(err.status).json({success : false,message: err.message}));
        }
    });

    //get buku
    router.get('/databuku', (req, res) => {

        bukuController.dataBuku()
            .then(result => {
                    console.log(result)
                    res.status(result.status).json({success : true,message: result.message})
            })

            .catch(err => res.status(err.status).json({success : false,message: err.message}));
    });


    //input buku
    router.post('/updatebuku', (req, res) => {

        const kodebuku      = req.body.kodebuku;
        const judul         = req.body.judulbuku;
        const sinopsis      = req.body.sinopsis;
        const pengarang     = req.body.pengarang;
        const harga         = req.body.harga;

        if (!kodebuku || !judul || !sinopsis || !pengarang|| !harga || !kodebuku.trim() || !judul.trim()
            || !sinopsis.trim() || !pengarang.trim() || !harga.trim()) {

            res.status(400).json({message: 'Gagal'});

        } else {

            bukuController.updateBuku(kodebuku, judul, sinopsis, pengarang, harga)

                .then(result => {

                    // res.setHeader('Location', '/user/' + email);
                    res.status(result.status).json({success : true,message: result.message})
                })
                .catch(err => res.status(err.status).json({success : false,message: err.message}));
        }
    });

    //input buku
    router.post('/hapusbuku', (req, res) => {

        const kodebuku      = req.body.kodebuku;

        if (!kodebuku || !kodebuku.trim()) {

            res.status(400).json({message: 'Gagal'});

        } else {

            bukuController.hapusBuku(kodebuku)

                .then(result => {
                    res.status(result.status).json({success : true,message: result.message})
                })
                .catch(err => res.status(err.status).json({success : false,message: err.message}));
        }
    });

    //menampilkan data petani berdasarkan ktp
    router.post('/getDataBuku', (req, res) => {

        if (!req.body.kodebuku || !req.body.kodebuku.trim() ) {

            res.status(400).json({message: 'Gagal'});

        } else {

            bukuController.dataBukuId(req.body.kodebuku)

                .then(result => {
                    res.status(result.status).json({success : true,message: result.message})
                })

                .catch(err => res.status(err.status).json({success : true,message: err.message}));
        }
    });
};
