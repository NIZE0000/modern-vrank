import { SEO } from "@/components/common/seo";
import { ReactNode } from "react";

export default function PageInDevelopment(): JSX.Element {
  return (
    <div className="p-4 bg-yellow-100 border-yellow-400 border-2 text-yellow-800">
      <h2 className="text-lg font-medium mb-2">
        This page is currently in development
      </h2>
      <p className="text-sm">
        We are still working on this page and it will be available soon. Thank
        you for your patience.
      </p>
    </div>
  );
};