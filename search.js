function hndlr(response) {
    results = []
    console.log(response);
    for (var i = 0; i < response.items.length; i++) {
        var item = response.items[i];
        results.push({ title: item.htmlTitle, link: item.link });
        // in production code, item.htmlTitle should have the HTML entities escaped.
        document.getElementById("content").innerHTML += "<br>" + item.htmlTitle;
        document.getElementById("content").innerHTML += "<br>" + item.link;
    }
    console.log(results);
}
