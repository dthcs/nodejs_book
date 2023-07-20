const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const parseCookies = (cookie = '') =>
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

http.createServer(async(req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    // address = /login
    if(req.url.startsWith('/login')){
        const url = new URL(req.url, 'http://localhost:8084');
        const name = url.searchParams.get('name');
        const expires = new Date();

        // cookie valid time = current time + 5 mins
        expires.setMinutes(expires.getMinutes()+5);
        res.writeHead(302, {
            Location: '/', 'Set-Cookie': `name=${encodeURIComponent(name)}; Expires = ${expires.toGMTString()}; HttpOnly; Path=/`,

        });
        res.end();
        // address = '/'and cookie = name
    }else if(cookies.name){
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        res.end(`Hello ${cookies.name}`);
    }else{ // address = '/' and not have cookie=name
        try{
            const data = await fs.readFile(path.join(__dirname, 'cookie2.html'));
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(data);
        }
        catch(err){
            res.writeHead(500, {'Content-Type': 'text/plain; charset=utf-8'});
            res.end(err.message);
        }
    }
})

.listen(8084, () => {
    console.log('8084 port waiting');
});