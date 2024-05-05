import { Hono } from 'hono'

const app = new Hono()

async function authMiddleware(c:any,next:any){
  if(c.req.header('Authorization')){
    // authorization checks 
    await next();
  }
  else {
    return c.text("You dont have the access")
  }
}
app.use(authMiddleware);

app.get('/',async (c) => {
  // For Inputs    - body,query parameter,header,middleware,db connection
  const body = await c.req.json();
  const headers = c.req.header('Authorization');
  const query = c.req.query('param');
  console.log(body);
  console.log(headers);
  console.log(query);
  
  // For outputs
  // return c.text('Hello Hono!')
  return c.json({
    message:"Hii world"
  })
})

export default app
