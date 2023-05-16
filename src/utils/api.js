export const getApiUrl = () => process.env.NODE_ENV === 'production' ?
    process.env.NEXT_PUBLIC_API_URL_PROD :
    process.env.NEXT_PUBLIC_API_URL_DEV;
