// depends on: scripts/fs.js, https://@isomorphic-git/pgp-plugin, and https://unpkg.com/isomorphic-git

waitForMultiple(["fsLoaded", "git", "pgp"], () => {

git.plugins.set("fs", window.fs)
git.plugins.set("pgp", window.pgp) //TODO: window. necessary?

fixGitArgs = (env, arg) => Object.assign({}, arg, {corsProxy: "https://cors.isomorphic-git.org", dir: env.dir, signingKey: env.gitKey})

window.gitFunc = (otp, env) => git[env.arg[0]](fixGitArgs(env, env.arg[1])).then(x => otp(JSON.stringify(x) || "done"))

window.gitLoaded = true

})
