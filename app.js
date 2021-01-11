const { Prohairesis } = require( "prohairesis" );
const env             = require( "./env" );
const database = new Prohairesis( env.CLEARDB_DATABASE_URL );
database
    .query(
        `INSERT INTO User (
            username,
            password,
            date_added
        ) VALUES (
            "jake",
            SHA2( "password", 256 ),
            NOW()
        )`
    )
    .then( ( res ) => {
            console.log( res );
    } )
    .catch( ( e ) => {
            console.error( e );
    } )
    .finally( () => {
        database.close();
    } );
