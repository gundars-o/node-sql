const { Prohairesis } = require( "prohairesis" );
const env             = require( "./env" );
const database = new Prohairesis( env.CLEARDB_DATABASE_URL );
database
    .query(
        `CREATE TABLE User(
            username VARCHAR( 20 ) NOT NULL PRIMARY KEY,
            password VARCHAR( 300 ) NOT NULL,
            date_added DATETIME
        )`
    )
    .then( ( res ) => {
            console.log( res );
    } )
    .catch( ( e ) => {
            console.error( e );
    } );
