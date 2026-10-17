import { useForm } from "@inertiajs/react";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { PageLayout } from "@/components/page-layout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Spinner } from "@/components/ui/spinner";
import type { PageProps } from "@/pages.gen";

const USER_CODE_LENGTH = 8;

export default function Approve({ email, userCode, error }: PageProps<"Device/Approve">) {
  const form = useForm({ userCode: userCode.replace(/[^a-zA-Z0-9]/g, "").toUpperCase() });
  const isComplete = form.data.userCode.length === USER_CODE_LENGTH;

  return (
    <PageLayout title="Connect your TV">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Connect your TV</CardTitle>
          <CardDescription>Signed in as {email}. Enter the code shown on your TV.</CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            <Field data-invalid={Boolean(error)}>
              <FieldLabel htmlFor="user-code">Code</FieldLabel>
              <InputOTP
                id="user-code"
                maxLength={USER_CODE_LENGTH}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
                value={form.data.userCode}
                onChange={(value) => form.setData("userCode", value.toUpperCase())}
                aria-invalid={Boolean(error)}
              >
                <InputOTPGroup>
                  {[0, 1, 2, 3].map((index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  {[4, 5, 6, 7].map((index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </Field>
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </FieldGroup>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full" disabled={!isComplete || form.processing} onClick={() => form.post("/device/approve")}>
            {form.processing && <Spinner data-icon="inline-start" />}
            Approve
          </Button>
          <Button
            variant="outline"
            className="w-full"
            disabled={!isComplete || form.processing}
            onClick={() => form.post("/device/deny")}
          >
            Deny
          </Button>
        </CardFooter>
      </Card>
    </PageLayout>
  );
}
