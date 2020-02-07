// depends on: scripts/digitalOcean.js

waitFor("digitalOceanLoaded", () => {

setGlobalVarFunc = k => (_, __, env) => Object.assign({}, env, {[k]: env.arg})
notChangeEnv = f => (inp, otp, env) => { f(inp, otp, env); return env }
noInp = f => (_, otp, env) => f(otp, env)
getArg = k => f => (inp, otp, env) => f(inp, otp, env[k])

getDigOceanArg = getArg("digitalOceanKey")
digOceanWrapper = f => notChangeEnv(getDigOceanArg(noInp(f)))

funcs = {
	"setDigOceanKey": setGlobalVarFunc("digitalOceanKey"),
	"createDroplet": digOceanWrapper(createDroplet),
	"showDropletIP": digOceanWrapper(showDropletIP),
	"showNumDroplets": digOceanWrapper(showNumDroplets),
	"killAllDroplets": digOceanWrapper(killAllDroplets),
	"showEnv": notChangeEnv((_, otp, env) => otp(JSON.stringify(env))),
	"help": notChangeEnv((_, otp, __) => otp(Object.keys(funcs))),
}

runCmd = cmdText => (inp, otp, env) => {
	otp("> " + cmdText)
	spaceIndex = cmdText.indexOf(" ")
	hasSpace = spaceIndex != -1
	cmd = hasSpace ? cmdText.substring(0, spaceIndex) : cmdText
	arg = hasSpace ? eval(cmdText.substring(spaceIndex + 1)) : undefined
	return funcs[cmd](inp, otp, Object.assign({}, env, {"arg": arg}))
}

otpSpaceElement = document.getElementById("outputSpace")
cmdElement = document.getElementById("cmd")
inp = prompt
otp = s => otpSpaceElement.innerHTML += "<p>" + s + "</p>"
env = {}
cmdElement.onkeypress = (e) => {
	if (e.keyCode == "13") {
		env = runCmd(cmdElement.value)(inp, otp, env)
		cmdElement.value = ""
	}
}

})
