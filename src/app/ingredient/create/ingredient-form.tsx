"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { IngredientCreateAction, ingredientCreateSchema } from "@/models/ingredient";
import { api } from "@/utils/api";
import { cn } from "@/utils/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, useForm } from "react-hook-form";
import { createAction } from "./action";


export default function IngredientForm() {
  // const { mutate, error, data, isLoading } = api.ingredient.create.useMutation();
  const isLoading = false;

  const form = useForm<IngredientCreateAction>({
    resolver: zodResolver(ingredientCreateSchema),
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

  function onSubmit(value: IngredientCreateAction) {
    console.log('done', value);
    // mutate(value);
  }
  // onSubmit={form.handleSubmit(onSubmit)} 
  return (
    <Form {...form}>
      <form className="space-y-3" action={createAction}>
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
          <Button type="submit" disabled={isLoading}>Submit</Button>
        </div>
      </form>
    </Form >
  );
}

function UnitFormField({ control }: { control: Control<IngredientCreateAction> }) {
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

function NutritionField({ control, name, label, unit, shifted }: { control: Control<IngredientCreateAction>, name: keyof IngredientCreateAction, label: string, unit: string, shifted?: boolean }) {
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
