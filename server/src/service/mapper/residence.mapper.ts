import { Residence } from '../../domain/residence.entity';
import { ResidenceDTO } from '../dto/residence.dto';

/**
 * A Residence mapper object.
 */
export class ResidenceMapper {
  static fromDTOtoEntity(entityDTO: ResidenceDTO): Residence {
    if (!entityDTO) {
      return;
    }
    let entity = new Residence();
    const fields = Object.getOwnPropertyNames(entityDTO);
    fields.forEach(field => {
      entity[field] = entityDTO[field];
    });
    return entity;
  }

  static fromEntityToDTO(entity: Residence): ResidenceDTO {
    if (!entity) {
      return;
    }
    let entityDTO = new ResidenceDTO();

    const fields = Object.getOwnPropertyNames(entity);

    fields.forEach(field => {
      entityDTO[field] = entity[field];
    });

    return entityDTO;
  }
}
