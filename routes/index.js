var express = require('express');
var router = express.Router();
var util = require('../data/helper.js');
var ObjectId = require('mongodb').ObjectId;
var MongoClient = require("mongodb").MongoClient;


router.post('/addUpdateQuote', async (req, res) => {
    let raw = await addUpdateQuote(req.body);
    var id = raw.insertedId
    
    var xx = {
        "returnUrl":"http://localhost:3000/?" + id
    }
    await res.json(xx);
});

router.post('/addUpdateLoan', async (req, res) => {
    let raw = await addUpdateLoan(req.body);
    res.json(raw);
});

router.get('/:id', async (req, res) => {
    let raw = await getQuoteRequest(req.params.id);
    res.json(raw)
});

async function addUpdateQuote(req) {

    return new Promise((resolve, reject)=> {
        var db = util.getDb();
        var collection = db.collection('quote')

        var id = req._id
        var quote = {
            amountRequired: req.amountRequired,
            term: req.term,
            title: req.title,
            firstName: req.firstName,
            lastName: req.lastName,
            mobile: req.mobile,
            email: req.email,
            createDate: new Date()
        }

        if(id == null || id == '') {
           
            collection.insertOne(quote, function(err, result) {
                console.log("1 document inserted");
                err ? reject(err) : resolve(result);
            });
        }
        else {
            var oldQuote = { _id: ObjectId(req._id) };

            var newQuote = { $set: quote };
            collection.updateOne(oldQuote, newQuote, function(err, result) {
                err ? reject(err) : resolve(result);
                console.log("1 document updated");
            });            

        }
    });
}

async function addUpdateLoan(req) {

    return new Promise((resolve, reject)=> {
        var db = util.getDb();
        var collection = db.collection('customerRequest')

        var id = req._id
        var loan = {
            amountRequired: req.amountRequired,
            term: req.term,
            title: req.title,
            firstName: req.firstName,
            lastName: req.lastName,
            mobile: req.mobile,
            email: req.email,
            termPayment: req.termPayment,
            totalInterest: req.totalInterest,
            establishmentFee: req.establishmentFee,
            createDate: new Date()
        }

        if(id == null || id == '') {
           
            collection.insertOne(loan, function(err, result) {
                console.log("1 document inserted");
                err ? reject(err) : resolve(result);
            });
        }
        else {
            var oldQuote = { _id: ObjectId(req._id) };

            var newQuote = { $set: quote };
            collection.updateOne(oldQuote, newQuote, function(err, result) {
                err ? reject(err) : resolve(result);
                console.log("1 document updated");
            });            

        }
    });
}

function getQuoteRequest(id) {
    return new Promise((resolve, reject)=> {
        var db = util.getDb();
        var collection = db.collection('quote');
        collection.findOne(
        { 
            _id: new ObjectId(id),
        }, 
        function(err, result) {
            err ? reject(err) : resolve(result)
        });
    });
}

module.exports = router;
