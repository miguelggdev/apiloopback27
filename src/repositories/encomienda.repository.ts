import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongoMiguelGgDataSource} from '../datasources';
import {Encomienda, EncomiendaRelations} from '../models';

export class EncomiendaRepository extends DefaultCrudRepository<
  Encomienda,
  typeof Encomienda.prototype.id,
  EncomiendaRelations
> {
  constructor(
    @inject('datasources.MongoMiguelGG') dataSource: MongoMiguelGgDataSource,
  ) {
    super(Encomienda, dataSource);
  }
}
