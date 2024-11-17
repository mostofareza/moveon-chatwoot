import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { useGetProductsBySearch } from "src/lib/core-react/hooks/private/useProduct"
import { productSearchResultAtom } from "src/store/product/product-atom"

const useHandleSearchProductResult = ({
  image_url,
  regionCode,
  category,
}: {
  image_url?: string
  [key: string]: any
}) => {
  const [query, setQuery] = useState({
    apply_exchange: 1,
    region: "BD",
    locale: "bn",
    page: 1,
    per_page: 25,
  })
  const [productSearchResult, setProductSearchResult] = useAtom(
    productSearchResultAtom,
  )
  const { isLoading, getSearchResult, isError } = useGetProductsBySearch()
  const fetchData = async () => {
    try {
      if (image_url) {
        const data = await getSearchResult({
          payload: {
            image_url,
            countries: [regionCode],
            category: [category],
            // keyword: "clock",
          },
          query: { ...query },
        })

        if (productSearchResult?.data && productSearchResult?.data.length > 0) {
          setProductSearchResult((prev) => {
            if (prev) {
              return {
                ...prev,
                data: [...(prev.data || []), ...data.data],
              }
            }
          })
        } else {
          setProductSearchResult(data)
        }
      }
    } catch (error) {}
  }

  useEffect(() => {
    fetchData()
    return () => {
      setProductSearchResult((prev) => (  prev &&  { ...prev, data: [] }))
    }
  }, [image_url])

  const fetchMoreData = async () => {
    setQuery((prev) => ({ ...prev, page: prev.page + 1 }))
    await fetchData()
  }

  return {
    data: productSearchResult,
    isLoading,
    isError,
    fetchMoreData,
  } as const
}

export default useHandleSearchProductResult
