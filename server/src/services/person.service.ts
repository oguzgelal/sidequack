import { prisma } from "../lib/db.js";
import { memoriesSchema, type Memories } from "../schemas/person.schema.js";
import { ServiceError } from "./service-error.js";

export type ActivePerson = {
  id: string;
  name: string;
  memories: Memories;
};

class PersonService {
  async createDefault(user: { id: string; name: string }) {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        activePerson: {
          create: {
            name: user.name,
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        },
      },
    });
  }

  async getActive(userId: string): Promise<ActivePerson> {
    const { activePerson } = await prisma.user.findUniqueOrThrow({
      where: {
        id: userId,
      },
      select: {
        activePerson: true,
      },
    });
    if (!activePerson) {
      throw new ServiceError("This account has no active person");
    }
    return {
      id: activePerson.id,
      name: activePerson.name,
      memories: memoriesSchema.parse(activePerson.metadata),
    };
  }

  // Atomic jsonb updates: a read-modify-write would let parallel tool calls overwrite each other.
  async remember(personId: string, key: string, fact: string) {
    const memory = JSON.stringify({ key, fact });
    await prisma.$executeRaw`
      UPDATE "person"
      SET "metadata" = "metadata" || jsonb_build_object(${key}::text, ${memory}::jsonb), "updatedAt" = CURRENT_TIMESTAMP
      WHERE "id" = ${personId}`;
  }

  async forget(personId: string, key: string) {
    await prisma.$executeRaw`
      UPDATE "person"
      SET "metadata" = "metadata" - ${key}::text, "updatedAt" = CURRENT_TIMESTAMP
      WHERE "id" = ${personId}`;
  }

  describe({ name, memories }: ActivePerson) {
    const facts = Object.values(memories).map(
      ({ key, fact }) => `- ${key}: ${fact}`,
    );
    if (facts.length === 0) {
      facts.push("(nothing yet)");
    }
    return `About the person you're talking to:\nName: ${name}\nMemories:\n${facts.join("\n")}`;
  }
}

export const personService = new PersonService();
