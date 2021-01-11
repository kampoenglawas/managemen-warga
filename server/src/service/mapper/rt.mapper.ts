import { RT } from '../../domain/rt.entity';
import { RTDTO } from '../dto/rt.dto';

/**
 * A RT mapper object.
 */
export class RTMapper {
  static fromDTOtoEntity(entityDTO: RTDTO): RT {
    if (!entityDTO) {
      return;
    }
    let entity = new RT();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: RT): RTDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new RTDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
