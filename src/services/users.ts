import { Client } from 'https://deno.land/x/postgres@v0.15.0/mod.ts'
import { QueryArrayResult } from 'https://deno.land/x/postgres@v0.15.0/query/query.ts'
import { User } from '../models/user.ts'

export const insertUser = async (
	client: Client,
	user: User
): Promise<User[][]> => {
	const result = await client.queryArray<User[]>(
		`INSERT INTO users (id, email, password, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)`,
		[user.id, user.email, user.password, user.createdAt, user.updatedAt]
	)
	return result.rows
}

export const selectUser = async (
	client: Client,
	id: string
): Promise<User> => {
	const result = await client.queryArray<User[]>(`SELECT * FROM users WHERE id = $1`, [id])
	return result.rows[0][0]
}
