// depends on: https://unpkg.com/openpgp

wait("openpgp", () => {

pgpSign = msg => openpgp.key.readArmored(msg.secretKey).then(pk => pk.keys[0].decrypt(window.env.keyPass).then(() =>
	openpgp.sign({
		message: openpgp.message.fromBinary(openpgp.util.encode_utf8(msg.payload)),
		privateKeys: pk.keys,
		detached: true,
		armor: true
	})))

filterValidInvalid = sigs => ({ valid: sigs.filter(x => x.valid), invalid: sigs.filter(x => !x.valid) })

pgpVerify = msg => openpgp.signature.readArmored(msg.signature).then(sig => openpgp.key.readArmored(msg.publicKey).then(pk =>
	openpgp.verify({
		message: openpgp.message.fromBinary(openpgp.util.encode_utf8(msg.payload)),
		signature: sig,
		publicKeys: pk.keys
	}).then(filterValidInvalid)))

pgpEncrypt = msg => openpgp.key.readArmored(msg.publicKey).then(pk =>
	openpgp.encrypt({
		message: openpgp.message.fromBinary(openpgp.util.encode_utf8(msg.payload)),
		publicKeys: pk.keys,
		armor: false
	}))

pgpDecrypt = msg => openpgp.key.readArmored(msg.secretKey).then(pk => pk.keys[0].decrypt(window.env.keyPass).then(() =>
	openpgp.message.read(msg.payload).then(message => openpgp.decrypt({
		message,
		privateKeys: pk.keys,
		format: 'binary'
	}))))

pgpLoaded = true

})
