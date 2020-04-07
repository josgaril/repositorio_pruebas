 const frutas = [{
                "nombre": "fresa",
                "precio": 4.56,
                "oferta": true,
                "descuento": 50,
                "colores": ["rojo"]
            },
            {
                "nombre": "manzana",
                "precio": 1.99,
                "oferta": false,
                "descuento": 50,
                "colores": ["rojo", "verde", "amarillo"]
            },
            {
                "nombre": "kiwi",
                "precio": 3.00,
                "oferta": false,
                "descuento": 10,
                "colores": ["verde", "amarillo"]
            }
        ];
        console.info('1-Array solo con nombres de frutas');
        const frutasNombre = frutas.map(el => el.nombre);
        console.debug(frutasNombre);

        console.info('2-Array solo con nombres de frutas que están en oferta ');
        const frutasOferta = frutas.filter(el => (el.oferta)).map(el => el.nombre);
        console.debug(frutasOferta);

        console.info('3-Precio TOTAL de todas las frutas ');
        const frutasTotal = frutas.map(el => el.precio).reduce((previous, current) => {
            return previous + current;
        }, 0);
        console.debug(frutasTotal);

        console.info('4-Precio TOTAL de todas las frutas, pero aplicando el descuento si están en oferta ');
        const frutasTotalConDescuentos = frutas.map( el=> {
                                                            if (el.oferta){
                                                                return (el.precio - el.precio * (el.descuento/100));
                                                            }else{
                                                                return el.precio;
                                                            }
                                                }).reduce(function (previous, current) {
                                                    return previous + current;
                                                }, 0);
        /* Forma reducida 
        const frutasTotalConDescuentos = frutas.map( el=> (el.oferta) ? el.precio - (el.precio * el.descuento / 100) : el.precio).reduce(function (previous, current) {
                                                    return previous + current;
                                                }, 0);
        */
       /* 
       Mi forma de hacerlo. No está mal pero mejor las otras.
        const frutasTotalConDescuentos = frutas.filter(el => (el.oferta))
                                                .map(el => el.precio -= el.precio * el.descuento / 100)
                                                .concat(frutas.filter(el => (!el.oferta))
                                                .map(el => el.precio))
                                                .reduce(function (previous, current) {
                                                    return previous + current;
                                                }, 0); */
        console.debug(frutasTotalConDescuentos);

        console.info('5-Array solo con los colores de las frutas ');
        const frutasColores = frutas.map(el => el.colores).reduce(function (previous, current) {
            return previous.concat(current);
        });
        /* Forma reducida
        const frutasColores = frutas.map(el => el.colores).reduce( (previous, current) => previous.concat(current)); 
        */
        console.debug(frutasColores);

        console.info('6-Array solo con los colores de las frutas SIN REPETICIÓN ');
        const frutasCOloresSinRepetir =[...new Set(frutas.map(el => el.colores).reduce((previous, current) => previous.concat(current)))];
        console.debug(frutasCOloresSinRepetir);