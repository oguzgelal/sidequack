import { PageLayout } from "@/components/page-layout";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { PageProps } from "@/pages.gen";

export default function Done({ approved }: PageProps<"Device/Done">) {
  return (
    <PageLayout title="Connect your TV">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{approved ? "You're all set" : "Request denied"}</CardTitle>
          <CardDescription>
            {approved ? "Your TV is signing in. You can close this page." : "Your TV was not connected."}
          </CardDescription>
        </CardHeader>
      </Card>
    </PageLayout>
  );
}
