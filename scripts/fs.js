// depends on: https://unpkg.com/@isomorphic-git/lightning-fs

waitFor("LightningFS", () => {

window.fs = new LightningFS('fs')
window.pfs = window.fs.promises

window.ls = (otp, arg) => pfs.readdir(arg).then(otp)

window.fsLoaded = true

})
