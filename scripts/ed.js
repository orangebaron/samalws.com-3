ed = (inp, otp, text) => {

con = x => y => x
assignThen = assign => after => state => after(Object.assign({}, state, assign))
otpThen = msg => after => state => { state.otp(msg); return after(state) }
err = errMsg => assignThen({ errMsg })(otpThen("?")(mainLoop))

separateLineNumPart = str => (str === "") ? ["", ""] : (str[0] in "1234567890,$;+-.") ? (sep => [str[0] + sep[0], sep[1]])(separateLineNumPart(str.slice(1))) : ["", str]

withLineNumber = after => inpStr => // TODO
withLineRange = after => rangeStr => withLineNumber(...)(after(...)) // TODO sets line number, and calls after with range
readLineNumThen = after => inpStr => (sep => withLineRange(after(sep[1]))(sep[0]))(separateLineNumPart(inpStr))

normalCmds = {}
normalCmds.q = con(state => con(state.join("\n")))
normalCmds.a = con(assignThen({ mode: "append" })(mainLoop))
normalCmds.i = con(withLineNumber("-")(normalCmds.a))
normalCmds.d = rangeLen => state => mainLoop(Object.assign({}, state, file: state.file.slice(0, state.lineNum) + state.file.slice(state.lineNum + rangeLen)))
normalCmds.c = rangeLen => state => normalCmds.a(rangeLen, state, Object.assign({}, state, file: state.file.slice(0, state.lineNum) + state.file.slice(state.lineNum + rangeLen)))
normalCmds.p = rangeLen => state => { (state.file.slice(state.lineNum, state.lineNum + rangeLen)).forEach(state.otp); mainLoop(state) }
normalCmds[""] = normalCmds.p
normalCmds["="] = con(state => state.otp(state.lineNum))
// etc

normalAfterLineNum = inpStr => (inpStr[0] in normalCmds) : normalCmds[inpStr[0]] ? err("Unknown command")
appendAssumingNoPeriod = inpStr => state => mainLoop(Object.assign({}, state, { file: state.file.slice(0, state.lineNum) + [inpStr] + state.file.slice(state.lineNum), lineNum: state.lineNum + 1 }))

modes = {}
modes.normal = readLineNumThen(normalAfterLineNum)
modes.append = inpStr => (inpStr === ".") ? assignThen({ mode: "normal" })(mainLoop) : appendAssumingNoPeriod(inpStr)
//modes.v = // TODO

modeNotFound = assignThen({ mode: "normal" })(err("Unknown mode (should never happen); sending you back to normal mode"))
nonBlankInput = inpStr => state => (state.mode in modes) : modes[state.mode](inpStr)(state) ? modeNotFound

blankInput = nonBlankInput("+p")

mainLoopGivenStr = str => (inpStr === "") ? blankInput : nonBlankInput(inpStr)
mainLoop = state => mainLoopGivenStr(state.inp())(state)

return mainLoop({ inp, otp, file: text.split("\n"), errMsg: "", lineNum: 0, mode: "normal" })
}
