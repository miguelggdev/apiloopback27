import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoMiguelGgDataSource} from '../datasources';
import {Servicio, ServicioRelations, Encomienda, Cliente} from '../models';
import {EncomiendaRepository} from './encomienda.repository';
import {ClienteRepository} from './cliente.repository';

export class ServicioRepository extends DefaultCrudRepository<
  Servicio,
  typeof Servicio.prototype.id,
  ServicioRelations
> {

  public readonly encomiendaFk: BelongsToAccessor<Encomienda, typeof Servicio.prototype.id>;

  public readonly origenFk: BelongsToAccessor<Cliente, typeof Servicio.prototype.id>;

  public readonly destinoFk: BelongsToAccessor<Cliente, typeof Servicio.prototype.id>;

  constructor(
    @inject('datasources.MongoMiguelGG') dataSource: MongoMiguelGgDataSource, @repository.getter('EncomiendaRepository') protected encomiendaRepositoryGetter: Getter<EncomiendaRepository>, @repository.getter('ClienteRepository') protected clienteRepositoryGetter: Getter<ClienteRepository>,
  ) {
    super(Servicio, dataSource);
    this.destinoFk = this.createBelongsToAccessorFor('destinoFk', clienteRepositoryGetter,);
    this.registerInclusionResolver('destinoFk', this.destinoFk.inclusionResolver);
    this.origenFk = this.createBelongsToAccessorFor('origenFk', clienteRepositoryGetter,);
    this.registerInclusionResolver('origenFk', this.origenFk.inclusionResolver);
    this.encomiendaFk = this.createBelongsToAccessorFor('encomiendaFk', encomiendaRepositoryGetter,);
    this.registerInclusionResolver('encomiendaFk', this.encomiendaFk.inclusionResolver);
  }
}
