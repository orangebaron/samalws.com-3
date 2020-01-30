defaultUrl = "loremIpsum"
fixScript = (elem) => {
	script = document.createElement("script")
	script.setAttribute("src", elem.src)
	document.body.appendChild(script)
}
replaceScripts = (elem) => {
	childNodes = elem.childNodes
	for (i = 0; i < childNodes.length; i++)
		if (childNodes[i].nodeName == "SCRIPT")
			fixScript(childNodes[i])
}
xmlRequ = (url, handler) => {
	requ = new XMLHttpRequest()
	requ.onload = () => { handler(requ) }
	requ.open("GET", url)
	requ.send()
}
getPage = (urlToGet) => {
	xmlRequ("pages/" + urlToGet + ".html", (requ) => {
		if (requ.status == 200) {
			addTo = document.getElementById("mainSection")
			addTo.innerHTML = requ.response
			replaceScripts(addTo)
		} else
			getPage(defaultUrl)
	})
}

urlParts = document.URL.split("?", 2)
getPage(urlParts.length == 2 ? urlParts[1] : defaultUrl)

safeRerun = (f) => {
	try {
		f()
	} catch (_) {
		setTimeout(() => { safeRerun(f) }, 100)
	}
}
