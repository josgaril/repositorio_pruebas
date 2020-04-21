/**
 * llamada ajax en vanilla javascript
 * @param {*} metodo 
 * @param {*} url 
 * @param {*} datos 
 * @return Promise
 */
function ajax(metodo, url, datos) {

    return new Promise((resolve, reject) => {

        console.debug(`promesa ajax metodo ${metodo} - ${url}`);
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {

            if (this.readyState == 4) {

                if (this.status == 200 || this.status == 201) {
                    if (this.responseText) {
                        const jsonData = JSON.parse(this.responseText);
                        console.debug(jsonData);

                        // funciona promesa, then
                        resolve(jsonData);
                    } else {
                        resolve();
                    }
                } else {
                    // falla promesa, catch
                    if (this.responseText) {
                        reject(JSON.parse(this.responseText));
                    } else {
                        reject(this.status);
                    }

                    //reject(Error( JSON.parse(this.responseText) ));
                }
            } // readyState == 4

        }; // onreadystatechange

        xhttp.open(metodo, url, true);
        xhttp.setRequestHeader('Content-Type', 'application/json');
        xhttp.send(JSON.stringify(datos));
    });
}