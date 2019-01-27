var exports = module.exports = {};

const getAccountById = require("./getAccounts").getAccountById;

exports.transfer = validatedPayload => senderId => {
	const senderAccount = getAccountById(senderId);

	if (senderAccount.status === false || senderAccount.data.closed) return {status: false, message: "sender account not found"};
	
	if (senderAccount.data.balance < validatedPayload.amount) return {status: false, message: "insufficient balance"};

	const recipientAccount = getAccountById(validatedPayload.recipient);

	if (recipientAccount === undefined || recipientAccount.closed) return {status: false, message: "recipient account not found"};
	
	const newSenderAccount = Object.assign({}, senderAccount.data, {
		balance: senderAccount.data.balance - validatedPayload.amount
	});
	
	const newRecipientAccount = Object.assign({}, recipientAccount.data, {
		balance: recipientAccount.balance + validatedPayload.amount
	});


	return newSenderAccount;
};
