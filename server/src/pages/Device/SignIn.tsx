import { useForm } from "@inertiajs/react";
import { PageLayout } from "@/components/page-layout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import type { PageProps } from "@/pages.gen";

export default function SignIn({ userCode, error }: PageProps<"Device/SignIn">) {
  const form = useForm({ mode: "sign-in", name: "", email: "", password: "", userCode });
  const isSignUp = form.data.mode === "sign-up";

  return (
    <PageLayout title="Connect your TV">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{isSignUp ? "Create an account" : "Sign in"}</CardTitle>
          <CardDescription>
            {isSignUp ? "Create an account to connect your TV." : "Sign in to connect your TV."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="sign-in"
            onSubmit={(event) => {
              event.preventDefault();
              form.post("/device/sign-in");
            }}
          >
            <FieldGroup>
              {isSignUp && (
                <Field>
                  <FieldLabel htmlFor="name">Name</FieldLabel>
                  <Input
                    id="name"
                    autoComplete="name"
                    value={form.data.name}
                    onChange={(e) => form.setData("name", e.target.value)}
                  />
                </Field>
              )}
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={form.data.email}
                  onChange={(e) => form.setData("email", e.target.value)}
                />
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  autoComplete={isSignUp ? "new-password" : "current-password"}
                  required
                  value={form.data.password}
                  onChange={(e) => form.setData("password", e.target.value)}
                />
              </Field>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button type="submit" form="sign-in" className="w-full" disabled={form.processing}>
            {form.processing && <Spinner data-icon="inline-start" />}
            {isSignUp ? "Create account" : "Sign in"}
          </Button>
          <Button
            type="button"
            variant="link"
            onClick={() => form.setData("mode", isSignUp ? "sign-in" : "sign-up")}
          >
            {isSignUp ? "I already have an account" : "Create a new account"}
          </Button>
        </CardFooter>
      </Card>
    </PageLayout>
  );
}
