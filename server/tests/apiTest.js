async function getData(method, url, commentString, data) {
    
    try {
        console.log(commentString);
        //check request method
        if (method == "GET") {
            url = url + "?" + new URLSearchParams(data);
            options = { method }
        } else {
            options = { method, body: JSON.stringify(data) }
        }

        console.log("URL: " + url)
        //perform http request
        let res = await fetch(url, options);

        if (!res.ok) {
            console.log("Error sending request - Status: " + res.status);
        }
        //convert to json
        const jsonRes = await res.json();
        console.log(jsonRes)
    } catch (error) {

        switch(error.cause.code){
            case "ECONNREFUSED":
                return {error: true, message: "Connection Refused"};
            default:
                return {error: true, message: "error.message"}
        }
    }

}


//config api tests
getData("GET", "http://localhost:3000/api/config", "Config API", {})

getData("GET", "http://localhost:3000/api/mapping", "Mapping with prompt", { prompt: "Get me some maps" });