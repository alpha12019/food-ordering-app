import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "./ui/pagination";

type Props = {
  page:number;
  pages:number;
  onPageChange:(page:number)=>void;
}

const PaginationSelector = ({page,pages,onPageChange}: Props) => {
  const pageNumbers=[];
  for(let i=1;i<=pages;i++){
    pageNumbers.push(i);
  }
  
  // Show limited page numbers on mobile
  const getVisiblePages = () => {
    if (pages <= 5) return pageNumbers;
    
    const start = Math.max(1, page - 2);
    const end = Math.min(pages, page + 2);
    
    const visiblePages = [];
    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }
    
    return visiblePages;
  };
  
  const visiblePages = getVisiblePages();
  
  return (
    <Pagination className="my-4 sm:my-6">
      <PaginationContent className="flex flex-wrap justify-center gap-1 sm:gap-2">
          <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={()=>onPageChange(page-1)}
                className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
              />
          </PaginationItem>
          {visiblePages.map((number, index) => (
              <PaginationItem key={index}>
                  <PaginationLink 
                    href="#" 
                    onClick={()=>onPageChange(number)} 
                    isActive={page===number}
                    className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 min-w-[32px] sm:min-w-[40px]"
                  >
                      {number}
                  </PaginationLink>
              </PaginationItem>
          ))}
          {page!=pageNumbers.length && (
              <PaginationItem>
                  <PaginationNext 
                    href="#" 
                    onClick={()=>onPageChange(page+1)}
                    className="text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2"
                  />
              </PaginationItem>
          )}
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationSelector;