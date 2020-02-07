// depends on: scripts/fs.js and https://unpkg.com/isomorphic-git

waitForMultiple(["fsLoaded", "git"], () => {

git.plugins.set('fs', window.fs)

window.gitClone = (inp) => git.clone({ dir: inp[0], url: inp[1] })

window.gitLoaded = true

})
