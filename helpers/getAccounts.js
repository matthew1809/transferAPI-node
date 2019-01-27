var exports = module.exports = {};

const accounts = require('../stubs/accounts').accounts;

const isNothing = function(v) {
	return v === null || v === undefined;
}

const findAccount = id => {
	const account = accounts.find(x => x.id == id);

	return isNothing(account) ? {status: false, message: "account not found"}
		: {status: true, data: account}
}

exports.getAccountById = id => {
	return isNothing(id) ? {status: false, message: "invalid ID provided"} 
		: findAccount(id);
}