var exports = module.exports = {};

const countDecimals = (value) => {
    if(Math.floor(value) === value) return 0;
    return value.toString().split(".")[1].length || 0; 
};

exports.validate = (payload) => {

	if (payload.recipient == undefined || payload.amount == undefined)
		return false

	if (countDecimals(payload.amount) > 2)
		return false;

	return true;
}