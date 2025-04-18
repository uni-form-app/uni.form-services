import pg from "../../libs/prisma";

export const getUnique = async (username: string) => {
  const user = await pg.user.findUnique({
    where: { username },
  })
  return user;
}

export const create = async (email: string, password: string, username: string) => {
  const user = await pg.user.create({
    data: {
      email,
      password,
      username,
    },
  })
  return user;
}

export * as userService from ".";