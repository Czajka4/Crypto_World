import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { REACT_APP_CRYPTO_API_URL} from "../config";

const baseUrl = REACT_APP_CRYPTO_API_URL;

const createRequest = (url) => ({ url })

export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoInfo: builder.query({
          query: (count) => createRequest(`/api/crypto/cryptoinfo/?limit=${count}`),
      }),
         getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/api/crypto/cryptodetail/${coinId}`),
        }),
        getCryptoHistory: builder.query({
          query: ({ coinId, timeperiod }) => createRequest(`/api/crypto/cryptohistory/${coinId}/history/${timeperiod}`),
        }),
        getCryptoNews: builder.query({
          query: ({ newsCategory, count }) => createRequest(`/api/crypto/cryptonews/${newsCategory}/count/${count}`),
        }),
        getCryptoPrediction: builder.query({
          query: (coinId) => createRequest(`/api/crypto/cryptopredict/${coinId}/`),
        })
    })
});

export const{
    useGetCryptoInfoQuery,
    useGetCryptoDetailsQuery,
    useGetCryptoHistoryQuery,
    useGetCryptoNewsQuery,
    useGetCryptoPredictionQuery
} = cryptoApi;