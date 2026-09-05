import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: "*" });
  app.setGlobalPrefix("api");
  await app.listen(3001);
  console.log("Royal Blood API running on http://localhost:3001");
}
bootstrap();
