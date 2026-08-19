import bcrypt from "bcrypt";
import { prisma } from "../src/config/database";

async function main() {
  const email = process.env.SUPER_ADMIN_EMAIL;
  const password = process.env.SUPER_ADMIN_PASSWORD;

  if (!email || !password) {
    throw new Error(      "SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD are required",    );
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: {
      email,
    },
    update: {},
    create: {
      fullName: "SuperAdmin",
      email,
      passwordHash,
      role: "SUPER_ADMIN",
      organizationId: null,
      isActive: true,
    },
  });

  console.log(`Super Admin created: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });