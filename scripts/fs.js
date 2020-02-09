// depends on: https://unpkg.com/@isomorphic-git/lightning-fs

waitFor("LightningFS", () => {

window.fs = new LightningFS('fs')
window.pfs = window.fs.promises

window.ls = (inp, otp) => pfs.readdir(inp).then(otp)

window.fsLoaded = true

})
