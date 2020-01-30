defaultBlogPage = "My_Blog"
blogRequ = (page) => {
	xmlRequ("content/" + page + ".md", (requ) => {
		if (requ.status == 200) {
			while (true) {
				try { // showdown can be undefined until it loads
					document.getElementById("blogContent").innerHTML = new showdown.Converter().makeHtml(requ.response)
					error()
					break
				} catch (_) {}
			}
		} else
			blogRequ(defaultBlogPage)
	})
}

urlParts = document.URL.split("?", 3)
blogRequ(urlParts.length == 3 ? urlParts[2] : defaultBlogPage)
