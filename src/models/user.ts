export interface User {
	id: string
	password: string
	email: string
	createdAt: Date
	updatedAt: Date
}

export interface PostUser {
	email: string
	password: string
}
