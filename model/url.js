/*
 * Created by M. Irfan TARI | 04.03.2017
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var counterSchema = new Schema({
    _id: {type: String, required: true},
    seq: {type: Number, default: 1}
});
var counter = mongoose.model('counter', counterSchema);


var urlSchema = new Schema({
    _id: {type: Number, index: true},
    longUrl: String
}, {versionKey: false});

urlSchema.pre('save', function (next) {
    var doc = this;

    counter.findByIdAndUpdate({_id: 'urlid'}, {$inc: {seq: 1}}, function (error, counter) {
        if (error)
            return next(error);
        doc._id = counter.seq;
        next();
    });

});

var Url = mongoose.model('Url', urlSchema);
module.exports = Url;

	
