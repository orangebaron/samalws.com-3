// depends on: scripts/fs.js and https://unpkg.com/openpgp

waitForMultiple(["fsLoaded", "openpgp"], () => {

pgpSign = msg => openpgp.key.readArmored(msg.secretKey).then(pk => pk.keys[0].decrypt(window.env.keyPass).then(() =>
	openpgp.sign({
		message: openpgp.message.fromBinary(openpgp.util.encode_utf8(msg.payload)),
		privateKeys: pk.keys,
		detached: true,
		armor: true
	}).then(x => x)))

filterValidInvalid = sigs => { valid: sigs.filter(x => x.valid), invalid: sigs.filter(x => !x.valid) }

pgpVerify = msg => openpgp.signature.readArmored(msg.signature).then(sig =>
	openpgp.verify({
		message: openpgp.message.fromBinary(openpgp.util.encode_utf8(msg.payload)),
		signature: sig,
		publicKeys: (await openpgp.key.readArmored(msg.publicKey)).keys
	}).then(filterValidInvalid))

pgpLoaded = true

})
