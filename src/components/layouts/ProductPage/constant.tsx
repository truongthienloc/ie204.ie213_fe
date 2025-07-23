import { INT_EIGHT, INT_MAX, INT_ONE, INT_TWENTY } from '~/constants/number';

export const PRODUCT_FILTER_OPTIONS = [
  { id: 1, title: 'Tất cả món ăn', menuId: null },
  { id: 2, title: 'Thực đơn chính', menuId: '6608301dc11b247adbd84f28' },
  { id: 3, title: 'Tráng miệng', menuId: '66083088c11b247adbd84f29' },
  { id: 4, title: 'Thức uống', menuId: '66083097c11b247adbd84f2a' },
];

export const DEFAULT_MIN_PRICE = INT_ONE;
export const DEFAULT_MAX_PRICE = INT_MAX;
export const DEFAULT_PAGE = INT_ONE;
export const DEFAULT_PAGE_SIZE = INT_TWENTY;
export const PAGE_SIZE = INT_EIGHT;
