import { baseApi } from '../../baseQuery';
import type { Doctor } from './types';

export const doctorApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        getDoctorProfile: build.query<Doctor, string>({
            query: (id) => `doctors/${id}`,
            providesTags: ['Doctor'],
        }),
        updateDoctorProfile: build.mutation<Doctor, Partial<Doctor>>({
            query: (data) => ({
                url: `doctors/${data.id}`,
                method: 'PATCH',
                body: data,
            }),
            invalidatesTags: ['Doctor'],
        }),

    }),
});

export const {
    useGetDoctorProfileQuery,
    useUpdateDoctorProfileMutation,
} = doctorApi;