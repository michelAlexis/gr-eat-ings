"use client"

import { Control, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/utils/ui";

const ingredientScheam = z.object({
  name: z.string().trim().min(2).max(100),
  description: z.string().trim().max(1000),
  unit: z.enum(['gr', 'ml']),
  quantiy: z.number().int().min(0),
  kcal: z.number().int().min(0),
  fat: z.number().int().min(0),
  fatSaturated: z.number().int().min(0),
  carb: z.number().int().min(0),
  sugar: z.number().int().min(0),
  fiber: z.number().int().min(0),
  protein: z.number().int().min(0),
  salt: z.number().int().min(0),
});
type CreateIngredientAction = z.infer<typeof ingredientScheam>;

export default function IngredientForm() {
  const form = useForm<CreateIngredientAction>({
    resolver: zodResolver(ingredientScheam),
    defaultValues: {
      name: '',
      description: '',
      unit: 'gr',
      quantiy: 100,
      kcal: 0,
      fat: 0,
      fatSaturated: 0,
      carb: 0,
      sugar: 0,
      fiber: 0,
      protein: 0,
      salt: 0,
    }
  });

  function onSubmit(value: CreateIngredientAction) {
    console.log('done', value);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        {/*Name*/}
        <FormField control={form.control} name="name" render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input placeholder="A pretty name for my yummy thing"{...field} />
            </FormControl>
            <FormDescription>
              This is plublic display name.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )} />

        {/*Desciption*/}
        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem>
            <FormLabel>Desciption</FormLabel>
            <FormControl>
              <Textarea placeholder="Any comment you could think of..."{...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )} />

        {/*Ref quantity*/}
        <FormItem>
          <FormLabel>Quantity</FormLabel>
          <div className="flex">
            <FormField control={form.control} name="quantiy" render={({ field }) => (
              <>
                <FormControl>
                  <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} min={0} className="rounded-r-none" />
                </FormControl>
                <FormMessage />
              </>
            )} />

            <UnitFormField control={form.control} />
          </div>
        </FormItem>

        {/*Nutrition table*/}
        <div className="flex flex-col">
          <NutritionField control={form.control} name="kcal" label="Energy" unit="kcal" />
          <NutritionField control={form.control} name="fat" label="Fat" unit="g" />
          <NutritionField control={form.control} name="fatSaturated" label="Saturated" unit="g" shifted />
          <NutritionField control={form.control} name="carb" label="Carb" unit="g" />
          <NutritionField control={form.control} name="sugar" label="Sugar" unit="g" shifted />
          <NutritionField control={form.control} name="fiber" label="Fiber" unit="g" />
          <NutritionField control={form.control} name="protein" label="Protein" unit="g" />
          <NutritionField control={form.control} name="salt" label="Salt" unit="g" />
        </div>

        <div className="flex flex-row-reverse">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form >
  );
}

function UnitFormField({ control }: { control: Control<CreateIngredientAction> }) {
  return (
    <FormField control={control} name="unit" render={({ field }) => (
      <>
        <FormControl>
          <Tabs value={field.value}>
            <TabsList className="border-y border-r border-input rounded-l-none">
              <TabsTrigger value="gr" onClick={() => field.onChange("gr")}>gr</TabsTrigger>
              <TabsTrigger value="ml" onClick={() => field.onChange("ml")}>ml</TabsTrigger>
            </TabsList>
          </Tabs>
        </FormControl>
        <FormMessage />
      </>
    )} />
  );
}

function NutritionField({ control, name, label, unit, shifted }: { control: Control<CreateIngredientAction>, name: keyof CreateIngredientAction, label: string, unit: string, shifted?: boolean }) {
  return (

    <FormField control={control} name={name} render={({ field }) => (
      <>
        <FormItem className="flex items-center">
          <FormLabel className={cn(shifted && "ml-3")}>{label}</FormLabel>
          <div className="flex-1">
            <FormControl>
              <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} className="w-60 mx-2 float-right" min={0} />
            </FormControl>
          </div>
          <span className="w-20">{unit}</span>
        </FormItem>
        <FormMessage />
      </>
    )} />

  );
}
