export interface Env {

}

export default {
	async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
		return new Response("HELLO WORLD");
		// if(request.method=="GET"){
		// 	return Response.json({
		// 		message:"You sent a get request",
		// 	})
		// }
		// else{
		// 	return Response.json({
		// 		message:"You havent sent a get request"
		// 	})
		// }
	}
};
