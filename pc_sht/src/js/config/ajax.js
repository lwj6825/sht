import axios from 'axios';

export const ajaxPost = function (url, params) {
  // console.log(params);
    return new Promise((resolve, reject) => {
        axios
            .post(url, params,{ headers: {'X-Requested-With': 'XMLHttpRequest','Content-Type':'application/json'},withCredentials: false})
            .then((res) => {
                resolve(res.data)
            })
            .catch(() => {
                reject('error')
            })
    })
}
export const ajaxGet= function (url, params) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, params)
            .then((res) => {
                resolve(res.data)
            })
            .catch(() => {
                reject('error')
            })
    })
}
