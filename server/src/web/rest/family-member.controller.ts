import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import FamilyMember from '../../domain/family-member.entity';
import { FamilyMemberService } from '../../service/family-member.service';
import { PageRequest, Page } from '../../domain/base/pagination.entity';
import { AuthGuard, Roles, RolesGuard, RoleType } from '../../security';
import { HeaderUtil } from '../../client/header-util';
import { LoggingInterceptor } from '../../client/interceptors/logging.interceptor';

@Controller('api/family-members')
@UseGuards(AuthGuard, RolesGuard)
@UseInterceptors(LoggingInterceptor)
@ApiBearerAuth()
@ApiUseTags('family-members')
export class FamilyMemberController {
  logger = new Logger('FamilyMemberController');

  constructor(private readonly familyMemberService: FamilyMemberService) {}

  @Get('/')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'List all records',
    type: FamilyMember
  })
  async getAll(@Req() req: Request): Promise<FamilyMember[]> {
    const pageRequest: PageRequest = new PageRequest(req.query.page, req.query.size, req.query.sort);
    const [results, count] = await this.familyMemberService.findAndCount({
      skip: +pageRequest.page * pageRequest.size,
      take: +pageRequest.size,
      order: pageRequest.sort.asOrder()
    });
    HeaderUtil.addPaginationHeaders(req.res, new Page(results, count, pageRequest));
    return results;
  }

  @Get('/:id')
  @Roles(RoleType.USER)
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: FamilyMember
  })
  async getOne(@Param('id') id: string): Promise<FamilyMember> {
    return await this.familyMemberService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Create familyMember' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: FamilyMember
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() familyMember: FamilyMember): Promise<FamilyMember> {
    const created = await this.familyMemberService.save(familyMember);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'FamilyMember', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Update familyMember' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: FamilyMember
  })
  async put(@Req() req: Request, @Body() familyMember: FamilyMember): Promise<FamilyMember> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'FamilyMember', familyMember.id);
    return await this.familyMemberService.update(familyMember);
  }

  @Delete('/:id')
  @Roles(RoleType.USER)
  @ApiOperation({ title: 'Delete familyMember' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async remove(@Req() req: Request, @Param('id') id: string): Promise<FamilyMember> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'FamilyMember', id);
    const toDelete = await this.familyMemberService.findById(id);
    return await this.familyMemberService.delete(toDelete);
  }
}
