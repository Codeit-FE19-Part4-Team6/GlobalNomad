import Pagination from './Pagination';
import PaginationPrev from './PaginationPrev';
import PaginationNext from './PaginationNext';
import PaginationItems from './PaginationItems';

export default Object.assign(Pagination, {
  Prev: PaginationPrev,
  Next: PaginationNext,
  Items: PaginationItems,
});
