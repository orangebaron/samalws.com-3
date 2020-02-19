// depends on: https://unpkg.com/@isomorphic-git/lightning-fs

waitFor("LightningFS", () => {

window.fs = new LightningFS('fs')
window.pfs = window.fs.promises

processFsArg = env => (env.dir || "") + "/" + (env.arg || "")
processFsArgNum = (env, argNum) => (env.dir || "") + "/" + (env.arg[argNum] || "")

cd = (_, __, env) => Object.assign({}, env, {dir: (env.arg[0] != "/" && env.dir ? env.dir : "") + "/" + env.arg })
ls = (otp, env) => pfs.readdir(processFsArg(env)).then(otp)
rm = (otp, env) => pfs.unlink(processFsArg(env)).then(otp)
mv = (otp, env) => pfs.rename(processFsArgNum(env,0), processFsArg(env,1)).then(otp)
write = (otp, env) => pfs.writeFile(processFsArgNum(env,0), env.arg[1], "utf8").then(otp)
cat = (otp, env) => pfs.readFile(processFsArg(env), "utf8").then(otp)

window.fsLoaded = true

})
