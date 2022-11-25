const Hapi = require('@hapi/hapi')

const routes = require('./routes')

class App {
  constructor () {
    this.server = Hapi.server({
      host: process.env.HOST ?? "127.0.0.1",
      port: process.env.PORT ?? 9230,
      routes: {
        // cors: {
        //   origin: [process.env.CORS_ORIGIN ?? false]
        // }
      }
    })
  }

  async loadSettingsAndStartServer () {
    await this.plugins()
    await this.routes()
    await this.start()
  }

  async plugins () {
    // Here we can register plugins like authentication token interceptors
  }

  async routes () {
    await this.server.route(routes)
  }

  async start () {
    await this.server.start()
    console.log(`Server running on ${this.server.info.uri}`)
  }
}

module.exports = App
