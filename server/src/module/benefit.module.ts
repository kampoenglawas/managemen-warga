import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BenefitController } from '../web/rest/benefit.controller';
import { BenefitRepository } from '../repository/benefit.repository';
import { BenefitService } from '../service/benefit.service';

@Module({
  imports: [TypeOrmModule.forFeature([BenefitRepository])],
  controllers: [BenefitController],
  providers: [BenefitService],
  exports: [BenefitService],
})
export class BenefitModule {}
