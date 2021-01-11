import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RTController } from '../web/rest/rt.controller';
import { RTRepository } from '../repository/rt.repository';
import { RTService } from '../service/rt.service';

@Module({
  imports: [TypeOrmModule.forFeature([RTRepository])],
  controllers: [RTController],
  providers: [RTService],
  exports: [RTService]
})
export class RTModule {}
