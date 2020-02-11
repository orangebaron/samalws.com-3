// depends on: scripts/fs.js and https://unpkg.com/isomorphic-git

waitForMultiple(["fsLoaded", "git"], () => {

git.plugins.set('fs', window.fs)

urlPrefix = "https://cors-anywhere.herokuapp.com/"
fixUrl = (obj) => Object.assign({}, obj, {url: urlPrefix + obj.url})

window.gitClone = (arg) => git.clone(fixUrl(arg))

window.gitLoaded = true

})
