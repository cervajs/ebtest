'use strict';
const os = require('os')
const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply('Hello, world!');
    }
});

server.route({
    method: 'GET',
    path: '/health',
    handler: function (request, reply) {
        var health = {
            cpu_load: os.loadavg(),
            mem_free: os.freemem(),
            mem_free_percent: os.freemem() / os.totalmem() * 100,
            mem_total: os.totalmem(),
            os_uptime: os.uptime()
        }
        reply(health);
    }
});


/*function LeakingClass() {}

var leaks = [];
setInterval(function() {
    for (var i = 0; i < 100000; i++) {
        leaks.push(new LeakingClass);
    }

    console.error('Leaks: %d', leaks.length);
}, 1000);
*/

server.start((err) => {

    if (err) {
        throw err;
    }
    console.log(`Server running at: ${server.info.uri}`);
});
