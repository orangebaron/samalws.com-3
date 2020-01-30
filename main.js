defaultUrl = "loremIpsum"
xmlRequ = (url, handler) => {
	requ = new XMLHttpRequest()
	requ.onload = () => { handler(requ) }
	requ.open("GET", url)
	requ.send()
}
fixScript = (elem) => {
	xmlRequ(elem.src, (requ) => { elem.innerHTML = requ.response })
}
replaceScripts = (elem) => {
	childNodes = elem.childNodes
	for (i = 0; i < childNodes.length; i++)
		if (childNodes[i].nodeName == "SCRIPT")
			fixScript(childNodes[i])
}
getPage = (urlToGet) => {
	xmlRequ("https://samalws.com/pages/" + urlToGet + ".html", (requ) => {
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
