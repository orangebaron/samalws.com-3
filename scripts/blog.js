defaultBlogPage = "blogHome"
blogRequ = (page) => {
	xmlRequ("content/" + page + ".md", (requ) => {
		if (requ.status == 200)
			document.getElementById("blogContent").innerHTML = new showdown.Converter().makeHtml(requ.response)
		else
			blogRequ(defaultBlogPage)
	})
}

urlParts = document.URL.split("?", 3)
blogRequ(urlParts.length == 3 ? urlParts[2] : defaultBlogPage)
