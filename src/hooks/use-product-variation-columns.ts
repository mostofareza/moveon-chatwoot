import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { productDetailAtom } from "src/store/product/product-atom";

const useProductVariationColumns = ({
  addFirst = [],
  addLast = [],
}: {
  addFirst: string[];
  addLast: string[];
}) => {
  const [productDetail] = useAtom(productDetailAtom);
  const [columns, setColumns] = useState<string[]>([]);

  useEffect(() => {
    if (productDetail?.getProcessSkusForRfq()) {
      const skus = productDetail.getProcessSkusForRfq();
      const columnsName = skus[0].property_associations
        .map((property) => property?.property_value_name || "")
        .filter(Boolean);

      const newColumns: string[] = [...addFirst, ...columnsName, ...addLast];

      setColumns(newColumns);
    } else {
      setColumns([...addFirst, ...addLast]);
    }
  }, [productDetail]);

  return { columns };
};

export default useProductVariationColumns;
