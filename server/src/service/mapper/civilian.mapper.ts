import { Civilian } from '../../domain/civilian.entity';
import { CivilianDTO } from '../dto/civilian.dto';

/**
 * A Civilian mapper object.
 */
export class CivilianMapper {
  static fromDTOtoEntity(entityDTO: CivilianDTO): Civilian {
    if (!entityDTO) {
      return;
    }
    let entity = new Civilian();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: Civilian): CivilianDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new CivilianDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
