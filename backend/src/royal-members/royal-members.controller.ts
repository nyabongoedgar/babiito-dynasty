import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { RoyalMembersService } from "./royal-members.service";
import { CreateRoyalMemberDto } from "./dto/create-royal-member.dto";
import { UpdateRoyalMemberDto } from "./dto/update-royal-member.dto";

@Controller("royal-members")
export class RoyalMembersController {
  constructor(private readonly service: RoyalMembersService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateRoyalMemberDto) {
    return this.service.create(dto);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateRoyalMemberDto) {
    return this.service.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    this.service.remove(id);
    return { message: "Removed successfully" };
  }
}
