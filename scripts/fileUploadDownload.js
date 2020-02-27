// depends on: scripts/myPage.js

waitFor("myPageLoaded", () => {

fileReader = new FileReader()
fileUpload = () => fileReader.readAsText(document.getElementById("fileUpload").files[0])
funcs.varFromComputer = noIO(env => Object.assign({}, env, { [env.arg]: fileReader.result }))
funcs.varToComputer = notChangeEnv(noInp((otp, env) => otp("<a href='" + Object.createObjectURL(env[env.arg]) + "'>ok</a>")))

})
