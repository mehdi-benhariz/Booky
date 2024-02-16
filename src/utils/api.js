export const getApiUrl = () => {
    // console.log(process.env.NODE_ENV);
    // console.log(process.env.NEXT_PUBLIC_API_URL_PROD);
    // return process.env.NODE_ENV === 'Production' ?
    // 'https://fake-server-seven.vercel.app' :
    // 'http://localhost:3001';
    console.log({ "env url:": process.env.NEXT_PUBLIC_API_URL_PROD });
    return 'https://fake-server-seven.vercel.app'
}
