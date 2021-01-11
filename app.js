const express         = require( "express" );
const bodyParser      = require( "body-parser" );
const morgan          = require( "morgan" );
const { Prohairesis } = require( "prohairesis" );
const env             = require( "./env" );
const database = new Prohairesis( env.CLEARDB_DATABASE_URL );
const app = express();
app
    .use( morgan( "dev" ) )
    .use( bodyParser.urlencoded( { extended: false } ) )
    .use( bodyParser.json() )
    // creating a new user
    .post( "/api/user", async ( req, res ) => {
        const { username, password } = req.body;
        try {
            await database.query(
                `INSERT INTO User(
                    username,
                    password,
                    date_added
                ) VALUES (
                    @username,
                    @password,
                    NOW()
                )`,
                {
                    username: username,
                    password: password
                }
            );
            res.status( 200 );
            res.end( `Added user ${ username }` );
        } catch ( e ) {
            console.error( "Error adding user" );
            res.status( 500 );
            res.end( "Error adding user. Does this user exist already?" );
        };
    } )
    // logging in
    .put( "/api/user", async ( req, res ) => {
        const { username, password } = req.body;
        try {
            const user = await database.query(
                `SELECT
                    *
                FROM
                    User
                WHERE
                    username = @username
                    AND password = SHA2( @password, 256 )`,
                {
                    username: username,
                    password: password
                }
            );
            res.status( 200 );
            res.end( `User ${ username } exists` );
        } catch ( e ) {
            console.error( "Error retrieving user" );
            res.status( 500 );
            res.end( "Error finding user. Does this user exist?" );
        };
    } )
    .get( "/api/user", async ( req, res ) => {
        try {
            const users = await database.query(
                `SELECT
                    username,
                    date_added
                FROM
                    User`
            );
            res.status( 200 );
            res.json( users );
        } catch ( e ) {
            console.error( "Error retrieving users" );
            res.status( 500 );
            res.end( "Error finding users." );
        };
    } )
    .listen( 3000 );
