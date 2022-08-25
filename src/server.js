const Hapi = require("hapi")
const route = require("./routes.js")

const init = async () => {
    const server = Hapi.server({
        port : 8003,
        host : process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
        routes: {
            cors: {
              origin: ['*'],
            },
          },
    })
    server.route(route)
    await server.start()
        console.log(`Server sedang berjalan pada ${server.info.uri}`)
}
init()

 