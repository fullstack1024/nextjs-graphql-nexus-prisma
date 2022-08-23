import { asNexusMethod } from 'nexus';
import { DateTimeResolver } from 'graphql-scalars';

export const GQLDate = asNexusMethod(DateTimeResolver, 'date');
export * from './user';
export * from './post';
export * from './tag';
export * from './mutation';
export * from './query';



