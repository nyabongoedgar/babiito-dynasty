import { Module } from "@nestjs/common";
import { RoyalMembersModule } from "./royal-members/royal-members.module";

@Module({ imports: [RoyalMembersModule] })
export class AppModule {}
