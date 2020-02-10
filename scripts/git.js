// depends on: scripts/fs.js and https://unpkg.com/isomorphic-git

waitForMultiple(["fsLoaded", "git"], () => {

git.plugins.set('fs', window.fs)

window.gitClone = (arg) => git.clone({ dir: arg[0], url: arg[1] })

window.gitLoaded = true

})
