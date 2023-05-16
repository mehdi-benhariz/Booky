export const getApiUrl = () => {
    // console.log(process.env.NODE_ENV);
    // console.log(process.env.NEXT_PUBLIC_API_URL_PROD);
    // return process.env.NODE_ENV === 'production' ?
    // process.env.NEXT_PUBLIC_API_URL_PROD :
    // process.env.NEXT_PUBLIC_API_URL_DEV;
    return process.env.NEXT_PUBLIC_API_URL_PROD;
}
