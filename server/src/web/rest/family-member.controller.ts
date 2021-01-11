import { Body, Controller, Delete, Get, Logger, Param, Post as PostMethod, Put, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { FamilyMemberDTO } from '../../service/dto/family-member.dto';
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
    type: FamilyMemberDTO
  })
  async getAll(@Req() req: Request): Promise<FamilyMemberDTO[]> {
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
    type: FamilyMemberDTO
  })
  async getOne(@Param('id') id: string): Promise<FamilyMemberDTO> {
    return await this.familyMemberService.findById(id);
  }

  @PostMethod('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Create familyMember' })
  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
    type: FamilyMemberDTO
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async post(@Req() req: Request, @Body() familyMemberDTO: FamilyMemberDTO): Promise<FamilyMemberDTO> {
    const created = await this.familyMemberService.save(familyMemberDTO);
    HeaderUtil.addEntityCreatedHeaders(req.res, 'FamilyMember', created.id);
    return created;
  }

  @Put('/')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Update familyMember' })
  @ApiResponse({
    status: 200,
    description: 'The record has been successfully updated.',
    type: FamilyMemberDTO
  })
  async put(@Req() req: Request, @Body() familyMemberDTO: FamilyMemberDTO): Promise<FamilyMemberDTO> {
    HeaderUtil.addEntityCreatedHeaders(req.res, 'FamilyMember', familyMemberDTO.id);
    return await this.familyMemberService.update(familyMemberDTO);
  }

  @Delete('/:id')
  @Roles(RoleType.ADMIN)
  @ApiOperation({ title: 'Delete familyMember' })
  @ApiResponse({
    status: 204,
    description: 'The record has been successfully deleted.'
  })
  async deleteById(@Req() req: Request, @Param('id') id: string): Promise<void> {
    HeaderUtil.addEntityDeletedHeaders(req.res, 'FamilyMember', id);
    return await this.familyMemberService.deleteById(id);
  }
}
