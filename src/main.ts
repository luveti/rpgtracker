import { serve } from 'https://deno.land/std@0.134.0/http/server.ts'

import router from './routes.ts'
import Database from './database.ts'
import { Application } from 'https://deno.land/x/oak@v10.5.1/application.ts'

const port = parseInt(Deno.env.get('PORT')!, 10)

const database = new Database()

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

console.log(`HTTP webserver running at: http://localhost:8080/`)
await app.listen({ port: port })
