import prisma from "../../../prisma";

export async function getSession(sessionId: number) {
  try {
    const session = await prisma.sessions.findUnique({
      where: {
        sessionID: sessionId,
      },
    });

    return session && session.valid ? session : null;
  } catch (error) {
    console.error("Error fetching session from the database:", error);
    throw new Error("Failed to get session");
  }
}

async function invalidateExistingSession(userId: number) {
    try {
        // Find the existing session for the user
        const existingSession = await prisma.sessions.findFirst({
            where: {
                userId: userId,
                valid: true,
            },
        });

        // If an existing session is found, invalidate it
        if (existingSession) {
            await prisma.sessions.update({
                where: {
                    sessionID: existingSession.sessionID,
                },
                data: {
                    valid: false,
                },
            });
        }
    } catch (error) {
        console.error('Error invalidating existing session:', error);
        throw new Error('Failed to invalidate existing session');
    }
}

export async function createSession(userId: number) {
    try {
        // Invalidate existing session for the user
        await invalidateExistingSession(userId);

        // Create a new session
        const session = await prisma.sessions.create({
            data: {
                valid: true,
                user: {
                    connect: {
                        id: userId,
                    },
                },
            },
        });

        return session;
    } catch (error) {
        console.error('Error creating session:', error);
        throw new Error('Failed to create session');
    }
}


export async function invalidateSession(sessionId: number) {
  try {
    const updatedSession = await prisma.sessions.update({
      where: {
        sessionID: sessionId,
      },
      data: {
        valid: false,
      },
    });

    return updatedSession;
  } catch (error) {
    console.error("Error updating session in the database:", error);
    throw new Error("Failed to invalidate session");
  }
}

// createUser function
export async function createUser(
  email: string,
  password: string,
  username: string
) {
  try {
    const newUser = await prisma.users.create({
      data: {
        email: email,
        password: password,
        username: username,
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  }
}

export async function getUser(email: string) {
  try {
    const user = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
}
