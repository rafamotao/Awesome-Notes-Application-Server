import { BaseEntity } from './../../shared';

export class AppMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public appUsers?: BaseEntity[],
    ) {
    }
}
