ed = (inp, otp, text) => {

assignThen = assign => after => state => after(Object.assign({}, state, assign))
otpThen = msg => after => state => { state.otp(msg); return after(state) }
err = errMsg => assignThen({ errMsg })(otpThen("?")(mainLoop))

withLineNumber = after => inpStr => // TODO
withLineRange = after => rangeStr => withLineNumber(...)(after(...)) // TODO sets line number, and calls after with range
readLineNumThen = after => inpStr => ... withLineRange(new inpStr)(after) // TODO

normalCmds = {}
normalCmds.q = // TODO
normalCmds.a = assignThen({ mode: "append" })(mainLoop)
normalCmds.i = withLineNumber("-")(normalCmds.a)
normalCmds.d = // TODO
// etc

normalAfterLineNum = inpStr => (inpStr[0] in normalCmds) : normalCmds[inpStr[0]] ? err("Unknown command")
appendAssumingNoPeriod = // TODO

modes = {}
modes.normal = readLineNumThen(normalAfterLineNum)
modes.append = inpStr => (inpStr === ".") ? assignThen({ mode: "normal" })(mainLoop) : appendAssumingNoPeriod(inpStr)
modes.v = // TODO

modeNotFound = assignThen({ mode: "normal" })(err("Unknown mode (should never happen); sending you back to normal mode"))
monBlankInput = inpStr => state => (state.mode in modes) : modes[state.mode](inpStr)(state) ? modeNotFound

blankInput = // TODO

mainLoopGivenStr = str => (inpStr === "") ? blankInput : nonBlankInput(inpStr)
mainLoop = state => mainLoopGivenStr(state.inp())(state)

return mainLoop({ inp, otp, file: text.split("\n"), errMsg: "", lineNum: 0, mode: "normal" })
}
