// depends on: scripts/myPage.js

waitFor("myPageLoaded", () => {

fileReader = new FileReader()
fileUpload = () => fileReader.readAsText(document.getElementById("fileUpload").files[0])
funcs.computerToVar = noIO(env => Object.assign({}, env, { [env.arg]: fileReader.result }))
funcs.varToComputer = notChangeEnv(noInp((otp, env) => otp("<a target='_blank' href='" + URL.createObjectURL(new Blob([env[env.arg]])) + "'>ok</a>")))

})
