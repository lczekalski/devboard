import { execSync } from "child_process"

const TEST_DATABASE_URL = "file:./test.db"

export function setup() {
  execSync("npx prisma migrate deploy", {
    stdio: "inherit",
    env: {
      ...process.env,
      DATABASE_URL: TEST_DATABASE_URL,
    },
  })
}
