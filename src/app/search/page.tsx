"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SearchRedirect() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
            if (!params.has("focus")) {
                params.set("focus", "search");
            }
            params.delete("filter");
            const queryString = params.toString();
            router.replace(queryString ? `/properties?${queryString}#property-search` : "/properties?focus=search#property-search");
        }, [router, searchParams]);

    return null;
}

export default function SearchRedirectPage() {
    return (
        <Suspense fallback={null}>
            <SearchRedirect />
        </Suspense>
    );
}

