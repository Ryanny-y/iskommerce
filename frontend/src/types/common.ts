export interface ApiResponse<T> {
  data?: T;
  success: boolean;
  message: string
}

export interface PaginatedResponse<T> {
  content: T[]; 
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
}