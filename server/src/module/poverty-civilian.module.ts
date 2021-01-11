import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PovertyCivilianController } from '../web/rest/poverty-civilian.controller';
import { PovertyCivilianRepository } from '../repository/poverty-civilian.repository';
import { PovertyCivilianService } from '../service/poverty-civilian.service';

@Module({
  imports: [TypeOrmModule.forFeature([PovertyCivilianRepository])],
  controllers: [PovertyCivilianController],
  providers: [PovertyCivilianService],
  exports: [PovertyCivilianService]
})
export class PovertyCivilianModule {}
