import { PovertyCivilian } from '../../domain/poverty-civilian.entity';
import { PovertyCivilianDTO } from '../dto/poverty-civilian.dto';

/**
 * A PovertyCivilian mapper object.
 */
export class PovertyCivilianMapper {
  static fromDTOtoEntity(entityDTO: PovertyCivilianDTO): PovertyCivilian {
    if (!entityDTO) {
      return;
    }
    let entity = new PovertyCivilian();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: PovertyCivilian): PovertyCivilianDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new PovertyCivilianDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
