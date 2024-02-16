export const getApiUrl = () => {
    console.log(process.env.NODE_ENV);
    console.log(process.env.NEXT_PUBLIC_API_URL_PROD);
    if (process.env.NODE_ENV === 'Production')
        return process.env.NEXT_PUBLIC_API_URL_PROD;
    return 'http://localhost:3001';

}
