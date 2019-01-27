const express = require("express");
const wrap = require('express-async-wrapper');
const bodyParser = require('body-parser');
const accounts = require("./stubs/accounts").accounts;
const accountHelpers = require("./helpers/getAccounts")
const validTransferRequestBody = require("./helpers/validators/transferRequestPayloadValidator").validate
const tryTransfer = require("./helpers/transfer").transfer;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/accounts', (req, res) => {
	res.send(accountStubs.accounts);
});

app.get('/accounts/:id', (req, res) => {
	const account = accountHelpers.getAccountById(req.params.id);
	if (account.status !== true)
		res.status(404)

	res.send(account);
});

app.post('/accounts/:id/transfer', wrap(async(req, res) => {

	const id = req.params.id;

	if (!validTransferRequestBody(req.body)) 
		res.status(403)
		res.send({message: "invalid payload"})

	const transfer = await tryTransfer(req.body)(id);
	res.send(transfer);
}));

app.listen(3000);