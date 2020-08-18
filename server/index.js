const express = require('express')
const consola = require('consola')
const { Nuxt, Builder } = require('nuxt')
const app = express()

const key = 'V6RAHX12bk10zNdP6FsMPNlDAPgDrYB1SuqmudZqbfd+3kA3gwLHZJAU' // API Key
const secret =
  'yZCSDEVIgcoVZPBsh74IXUc0qcOZJ2nV3jsY5Og3oZSv2xB0D4KxOmbnq4LN0rt/5RKy2ZYNg/yVosfzsNhKLQ==' // API Private Key
const KrakenClient = require('kraken-api')
const kraken = new KrakenClient(key, secret)

app.get('/api/cryptopair', async (req, res) => {
  res.send(
    JSON.stringify(
      await kraken.api('Ticker', {
        pair: req.query.pair || 'XXBTZUSD,XXBTZEUR,ALGOUSD,BCHUSD,ADAUSD'
      })
    )
  )
})

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  // Init Nuxt.js
  const nuxt = new Nuxt(config)

  const { host, port } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  // Give nuxt middleware to express
  app.use(nuxt.render)

  // Listen the server
  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}
start()
