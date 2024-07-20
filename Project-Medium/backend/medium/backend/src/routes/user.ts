import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signupInputSchema } from "@rahul897/medium-kommon"

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  },
  Variables: {
    userId: string;
    username: string
  }
}>();

userRouter.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    // Log the input data for debugging
    console.log('Received input:', body);

    const result = signupInputSchema.safeParse(body);

    if (!result.success) {
      // Log the validation errors
      console.log('Validation errors:', result.error);

      c.status(400);
      return c.json({
        message: "Inputs not correct",
        error: result.error,
      });
    }

    const user = await prisma.user.create({
      data: {
        email: body.email, // Ensure this matches the schema
        password: body.password,
        name: body.name, // Include the optional name field
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({
      jwt,
      name: body.name,
      userid: user.id
    });

  } catch (error) {
    console.error('Error during signup:', error);
    c.status(500);
    return c.json({ message: "Internal server error" });
  }
});

userRouter.post('/signin', async (c) => {

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();

  const result = signupInputSchema.safeParse(body);

  if (!result.success) {
    // Log the validation errors
    console.log('Validation errors:', result.error);

    c.status(400);
    return c.json({
      message: "Inputs not correct",
      error: result.error,
    });
  }
  const user = await prisma.user.findUnique({
    where: {
      email: body.email,
      password: body.password,
    }
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

  return c.json({ 
    jwt,
    name: user.name,
    userid: user.id
   });
});
