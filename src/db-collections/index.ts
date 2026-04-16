import { queryClient } from "@/lib/query-client";
import { createCollection } from "@tanstack/db";
import { queryCollectionOptions } from "@tanstack/query-db-collection";


export const tableCollection = createCollection(
  queryCollectionOptions({
    queryClient,
    queryFn: item => 
    
  })
)