// depends on: scripts/fs.js and https://unpkg.com/isomorphic-git

waitForMultiple(["fsLoaded", "git"], () => {

git.plugins.set('fs', window.fs)

addProxy = (obj) => Object.assign({}, obj, {corsProxy: "https://cors.isomorphic-git.org"})

window.gitClone = (arg) => git.clone(fixUrl(arg))

window.gitLoaded = true

})
