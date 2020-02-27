// depends on: https://unpkg.com/@isomorphic-git/lightning-fs, src/pgp.js

waitForMultiple(["LightningFS", "pgpLoaded"], () => {

fs = new LightningFS('fs')
pfs = fs.promises

processFsArg = env => (env.dir || "") + "/" + (env.arg || "")
processFsArgNum = (env, argNum) => (env.dir || "") + "/" + (env.arg[argNum] || "")

cd = (_, __, env) => Object.assign({}, env, {dir: (env.arg[0] != "/" && env.dir ? env.dir : "") + "/" + env.arg })
ls = (otp, env) => pfs.readdir(processFsArg(env)).then(otp)
rm = env => pfs.unlink(processFsArg(env))
mv = env => pfs.rename(processFsArgNum(env,0), processFsArgNum(env,1))
write = env => pfs.writeFile(processFsArgNum(env,0), env.arg[1], "utf8")
cat = (otp, env) => pfs.readFile(processFsArg(env), "utf8").then(otp)
encryptFile = (otp, env) => cat(payload => pgpEncrypt({publicKey: env.publicKey, payload}).then
	(text => write(otp, Object.assign({}, env, {arg: [env.arg, text.message.packets.write()]}))), env)
decryptFile = (otp, env) => pfs.readFile(processFsArg(env)).then(
	payload => pgpDecrypt({secretKey: env.privateKey, payload}).then
	(text => write(otp, Object.assign({}, env, {arg: [env.arg, text.data]}))))
fileToVar = env => pfs.readFile(processFsArgNum(env,0), "utf8").then(otp).then(content => Object.assign({}, env, {[env.arg[1]]: content}))
varToFile = env => pfs.writeFile(processFsArgNum(env,0), env[env.arg[1]], "utf8")

fsLoaded = true

})
