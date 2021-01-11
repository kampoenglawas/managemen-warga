import { FamilyMember } from '../../domain/family-member.entity';
import { FamilyMemberDTO } from '../dto/family-member.dto';

/**
 * A FamilyMember mapper object.
 */
export class FamilyMemberMapper {
  static fromDTOtoEntity(entityDTO: FamilyMemberDTO): FamilyMember {
    if (!entityDTO) {
      return;
    }
    let entity = new FamilyMember();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: FamilyMember): FamilyMemberDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new FamilyMemberDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
