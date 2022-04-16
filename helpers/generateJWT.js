const jwt = require('jsonwebtoken');

const generateToken = ( uid = '' ) => {

    return new Promise( ( resolve, reject ) => {

        const payload = { uid };
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY, { expiresIn: '4h' }, ( err, token ) => {
        
            if ( err ) {
                reject('Error al generar el token');
            } else {
                resolve( token );
            }
        });
    });    
}

module.exports = {
    generateToken
}