// depends on: scripts/myPage.js

waitFor("myPageLoaded", () => {

fileReader = new FileReader()
fileUpload = () => fileReader.readAsText(document.getElementById("fileUpload").files[0])
funcs.uploadFile = noIO(env => Object.assign({}, env, { [env.arg]: fileReader.result }))

fileUploadLoaded = true

})
