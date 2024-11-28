export interface IPagination<T>{
  content :T[],
  currentPage: number,
  totalPages: number,
  totalElements: number,
  pageSize: number,
  isFirst: boolean,
  isLast: boolean,
}
export interface IPaginationParam{
  page?: number,
  size?: number,
  sort?: string
}