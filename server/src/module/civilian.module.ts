import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CivilianController } from '../web/rest/civilian.controller';
import { CivilianRepository } from '../repository/civilian.repository';
import { CivilianService } from '../service/civilian.service';

@Module({
  imports: [TypeOrmModule.forFeature([CivilianRepository])],
  controllers: [CivilianController],
  providers: [CivilianService],
  exports: [CivilianService]
})
export class CivilianModule {}
