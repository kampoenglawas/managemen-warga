import { Family } from '../../domain/family.entity';
import { FamilyDTO } from '../dto/family.dto';

/**
 * A Family mapper object.
 */
export class FamilyMapper {
  static fromDTOtoEntity(entityDTO: FamilyDTO): Family {
    if (!entityDTO) {
      return;
    }
    let entity = new Family();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: Family): FamilyDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new FamilyDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
