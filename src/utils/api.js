import request from './request'

const baseUrlApi = 'http://www.alphaconsulting.top'

const api = {
  upload: (r) => request.get('./api/uploads', null, {
    baseURL: baseUrlApi
  })
}

export default api
