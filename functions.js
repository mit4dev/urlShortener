/*
 * Created by M. Irfan TARI | 04.03.2017
 */

var base58 = "0123456789abcdefghijkmnprstuvyzqwxABCDEFGHJKLMNPRSTUVYZQWX";
var base = base58.length;


Encode = function (base10_integer) {
    var remainder;
    var dividend = base10_integer;
    var encodedString = "";
    while (dividend) {
        remainder = dividend % base;
        dividend = Math.floor(dividend / base);
        encodedString = base58[remainder].toString() + encodedString;
    }
    return encodedString;
}

Decode = function (base58_string) {
    var decoded = 0;
    for (i = 0; i < base58_string.length; i++) {
        var index = base58.indexOf(base58_string[i]);
        var power = base58_string.length - i - 1;
        decoded += index * ((Math.pow(base, power)));
    }
    return Math.round(decoded);
}

//console.log(Encode(195));
//console.log(Decode("3m"));


module.exports.Encode = Encode;
module.exports.Decode = Decode;
