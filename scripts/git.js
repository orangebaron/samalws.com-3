// depends on: scripts/fs.js and https://unpkg.com/isomorphic-git

waitForMultiple(["fsLoaded", "git"], () => {

git.plugins.set('fs', window.fs)

addProxy = (obj) => Object.assign({}, obj, {corsProxy: "https://cors.isomorphic-git.org"})

window.git = (otp, arg) => git[arg[0]](addProxy(arg[1])).then(otp)

window.gitLoaded = true

})
