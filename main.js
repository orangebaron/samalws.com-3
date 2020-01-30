urlParts = document.URL.split("?", 2)
urlToGet = "loremIpsum"
if (urlParts.length == 2) {
	urlToGet = urlParts[1]
}
requ = new XMLHttpRequest()
requ.onload = () => {
	document.getElementById("mainSection").innerHTML = requ.response
}
requ.open("GET", "https://samalws.com/pages/" + urlToGet + ".html")
requ.send()
