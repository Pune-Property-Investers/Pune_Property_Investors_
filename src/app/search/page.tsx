"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function SearchRedirect() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const params = new URLSearchParams(searchParams ? searchParams.toString() : "");
        if (!params.has("filter")) {
            params.set("filter", "open");
        }
        const queryString = params.toString();
        router.replace(queryString ? `/properties?${queryString}` : "/properties?filter=open");
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

