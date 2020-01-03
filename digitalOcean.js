function digitalOceanRequest(key, addressEnd, callback, requestType = "GET") {
	requ = new XMLHttpRequest()
	requ.onload = (() => callback(JSON.parse(requ.response)))
	requ.open(requestType, "https://api.digitalocean.com/v2/" + addressEnd)
	requ.setRequestHeader("Authorization", "Bearer " + key)
	requ.send()
}

function keyValsToAddressEnd(vals) {
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

function createDroplet(key) {
	digitalOceanRequest(key, "snapshots?resource_type=droplet", function (snapshots) {
		digitalOceanRequest(key, "droplets?" + keyValsToAddressEnd([
			["name", "mm"],
			["region", "nyc1"],
			["size", "s-1vcpu-1gb"],
			["image", snapshots.snapshots[0].id]
		]), (_ => {}), "POST")
	})
}

function showDropletNetworkInfo(otp, key) {
	digitalOceanRequest(key, "droplets", function (droplets) {
		otp(droplets.droplets[0].networks.v4[0].ip_address)
	})
}

function killAllDroplets(key) {
	digitalOceanRequest(key, "droplets", function (droplets) {
		droplets.droplets.forEach(function (droplet) {
			digitalOceanRequest(key, "droplets/" + droplet.id, (_ => {}), "DELETE")
		})
	})
}
