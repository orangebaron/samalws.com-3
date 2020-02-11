// depends on: scripts/fs.js, https://@isomorphic-git/pgp-plugin, and https://unpkg.com/isomorphic-git

waitForMultiple(["fsLoaded", "git", "pgp"], () => {

git.plugins.set("fs", window.fs)
git.plugins.set("pgp", window.pgp) //TODO: window. necessary?

addProxy = (obj) => Object.assign({}, obj, {corsProxy: "https://cors.isomorphic-git.org"})

window.gitFunc = (otp, arg) => git[arg[0]](addProxy(arg[1])).then(x => x && otp(x))

window.gitLoaded = true

})
