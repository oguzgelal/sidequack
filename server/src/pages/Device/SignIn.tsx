import { useState } from "react";
import { useForm } from "@inertiajs/react";
import { SiGoogle } from "@icons-pack/react-simple-icons";
import { ArrowLeftIcon, MailIcon } from "lucide-react";
import { PageLayout } from "@/components/page-layout";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import type { PageProps } from "@/pages.gen";

const SOCIAL_BUTTONS = {
  google: { label: "Continue with Google", Icon: SiGoogle },
};

export default function SignIn({ userCode, providers, error }: PageProps<"Device/SignIn">) {
  const form = useForm({ mode: "sign-in", name: "", email: "", password: "", userCode });
  const [showEmailForm, setShowEmailForm] = useState(providers.length === 0);
  const isSignUp = form.data.mode === "sign-up";
  const query = new URLSearchParams({ user_code: userCode });

  return (
    <PageLayout title="Connect your TV">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>{showEmailForm && isSignUp ? "Create an account" : "Sign in"}</CardTitle>
          <CardDescription>
            {showEmailForm && isSignUp ? "Create an account to connect your TV." : "Sign in to connect your TV."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FieldGroup>
            {showEmailForm ? (
              <form
                id="sign-in"
                onSubmit={(event) => {
                  event.preventDefault();
                  form.post("/device/sign-in", { preserveState: true });
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
                      autoFocus={providers.length > 0}
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
                </FieldGroup>
              </form>
            ) : (
              <div className="flex flex-col gap-3">
                {providers.map((provider) => {
                  const { label, Icon } = SOCIAL_BUTTONS[provider];
                  return (
                    <Button
                      key={provider}
                      variant="outline"
                      className="w-full"
                      nativeButton={false}
                      render={<a href={`/device/social/${provider}?${query}`} />}
                    >
                      <Icon data-icon="inline-start" />
                      {label}
                    </Button>
                  );
                })}
                <Button variant="outline" className="w-full" onClick={() => setShowEmailForm(true)}>
                  <MailIcon data-icon="inline-start" />
                  Continue with email
                </Button>
              </div>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </FieldGroup>
        </CardContent>
        {showEmailForm && (
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
            {providers.length > 0 && (
              <Button type="button" variant="ghost" className="w-full" onClick={() => setShowEmailForm(false)}>
                <ArrowLeftIcon data-icon="inline-start" />
                Other sign-in options
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    </PageLayout>
  );
}
