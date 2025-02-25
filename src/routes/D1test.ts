import { Hono } from 'hono'
const router = new Hono();

let accountID = 'ac61b4a50072a479baebb47ac6093beb';
let dbID = '55501be3-4450-4888-93c7-bbbf0d883137';
let apiToken = '5V5wfxWoIPdEXpCDBK65Kw1mh3d9mdw3raDwgz09';
let queryUrl = `https://api.cloudflare.com/client/v4/accounts/${accountID}/d1/database/${dbID}/query`;
let headers = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Authorization": `Bearer ${apiToken}`
};

router.post('/set' , async c => {

    let body = await c.req.json();
    let data = body.data;

    if(!data) {

        return c.json({msg: "something wrong"});
    }

    let dbHeader = await fetch(queryUrl , {

        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "sql": `INSERT INTO testtable (data) VALUES (?)`,
            "params": [data]
        })
    })

    let dbBody = await dbHeader.json();

    console.log(dbBody);

    if(!dbBody) {

        return c.json({msg: 'something wrong'});
    }

    return c.json(dbBody.result);
})

router.post('/get' , async c => {

    let body = await c.req.json();
    let id = body.id;

    if(!id) {

        return c.json({msg: 'something wrong'});
    }

    let dbHeader  = await fetch(queryUrl , {

        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            "sql": `SELECT * FROM testtable WHERE id = ?`,
            "params": [id]
        })
    })

    let dbBody = await dbHeader.json();

    console.log(dbBody);

    if(!dbBody) {

        return c.json({msg: 'something wrong'});
    }

    return c.json(dbBody.result[0].results);
})

export default router;