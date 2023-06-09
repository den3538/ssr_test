const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer()

server.get('*', (req, res) => {
    const app = new Vue({
        data: {
            url: req.url
        },
        template: `<div>Вы открыли URL: {{ url }}</div>`
    })

    renderer.renderToString(app, (err, html) => {
        if (err) {
            res.status(500).end('Внутренняя ошибка сервера')
            return
        }
        res.end(`
      <!DOCTYPE html>
      <html lang="en">
        <meta charset="UTF-8">
        <head><title>Привет</title></head>
        <body>${html}</body>
      </html>
    `)
    })
})

server.listen(8080)