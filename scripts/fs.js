// depends on: https://unpkg.com/@isomorphic-git/lightning-fs

waitFor("LightningFS", () => {

window.fs = new LightningFS('fs')
window.pfs = window.fs.promises

processFsArg = arg => (window.dir || "") + (arg || "")

window.cd = (_, arg) => { window.dir = "/" + arg }
window.cdPlus = (_, arg) => { window.dir += "/" + arg }
window.ls = (otp, arg) => pfs.readdir(processFsArg(arg)).then(otp)
window.rm = (otp, arg) => pfs.unlink(processFsArg(arg)).then(otp)
window.rmDir = (otp, arg) => pfs.rmdir(processFsArg(arg)).then(otp)

window.fsLoaded = true

})
