import { apiSlice } from '@/shared/api';
import { Base, BaseRequest } from '../../model/types';

const getAllBases = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getBases: builder.query<Base[], void>({
            query: () => '/bases',
        }),
        addBase: builder.mutation<Base, BaseRequest>({
            query: (body) => ({
                url: '/bases',
                method: 'POST',
                body,
            }),
        }),
    }),
    overrideExisting: false,
});

export const { useGetBasesQuery, useAddBaseMutation } = getAllBases;
