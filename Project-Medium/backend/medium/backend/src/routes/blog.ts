import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { verify } from 'hono/jwt';



export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET : string;
    },
    Variables: {
        userId: string;
        name: string;
    }
}>();

blogRouter.use('/*', async (c, next) => {
   
    const authHeader = c.req.header("authorization") || "";
    // Check the value of authHeader
    if (!authHeader) {
        c.status(401);
        return c.json({ message: "Authorization header missing" });
    }
    const user = await verify(authHeader,c.env.JWT_SECRET );
   // Check the result of JWT verification
    if (user ) {

        c.set("userId", user.id as string);
        await next();
    } else {
        c.status(403);
        return c.json({
            message: "you are not logged in"
        });
    }
});


blogRouter.post('/', async (c) => {
    try {
        const authorId = c.get("userId");

        const prisma = new PrismaClient({
            datasourceUrl: c.env.DATABASE_URL,
        }).$extends(withAccelerate());

        const body = await c.req.json();

        const post = await prisma.post.create({
            data: {
                title: body.title,
                content: body.content,
                authorId: authorId
            }
        });

        return c.json({
            id: post.id
        });
    } catch (error) {
        console.error("Error creating post:", error);
        c.status(500);
        return c.json({ error: "Internal Server Error" });
    }
});

blogRouter.put('/edit/:id', async (c) => {
    const authHeader = c.req.header("authorization") || "";
    const user = await verify(authHeader,c.env.JWT_SECRET );
    if (user ) {
         console.log(user.id)
        c.set("userId", user.id as string);
    }

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

   

    
         try{
        const post = await prisma.post.update({
            where: {
                id: body.id,
                authorId: user.id as string
            },
            data: {
                title: body.title,
                content: body.content
            }
        })
    

        return c.json({ id: post.id })
    } catch(e){
      c.status(411)
        return c.json({
            message: "error while updating post "
        })
    }
    

})


blogRouter.get('/bulk', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            author: {
                select: {
                    name: true
                }
            }

        }
    })

    return c.json({ posts })

})

blogRouter.get('/:id', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id =  c.req.param("id")

    try {
        const post = await prisma.post.findFirst({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true,
                        id: true
                    }
                }
            }
        })

        return c.json({ post })
    } catch (e) {
        c.status(411)
        return c.json({
            message: "error while fetching post "
        })
    }

})


blogRouter.get('/author/:name', async (c) => {

    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const name =  c.req.param("name")

    try {
        const posts = await prisma.post.findMany({
            where: {
                author: {
                    name: name
                }
            },
            select: {
                id: true,
                title: true,
                content: true,
                author: {
                    select: {
                        name: true
                    }
                }
            }
        })

        return c.json({ posts })
    } catch (e) {
        c.status(411)
        return c.json({
            message: "error while fetching post "
        })
    }

})

