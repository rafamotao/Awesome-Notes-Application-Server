import { BaseEntity } from './../../shared';

export class NoteMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public title?: string,
        public description?: string,
        public imageUrl?: string,
        public appUserId?: number,
    ) {
    }
}
