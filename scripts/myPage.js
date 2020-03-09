notChangeEnv = f => (inp, otp, env) => { f(inp, otp, env); return env }
noEnv = f => (inp, otp, _) => f(inp, otp)
getArg = k => f => (inp, otp, env) => f(inp, otp, env[k])
onlyLookAtArg = f => notChangeEnv(getArg("arg")(f))
noInp = f => (_, otp, env) => f(otp, env)
noIO = f => (_, __, env) => f(env)

funcs = {
	"showEnv": notChangeEnv((_, otp, env) => otp(JSON.stringify(env))),
	"setVar": (_, __, env) => Object.assign({}, env, {[env.arg[0]]: env.arg[1]}),
	"showVar": noInp(notChangeEnv((otp, env) => otp(env[env.arg]))),
	"promptVar": (inp, _, env) => Object.assign({}, env, {[env.arg]: inp()}),
	"setEnv": noIO(env => env.arg),
	"help": notChangeEnv((_, otp, __) => otp(Object.keys(funcs).join(", "))),
	"applyJSONVar": noIO(env => Object.assign({}, env, eval("(" + env[env.arg] + ")"))),
	"clear": notChangeEnv(noIO(_ => document.getElementById("outputSpace").innerHTML = "")),
}

runCmd = cmdText => (inp, otp, env) => {
	otp("> " + cmdText)
	spaceIndex = cmdText.indexOf(" ")
	hasSpace = spaceIndex != -1
	cmd = hasSpace ? cmdText.substring(0, spaceIndex) : cmdText
	arg = hasSpace ? eval("(" + cmdText.substring(spaceIndex + 1) + ")") : undefined
	try {
		return funcs[cmd](inp, otp, Object.assign({}, env, {"arg": arg}))
	} catch (e) {
		otp(e)
		return env
	}
}

inpElement = document.getElementById("inp")
inpListener = undefined
inp = listener => {
	inpElement.setAttribute("placeholder", "waiting")
	promise = new Promise((f, _) => { inpListener = f })
	return promise
}
inpElement.onKeyPress = e => {
	if (e.keyCode == "13") {
		inpElement.setAttribute("placeholder", "")
		// listener could take time
		oldVal = inpElement.value
		oldListener = inpListener
		inpElement.value = ""
		inpListener = undefined
		oldListener(oldVal)
	}
}

otpSpaceElement = document.getElementById("outputSpace")
cmdElement = document.getElementById("cmd")
inp = prompt
otp = s => otpSpaceElement.innerHTML += "<p>" + s + "</p>"
env = {}
cmdElement.onkeypress = e => {
	if (e.keyCode == "13") {
		newEnv = runCmd(cmdElement.value)(inp, otp, env)
		if (newEnv.constructor.name == "Promise")
			newEnv.then(val => {
				env = val
				cmdElement.value = ""
			})
		else {
			env = newEnv
			cmdElement.value = ""
		}
	}
}

myPageLoaded = true
