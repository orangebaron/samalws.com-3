// depends on: https://unpkg.com/@isomorphic-git/lightning-fs, src/pgp.js, scripts/myPage.js

waitForMultiple(["LightningFS", "pgpLoaded", "myPageLoaded"], () => {

fs = new LightningFS('fs')
pfs = fs.promises

processFsArg = env => (env.dir || "") + "/" + (env.arg || "")
processFsArgNum = (env, argNum) => (env.dir || "") + "/" + (env.arg[argNum] || "")

funcs.cd = (_, __, env) => Object.assign({}, env, {dir: (env.arg[0] != "/" && env.dir ? env.dir : "") + "/" + env.arg })
funcs.ls = notChangeEnv(noInp((otp, env) => pfs.readdir(processFsArg(env)).then(otp)))
funcs.rm = notChangeEnv(noIO(env => pfs.unlink(processFsArg(env))))
funcs.mv = notChangeEnv(noIO(env => pfs.rename(processFsArgNum(env,0), processFsArgNum(env,1))))
funcs.write = notChangeEnv(noIO(env => pfs.writeFile(processFsArgNum(env,0), env.arg[1], "utf8")))
funcs.cat = notChangeEnv(noInp((otp, env) => pfs.readFile(processFsArg(env), "utf8").then(otp)))
funcs.encryptFile = notChangeEnv(noInp((otp, env) => cat(payload => pgpEncrypt({publicKey: env.publicKey, payload}).then
	(text => write(otp, Object.assign({}, env, {arg: [env.arg, text.message.packets.write()]}))), env)))
funcs.decryptFile = notChangeEnv(noInp((otp, env) => pfs.readFile(processFsArg(env)).then(
	payload => pgpDecrypt({secretKey: env.privateKey, payload}).then
	(text => write(otp, Object.assign({}, env, {arg: [env.arg, text.data]}))))))
funcs.fileToVar = noIO(env => pfs.readFile(processFsArgNum(env,0), "utf8").then(content => Object.assign({}, env, {[env.arg[1]]: content})))
funcs.varToFile = notChangeEnv(noIO(env => pfs.writeFile(processFsArgNum(env,0), env[env.arg[1]], "utf8")))

fsLoaded = true

})
