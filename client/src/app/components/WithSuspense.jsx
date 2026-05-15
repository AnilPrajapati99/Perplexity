import { Suspense } from "react";
import Loading from "../../feauters/auth/components/Loading";


export const WithSuspense = ({children}) => (
  <Suspense fallback={
    <Loading/>
  }>
    {children}
  </Suspense>
);