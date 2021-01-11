const { Prohairesis } = require( "prohairesis" );
const env             = require( "./env" );
const database = new Prohairesis( env.CLEARDB_DATABASE_URL );
database
    .query(
        `SELECT * FROM User`
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
