import { Module } from "@nestjs/common";
import { RoyalMembersController } from "./royal-members.controller";
import { RoyalMembersService } from "./royal-members.service";

@Module({
  controllers: [RoyalMembersController],
  providers: [RoyalMembersService],
})
export class RoyalMembersModule {}
