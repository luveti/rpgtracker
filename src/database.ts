import { Pool, PoolClient } from "https://deno.land/x/postgres@v0.15.0/mod.ts";

export default class Database {
	private database: string
	private user: string
	private password: string
	private hostname: string
	private port: number
	private poolConnections: number
	private dbPool: Pool

	constructor() {
		this.database = Deno.env.get('POSTGRES_DB')!
		this.user = Deno.env.get('POSTGRES_USER')!
		this.password = Deno.env.get('POSTGRES_PASSWORD')!
		this.hostname = Deno.env.get('POSTGRES_HOST')!
		this.port = parseInt(Deno.env.get('POSTGRES_PORT')!, 10)
		this.poolConnections = parseInt(
			Deno.env.get('POSTGRES_POOL_CONNECTIONS')!,
			10
		)

        this.dbPool = new Pool(
			{
				database: this.database,
				hostname: this.hostname,
				password: this.password,
				port: this.port,
				user: this.user,
			},
			this.poolConnections,
            true
		)
	}

	public async connect(): Promise<PoolClient> {
		return await this.dbPool.connect()
	}

	public async disconnect(client: PoolClient): Promise<void> {
		await client.release()
	}

	public toString() {
		return `${this.database}@${this.hostname}:${this.port}`
	}
}