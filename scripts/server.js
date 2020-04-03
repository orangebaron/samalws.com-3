// depends on: scripts/myPage.js

waitFor("myPageLoaded", () => {

proxy = "https://cors-anywhere.herokuapp.com/"

proxiedRequest = (url, otp) => {
	requ = new XMLHttpRequest()
	requ.onload = () => otp(requ.response)
	requ.open("GET", proxy + url)
	requ.send()
}

funcs.ssh = (otp, env) => proxiedRequest(env.serverUrl + ":880/" + env.arg + "~", otp)
funcs.ftp = (otp, env) => proxiedRequest(env.serverUrl + ":654", otp)

serverLoaded = true

})
