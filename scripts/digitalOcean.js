// depends on: scripts/myPage.js

waitFor("myPageLoaded", () => {

getDigOceanArg = getArg("digitalOceanKey")
digOceanWrapper = f => notChangeEnv(getDigOceanArg(noInp(f)))

digitalOceanRequest = (key, addressEnd, callback, errCallback, requestType = "GET") => {
	requ = new XMLHttpRequest()
	requ.onload = () => { try {
		callback(JSON.parse(requ.response))
	} catch (err) {
		errCallback(err)
	}}
	requ.open(requestType, "https://api.digitalocean.com/v2/" + addressEnd)
	requ.setRequestHeader("Authorization", "Bearer " + key)
	requ.send()
}

keyValsToAddressEnd = vals => {
	if (vals.length == 0) {
		return ""
	} else {
		str = vals[0][0] + "=" + vals[0][1]
		if (vals.length > 1) {
			str += "&" + keyValsToAddressEnd(vals.slice(1))
		}
		return str
	}
}

funcs.createDroplet = digOceanWrapper((otp, key) => {
	digitalOceanRequest(key, "snapshots?resource_type=droplet", function (snapshots) {
		digitalOceanRequest(key, "droplets?" + keyValsToAddressEnd([
			["name", "mm"],
			["region", "nyc1"],
			["size", "s-1vcpu-1gb"],
			["image", snapshots.snapshots[0].id]
		]), (() => {}), otp, "POST")
	}, otp)
})

funcs.showDropletIP = digOceanWrapper((otp, key) => {
	digitalOceanRequest(key, "droplets", function (droplets) {
		otp(droplets.droplets[0].networks.v4[0].ip_address)
	}, otp)
})

funcs.showNumDroplets = digOceanWrapper((otp, key) => {
	digitalOceanRequest(key, "droplets", function (droplets) {
		otp(droplets.droplets.length)
	}, otp)
})

funcs.killAllDroplets = digOceanWrapper((otp, key) => {
	digitalOceanRequest(key, "droplets", function (droplets) {
		droplets.droplets.forEach(function (droplet) {
			digitalOceanRequest(key, "droplets/" + droplet.id, (() => {}), (() => {}), "DELETE")
		})
	}, otp)
})

digitalOceanLoaded = true

})
