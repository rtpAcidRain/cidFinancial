// TODO DELETE THIS

import { BaseSchema, Base } from '@/entities/Base';

export interface StateSchema {
    currentBase?: Base;
    bases?: BaseSchema;
}
