import type { NextFetchEvent, NextRequest } from "next/server";
import { getProviders } from "next-auth/react";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  //   const fetchProviders = async () => {
  //     const providers = await getProviders();
  //     console.log("Providers", providers);
  //   };

  //   Object.values(fetchProviders()).map((provider) => console.log(provider.name));
  //

  console.log("_MIDDLEWARE_");
}
