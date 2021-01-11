import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyMemberController } from '../web/rest/family-member.controller';
import { FamilyMemberRepository } from '../repository/family-member.repository';
import { FamilyMemberService } from '../service/family-member.service';

@Module({
  imports: [TypeOrmModule.forFeature([FamilyMemberRepository])],
  controllers: [FamilyMemberController],
  providers: [FamilyMemberService],
  exports: [FamilyMemberService]
})
export class FamilyMemberModule {}
