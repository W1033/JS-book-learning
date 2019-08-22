function getURL(URL) {
    return new Promise((resolve, reject) => {
        let req = new XMLHttpRequest();
        req.open('GET', URL, true);
        req.onload = function() {
            if (req.status === 200 || req.status === 304) {
                resolve(req.responseText);
            } else {
                reject(new Error(req.statusText));
            }
        };
        req.onerror = function() {
            reject(new Error(req.statusText));
        }
        xhr.send()

        // var xhr = new XMLHttpRequest()
        // xhr.open('GET', URL, true)
        // xhr.onreadystatechange = function() {
        //   if (this.readyState === 4 && this.status === 200) {
        //     resolve(this.responseText)
        //   } else {
        //     reject(new Error(this.statusText))
        //   }
        // }
        // xhr.send()
       


    })
}
let URL = 'http://httpbin.org/get';
getURL(URL).then((fulfilled) => {
    console.log(fulfilled);
}).catch((rejected) => {
    console.log(rejected);
});