import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResidenceController } from '../web/rest/residence.controller';
import { ResidenceRepository } from '../repository/residence.repository';
import { ResidenceService } from '../service/residence.service';

@Module({
  imports: [TypeOrmModule.forFeature([ResidenceRepository])],
  controllers: [ResidenceController],
  providers: [ResidenceService],
  exports: [ResidenceService]
})
export class ResidenceModule {}
