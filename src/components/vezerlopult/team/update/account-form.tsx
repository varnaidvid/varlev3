import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { User, ArrowRight, Loader2 } from "lucide-react";
import { ExtraIcon } from "@/components/ui/extra-icon";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { z } from "zod";
import { formOneSchema } from "@/lib/zod/team-crud";

export function AccountForm({
  pending,
  form,
  onSubmit,
}: {
  pending: boolean;
  form: UseFormReturn<z.infer<typeof formOneSchema>>;
  onSubmit: () => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <CardHeader className="border-b">
          <CardTitle className="flex items-center gap-2 text-2xl">
            <ExtraIcon
              Icon={User}
              variant="small"
              fromColor="from-orange-500/20"
              toColor="to-yellow-400/20"
            />
            Csapat beregisztrálása
          </CardTitle>
          <CardDescription className="!mt-4 text-justify">
            Először egy közös fiókot kell létrehoznod a csapatodnak. Ezt
            fogjátok használni a versenyhez való részvételhez, információkhoz
            való jutásra és a feladatok beadására.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Csapat felhasználóneve *</FormLabel>
                <FormControl>
                  <Input type="text" placeholder="gipszjakab34" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jelszó *</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jelszó megerősítése *</FormLabel>
                <FormControl>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center space-x-2">
            <Switch
              id="show-password"
              checked={showPassword}
              onCheckedChange={() => setShowPassword(!showPassword)}
            />
            <Label htmlFor="show-password">Jelszó megjelenítése</Label>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2 border-t pt-6">
          <Button className="group w-full" type="submit" disabled={pending}>
            Következő lépés
            {pending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <ArrowRight className="h-4 w-4 transition-all group-hover:ml-1" />
            )}
          </Button>
        </CardFooter>
      </form>
    </Form>
  );
}
