fileReader = new FileReader()
fileUpload = () => fileReader.readAsText(document.getElementById("fileUpload").files[0])
uploadFile = env => Object.assign({}, env, { [env.arg]: fileReader.result })
