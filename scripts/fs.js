// depends on: https://unpkg.com/@isomorphic-git/lightning-fs

waitFor("LightningFS", () => {

window.fs = new LightningFS('fs')
window.pfs = window.fs.promises

processFsArg = env => (env.dir || "") + "/" + (env.arg || "")

window.cd = (_, __, env) => Object.assign({}, env, {dir: (env.arg[0] != "/" && env.dir ? env.dir : "") + "/" + env.arg })
window.ls = (otp, env) => pfs.readdir(processFsArg(env)).then(otp)
window.rm = (otp, env) => pfs.unlink(processFsArg(env)).then(otp)

window.fsLoaded = true

})
