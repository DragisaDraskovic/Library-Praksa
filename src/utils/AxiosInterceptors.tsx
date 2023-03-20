import axios from 'axios'

const AxiosInterceptor = axios.create()

axios.interceptors.request.use(
    (config) => {
        (config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`)
        return config
    }

)

export default AxiosInterceptor
