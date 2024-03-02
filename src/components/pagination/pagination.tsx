// components/Pagination.tsx
import React from 'react';
import {
  Pagination as ShadcnPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '../ui/pagination';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <ShadcnPagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={() => onPageChange(currentPage - 1)}
            // isDisabled={currentPage === 1}
          />
        </PaginationItem>
        {/* {[...Array(totalPages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              onClick={() => onPageChange(index + 1)}
              isActive={currentPage === index + 1}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))} */}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={() => onPageChange(currentPage + 1)}
            // isDisabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </ShadcnPagination>
  );
};

export default Pagination;
