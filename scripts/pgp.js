// depends on: scripts/fs.js and https://unpkg.com/openpgp

waitForMultiple(["fsLoaded", "openpgp"], () => {

async pgpSign(msg) {
	const privateKeys = (await openpgp.key.readArmored(msg.secretKey)).keys
	await privateKeys[0].decrypt(window.env.keyPass)
	return await openpgp.sign({
		message: openpgp.message.fromBinary(openpgp.util.encode_utf8(msg.payload)),
		privateKeys,
		detached: true,
		armor: true
	})
}

async pgpVerify (msg) {
	let returned = await openpgp.verify({
		message: openpgp.message.fromBinary(openpgp.util.encode_utf8(msg.payload)),
		signature: await openpgp.signature.readArmored(msg.signature),
		publicKeys: (await openpgp.key.readArmored(msg.publicKey)).keys
	})
	let invalid = []
	let valid = []
	for (let sig of returned.signatures) {
		(sig.valid ? valid : invalid).push(sig.keyid.toHex())
	}
	return { valid, invalid }
}

pgpLoaded = true

})
