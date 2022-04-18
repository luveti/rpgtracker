import { Router } from 'https://deno.land/x/oak@v10.5.1/mod.ts'
import { ping } from './controllers/ping.ts'
import { getUser, postUser } from './controllers/users.ts'

const router = new Router()

router
	.get('/api/ping', ping)
	.get('/api/users/:id', getUser)
	.post('/api/users', postUser)

export default router
