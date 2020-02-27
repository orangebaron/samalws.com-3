// depends on: scripts/fs.js, scripts/pgp.js, and https://unpkg.com/isomorphic-git, scripts/myPage.js

waitForMultiple(["fsLoaded", "pgpLoaded", "git", "myPageLoaded"], () => {

git.plugins.set("fs", fs)
git.plugins.set("pgp", {sign: pgpSign, verify: pgpVerify})

fixGitArgs = (env, arg) => Object.assign({}, arg, {corsProxy: "https://cors.isomorphic-git.org", dir: env.dir, signingKey: env.privateKey}, env.gitArgs)

gitFunc = notChangeEnv(noInp((otp, env) => git[env.arg[0]](fixGitArgs(env, env.arg[1])).then(x => otp(JSON.stringify(x) || "done"))))

gitLoaded = true

})
