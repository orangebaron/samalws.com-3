// depends on: scripts/myPage.js

waitFor("myPageLoaded", () => {

proxy = "https://cors-anywhere.herokuapp.com/"

proxiedRequest = (url, otp) => {
	requ = new XMLHttpRequest()
	requ.onload = () => otp(requ.response)
	requ.open("GET", proxy + url)
	requ.send()
}

funcs.ssh = notChangeEnv(noInp((otp, env) => proxiedRequest(env.serverUrl + ":880/" + env.arg, otp)))
funcs.ftp = notChangeEnv(noInp((otp, env) => proxiedRequest(env.serverUrl + ":654", otp)))
funcs.ftpToFile = notChangeEnv(noIO(env => proxiedRequest(env.serverUrl + ":654", response => funcs.write({}, {}, {arg: [env.arg, response]}))))

serverLoaded = true

})
