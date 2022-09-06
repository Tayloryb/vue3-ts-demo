/**
 * @description: request methods enum 
 */
export enum RequestEnum {
  GET = 'get',
  POST = 'post',
  DELETE = 'delete',
  OPTION = 'option',
  PUT = 'put'
}

export enum ResponseEnum {

}

/**
 * @description: content-type
 */
export enum ContentTypeEnum {
  // json
  JSON = 'application/json;charset=UTF-8',
  // form-data qs
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  // form-data  upload
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
