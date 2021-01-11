import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FamilyController } from '../web/rest/family.controller';
import { FamilyRepository } from '../repository/family.repository';
import { FamilyService } from '../service/family.service';

@Module({
  imports: [TypeOrmModule.forFeature([FamilyRepository])],
  controllers: [FamilyController],
  providers: [FamilyService],
  exports: [FamilyService]
})
export class FamilyModule {}
