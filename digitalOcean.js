requ = new XMLHttpRequest()
requ.onload = function() {
	alert(requ.response)
}
requ.open("GET", "https://api.digitalocean.com/v2/droplets")
requ.setRequestHeader("Authorization", "Bearer " + prompt("digitalocean key?"))
requ.send()
