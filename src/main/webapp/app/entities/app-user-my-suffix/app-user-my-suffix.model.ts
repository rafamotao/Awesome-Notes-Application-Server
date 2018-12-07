import { BaseEntity } from './../../shared';

export class AppUserMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public username?: string,
        public pass?: string,
        public imageUrl?: string,
        public notes?: BaseEntity[],
        public apps?: BaseEntity[],
    ) {
    }
}
