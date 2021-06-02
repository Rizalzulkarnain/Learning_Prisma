import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
app.use(express.json());

const prisma = new PrismaClient();

//users
app.post("/", async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.create({
      data: {
        username: username,
        password: password,
      }
    })

    res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error
    })
    console.log(error);
  }
})

app.get("/", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();

    if (!users) return res.status(404).json({
      success: false,
      message: "User Not Found!, Invalid Credentials."
    })

    res.status(200).json({
      success: true,
      data: users
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error
    })
    console.log(error);
  }
})

app.post("/addMany", async (req: Request, res: Response) => {
  try {
    const { usersList } = req.body;
    const users = await prisma.user.createMany({
      data: usersList
    })

    res.status(200).json({
      success: true,
      data: users
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error
    })
    console.log(error);
  }
})

app.get("/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: {
        id: Number(id),
      }
    })

    if (!user) return res.status(404).json({
      success: false,
      message: "User Not Found!, Invalid Credentials."
    })

    res.status(200).json({
      success: true,
      data: user
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error
    })
    console.log(error);
  }
})


app.put("/", async (req: Request, res: Response) => {

  try {
    const { id, username } = req.body;
    const updatedUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username: username
      }
    })

    if (!updatedUser) return res.status(404).json({
      success: false,
      message: "Update Failed"
    })

    res.status(200).json({
      success: true,
      data: updatedUser
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error
    })
    console.log(error);
  }
})

app.delete("/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedUser = await prisma.user.delete({
      where: {
        id: Number(id)
      }
    });

    if (!deletedUser) return res.status(404).json({
      success: false,
      message: 'Failed Delete User.'
    })

    res.status(200).json({
      success: true,
      data: deletedUser
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error
    })
    console.log(error);
  }
})



//cars
app.post("/addManyCars", async (req: Request, res: Response) => {
  try {
    const { carsList } = req.body;
    const cars = await prisma.car.createMany({
      data: carsList
    })

    res.status(200).json({
      success: true,
      data: cars
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error
    })
    console.log(error);
  }
})

app.get("/cars", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        cars: true
      }
    });

    res.status(200).json({
      success: true,
      data: users
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error
    })
    console.log(error);
  }
})


app.listen(5000, () => console.log(`Server Running Good!`))
