import ajax from './ajax'
const BASE_URL = 'http://mock-api.com/ZgYv2RnN.mock/api'


// -----请求tab------
export const GetTabs = () => ajax(BASE_URL + '/getTab')
// 请求表格
export const GetTable = (params) => ajax(BASE_URL + '/getTable', params)
