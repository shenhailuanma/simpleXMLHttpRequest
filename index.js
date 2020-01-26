/**
 * simple http request
 * @param method  default 'GET'
 * @param url
 * @param timeout // set timeout, timeout(ms), 0: no timeout, default: 10000 (10s)
 * @param ontimeoutCallback
 * @param dataType  // default 'json', support: 'json' 'text' 'document'
 * @param data // request data, default: null
 * @param headers // headers list, format: [{"key":"Content-Type", "value":"application/json"}]
 * @param onSuccess
 * @param onFail
 */
function httpRequest({
    method = 'GET',
    url = null,
    timeout = 10000,
    ontimeoutCallback = null,
    dataType = 'json',
    data = null,
    headers = [],
    onSuccess = (res) => {},
    onFail = (err) => {},
}) {

    let xhr = new XMLHttpRequest();

    xhr.open(method, url);

    // set events
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                // request success
                // get response text
                let response = xhr.responseText;
                console.log("httpRequest success, response:", response);
            } else {
                // request failed
                console.log("httpRequest failed.");
            }

            if (xhr.status >= 200 && xhr.status < 400) {
                onSuccess(xhr.response);
            } else {
                onFail(new Error(xhr.statusText));
            }
        }
    };

    if (ontimeoutCallback) {
        xhr.ontimeout = ontimeoutCallback;
    }

    // set timeout, timeout(ms), 0: no timeout
    xhr.timeout = timeout;

    // set response data type: 'json' 'text' 'document' ...
    switch (dataType) {
        case 'json':
            xhr.responseType = 'json';
            xhr.setRequestHeader('Accept', 'application/json');
            break;
        default:
            xhr.setRequestHeader('Accept', '*/*');
    }

    // set headers
    headers.forEach((item, index, arr) => {
        xhr.setRequestHeader(item.key, item.value);
    });

    // request send
    if (data) {
        xhr.send(data);
    } else {
        xhr.send();
    }
}