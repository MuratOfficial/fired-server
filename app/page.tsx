"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import {  useForm } from "react-hook-form"
import { z } from "zod"
import axios from 'axios';

import { cn } from "@/lib/utils"

import { toast } from "@/hooks/use-toast"
import { Form, FormControl,  FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import React from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { ru } from "date-fns/locale";
import { Calendar } from "@/components/ui/calendar"
import { useRouter } from "next/navigation"
import AnimatedSVG from "@/components/animated-svg";

const userFormSchema = z.object({
  tab: z
  .string({required_error:"Заполните таб. номер"}),
            staffId: z.number({required_error:"Заполните staffId"}),
            departmentId:z.number({required_error:"Заполните код департамента"}),
            positionCode : z
  .string({required_error:"Заполните positionCode"}),
            putDt: z.date().optional(),
            dDt: z.date().optional(),
            dCode : z
  .string({required_error:"Заполните dCode"}),
            dDescription : z
  .string({required_error:"Заполните dDescription"}),
  dStateCode:z.string({required_error:"Заполните dStateCode"}),
            dStateCodeDesc:z.string({required_error:"Заполните dStateCodeDesc"}),
            dFinish:z.number({required_error:"Заполните staffId"}).default(1),
            lastChange: z.date().optional(),
  
})

type UserFormValues = z.infer<typeof userFormSchema>

const currentDate = new Date();


const defaultValues: Partial<UserFormValues> = {
  tab:"",
  staffId: 217726,
  departmentId: 7639,
  positionCode: "SЭ",
  putDt:currentDate,
  dDt: currentDate,
  dCode:"01" ,
  dDescription: "Уволен по собственному желанию",
  dStateCode:"EXECUTED",
  dStateCodeDesc:  "Выполнена",
  dFinish: 1,
  lastChange: currentDate ,
}

export default function Home() {

  const router = useRouter();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    defaultValues,
    mode: "onChange",
  })

  const [loading, setLoading] = React.useState(false)



  async function onSubmit(data: UserFormValues) {
    try {
      setLoading(true);
      await axios.post(`/api/users`, data);
      toast({
        title: "Вы отправили следующие данные",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
      toast({
        title:"Кажется что-то пошло не так...",
        variant:"destructive"
      })
    } finally {
      setLoading(false)
    }

    
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-4 row-start-2 items-center sm:items-start">
        <div className="w-full justify-center flex flex-row"><AnimatedSVG/></div>
        
      <p className=" text-indigo-800">Service created by <a className="bg-zinc-500 hover:bg-indigo-700 text-zinc-50 p-0.5 rounded-md" target="_blank" href="https://github.com/MuratOfficial">@MuratOfficial</a> for testing fetches</p>
      
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" grid grid-cols-2 gap-4">
        <FormField
          control={form.control}
          name="tab"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Таб. номер</FormLabel>
              <FormControl>
                <Input placeholder="090370" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="staffId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>staffId</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="departmentId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>departmentId</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="positionCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>positionCode</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
            control={form.control}
            name="putDt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>putDt</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ru })
                        ) : (
                          <span>Выберите дату</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      defaultMonth={new Date(1999, 8)}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      locale={ru}
                      captionLayout="buttons"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dDt"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>dDt</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ru })
                        ) : (
                          <span>Выберите дату</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      defaultMonth={new Date(1999, 8)}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      locale={ru}
                      captionLayout="buttons"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
<FormField
          control={form.control}
          name="dCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>dCode</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>dDescription</FormLabel>
              <FormControl>
                <Textarea className=" resize-none"  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dStateCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>dStateCode</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dStateCodeDesc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>dStateCodeDesc</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dFinish"
          render={({ field }) => (
            <FormItem>
              <FormLabel>dFinish</FormLabel>
              <FormControl>
                <Input  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
            control={form.control}
            name="lastChange"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>lastChange</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-[240px] pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ru })
                        ) : (
                          <span>Выберите дату</span>
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      defaultMonth={new Date(1999, 8)}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      locale={ru}
                      captionLayout="buttons"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        <Button type="submit" className=" col-span-2" disabled={loading}>{loading ? <span className=" animate-pulse">Отправка</span>:"Добавить в БД"}</Button>
      </form>
    </Form>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a href="/api/users" target="_blank" className=" underline-offset-2 hover:underline transition delay-100 duration-300 hover:text-green-500">Посмотреть API/JSON</a>
      </footer>
    </div>
  );
}
