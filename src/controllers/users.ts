import { PostUser } from '../models/user.ts'
import { insertUser } from '../services/users.ts'
import { hash } from 'https://deno.land/x/argon2/lib/mod.ts'

export const postUser = async ({
	request,
	response,
}: {
	request: any
	response: any
}) => {
	const body = await request.body()
	if (!request.hasBody) {
		response.status = 400
		response.body = {
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
		const client = await request.state.database.connect()

		const result = insertUser(client, user)

		response.body = {
			success: true,
			data: result,
		}
	} catch (error) {
		response.status = 500
		response.body = {
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
