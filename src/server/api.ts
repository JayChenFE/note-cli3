import axios from 'axios'
import { Message } from 'element-ui'

const baseURL = 'https://note-server.hunger-valley.com'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.baseURL = baseURL
axios.defaults.withCredentials = true // 使用跨域请求



export default function request(url, type = 'GET', data = {}) {
    return new Promise((resolve, reject) => {
        const options = {
            url,
            method: type,
            validateStatus(status: number) {
                return (status >= 200 && status < 300) || status === 400
            },
        }

        if (type.toLowerCase() === 'get') {
            options.params = data
        } else {
            options.data = data
        }

        axios(options).then(res => {
            if (res.status === 200) {
                resolve(res.data)
            } else {
                Message.error(res.data.msg)
                reject(res.data)
            }
        }).catch(_ => {
            Message.error('网络异常')
            reject({ msg: '网络异常' })
        })
    })
}
