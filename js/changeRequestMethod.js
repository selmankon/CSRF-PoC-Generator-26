$("#changeRequestMethod").click(async function () {
    var request = $("#request").val();
    var headerLines = request.split("\n");
    var newRequest = {};

    newRequest.method = (headerLines[0].split(" ")[0] == "POST") ? "GET" : "POST"; // Ternary  
    newRequest.path = headerLines[0].split(" ")[1];
    newRequest.HTTPVersion = headerLines[0].split(" ")[2];

    // Getting the data
    if (newRequest.method == "POST") {
        if (headerLines[0].split(" ")[0] != "GET") {
            // Copied! animation for the button
            var elem = document.getElementById("changeRequestMethod");
            elem.innerHTML = "Unknown method. Only POST and GET!";
            await sleep(1200);
            elem.innerHTML = "Change request method";
        }
        else var data = newRequest.path.split("?")[1];
    }
    else if (newRequest.method == "GET") {
        var i = headerLines.length;
        while (!headerLines[i]) {
            var data = headerLines[i - 1];
            i--;
        }
    }

    // Adjusting the path
    if (newRequest.method == "GET") {
        newRequest.path += "?" + data;
    }
    else if (newRequest.method == "POST") {
        newRequest.path = newRequest.path.split("?")[0];
    }
    $("#request").val(changeRequestMethod(newRequest, headerLines, data));
});

function changeRequestMethod(newRequest, headerLines, data) {
    if (!data){
        var request = $("#request").val();
        return request;
    }
    var result = newRequest.method + " " + newRequest.path + " " + newRequest.HTTPVersion + "\n";
    for (var i = 0; i < headerLines.length; i++) {
        var line = headerLines[i].split(" ");
        if (newRequest.method == "GET") {
            // Ignoring to some lines
            if (line[0] == "Content-Length:" || line[0] == "Content-Type:" || line[0] == data || i == 0) {
                continue;
            }

            for (var j = 0; j < line.length; j++) {
                result += line[j] + (j == line.length - 1 ? "\n" : " ");
            }
        }
        else if (newRequest.method == "POST") {
            // Ignoring to first line
            if (i == 0) continue;

            for (var j = 0; j < line.length; j++) {
                // Ignoring to blank lines
                if (!headerLines[i]) continue;

                result += line[j] + (j == line.length - 1 ? "\n" : " ");
            }
            if (i == headerLines.length - 1) {
                result += "Content-Length: " + data.length + "\n";
                result += "Content-Type: application/x-www-form-urlencoded\n";
                result += "\n" + data + "\n\n";
            }
        }
    }
    return result;
}
