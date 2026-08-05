const fs = require('fs');

const content = `
model Event {
  id           Int      @id @default(autoincrement())
  title        String
  date         String?
  location     String?
  description  String?
  image        String?
  link         String?
  status       String?
  publishState String   @default("PUBLISHED")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model TeamMember {
  id           Int      @id @default(autoincrement())
  name         String
  designation  String?
  photo        String?
  bio          String?
  linkedin     String?
  order        Int      @default(0)
  publishState String   @default("PUBLISHED")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Resource {
  id           Int      @id @default(autoincrement())
  title        String
  type         String?
  url          String?
  description  String?
  publishState String   @default("PUBLISHED")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Lead {
  id           Int      @id @default(autoincrement())
  name         String
  email        String
  phone        String?
  inquiryType  String?
  message      String?
  status       String   @default("NEW")
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
`;

fs.appendFileSync('prisma/schema.prisma', content);
