// depends on: https://unpkg.com/@isomorphic-git/lightning-fs, src/pgp.js

waitForMultiple(["LightningFS", "pgpLoaded"], () => {

fs = new LightningFS('fs')
pfs = fs.promises

processFsArg = env => (env.dir || "") + "/" + (env.arg || "")
processFsArgNum = (env, argNum) => (env.dir || "") + "/" + (env.arg[argNum] || "")

cd = (_, __, env) => Object.assign({}, env, {dir: (env.arg[0] != "/" && env.dir ? env.dir : "") + "/" + env.arg })
ls = (otp, env) => pfs.readdir(processFsArg(env)).then(otp)
rm = (otp, env) => pfs.unlink(processFsArg(env)).then(otp)
mv = (otp, env) => pfs.rename(processFsArgNum(env,0), processFsArgNum(env,1)).then(otp)
write = (otp, env) => pfs.writeFile(processFsArgNum(env,0), env.arg[1], "utf8").then(otp)
cat = (otp, env) => pfs.readFile(processFsArg(env), "utf8").then(otp)
encryptFile = (otp, env) => cat(payload => pgpEncrypt({publicKey: env.publicKey, payload}).then
	(text => write(otp, Object.assign({}, env, {arg: [env.arg, text.message.packets.write()]}))), env)
decryptFile = (otp, env) => pfs.readFile(processFsArg(env)).then(
	payload => pgpDecrypt({secretKey: env.privateKey, payload}).then
	(text => write(otp, Object.assign({}, env, {arg: [env.arg, text.data]}))))

fsLoaded = true

})
