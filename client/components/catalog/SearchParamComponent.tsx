import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const SearchParamComponent = ({
  onParamsChange,
}: {
  onParamsChange: (params: Record<string, string>) => void;
}) => {
  const searchParams = useSearchParams();

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    onParamsChange(params);
  }, [searchParams, onParamsChange]);
  return null;
}
 
export default SearchParamComponent;