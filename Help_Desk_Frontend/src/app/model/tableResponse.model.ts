export interface TableResponseModel<T> {
  page_index: number;
  data_size: number;
  page_size: number;
  total_pages: number;
  data: T[];
}