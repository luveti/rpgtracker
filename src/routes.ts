import { Router } from "https://deno.land/x/oak@v10.5.1/mod.ts"
import {ping} from './controllers/ping.ts'

const router = new Router()

router
	.get('/api/ping', ping)

export default router
