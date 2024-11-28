export interface IApiRes <T> {
  isSuccess : boolean,
  message: string,
  data : T
}