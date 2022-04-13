// @desc Response with pong
// @route GET /ping
export const ping = ({ response }: { response: any }) => {
	response.status = 200
	response.body = {
		success: true,
		data: 'pong',
	}
}
