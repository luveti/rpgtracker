import { RouterContext } from 'https://deno.land/x/oak@v10.5.1/mod.ts'
import { PostUser } from '../models/user.ts'
import { insertUser } from '../services/users.ts'
import { hash } from 'https://deno.land/x/bcrypt@v0.3.0/mod.ts'

export const postUser = async (ctx: any) => {
	const body = await ctx.request.body
	console.log(ctx)
	// console.log(JSON.parse(ctx))
	if (!ctx.request.hasBody) {
		ctx.response.status = 400
		ctx.response.body = {
			success: false,
			msg: 'No data',
		}
		return
	}
	const postUser: PostUser = body.value
	const user = {
		id: crypto.randomUUID(),
		password: await hash(postUser.password),
		email: postUser.email,
		createdAt: new Date(),
		updatedAt: new Date(),
	}

	try {
		const client = await ctx.request.state.database.connect()

		const result = insertUser(client, user)

		ctx.response.body = {
			success: true,
			data: result,
		}
	} catch (error) {
		ctx.response.status = 500
		ctx.response.body = {
			success: false,
			msg: error.message,
		}
	}
}

export const getUser = async ({
	request,
	response,
}: {
	request: any
	response: any
}) => {
	const { id } = request.params
	const client = await request.state.database.connect()
	const result = await client.query(`SELECT * FROM users WHERE id = $1`, [id])
	response.body = {
		success: true,
		data: result.rows,
	}
}
