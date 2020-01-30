defaultUrl = "loremIpsum"
getPage = (urlToGet) => {
	requ = new XMLHttpRequest()
	requ.onload = () => {
		if (requ.status == 200)
			document.getElementById("mainSection").innerHTML = requ.response
		else
			getPage(defaultUrl)
	}
	requ.open("GET", "https://samalws.com/pages/" + urlToGet + ".html")
	requ.send()
}

urlParts = document.URL.split("?", 2)
getPage(urlParts.length == 2 ? urlParts[1] : defaultUrl)
