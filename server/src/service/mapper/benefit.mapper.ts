import { Benefit } from '../../domain/benefit.entity';
import { BenefitDTO } from '../dto/benefit.dto';

/**
 * A Benefit mapper object.
 */
export class BenefitMapper {
  static fromDTOtoEntity(entityDTO: BenefitDTO): Benefit {
    if (!entityDTO) {
      return;
    }
    let entity = new Benefit();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: Benefit): BenefitDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new BenefitDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
