import { serve } from 'https://deno.land/std@0.134.0/http/server.ts'

import router from './routes.ts'
import Database from './database.ts'
import { Application } from 'https://deno.land/x/oak@v10.5.1/application.ts'
import { bold, cyan, green } from 'https://deno.land/std@0.114.0/fmt/colors.ts'
import { isHttpError } from 'https://deno.land/x/oak@v10.5.1/mod.ts'

const port = parseInt(Deno.env.get('PORT')!, 10)

const database = new Database()

const app = new Application()

// Logger
app.use(async (context, next) => {
	await next()
	console.log(
		`${green(context.request.method)} ${cyan(
			decodeURIComponent(context.request.url.pathname)
		)}`
	)
})

// Database
app.use(async (context, next) => {
	context.state.database = database
	await next()
})

// Error handler
app.use(async (context, next) => {
	try {
		await next()
	} catch (err) {
		if (isHttpError(err)) {
			context.response.status = err.status
			const { message, status, stack } = err
			if (context.request.accepts('json')) {
				context.response.body = { message, status, stack }
				context.response.type = 'json'
			} else {
				context.response.body = `${status} ${message}\n\n${stack ?? ''}`
				context.response.type = 'text/plain'
			}
		} else {
			console.log(err)
			throw err
		}
	}
})

app.use(router.routes())
app.use(router.allowedMethods())

console.log(`HTTP webserver running at: http://localhost:8080/`)
await app.listen({ port: port })
