"use client"
import React, { useState } from "react"
import { create } from "zustand"
import { devtools, persist } from "zustand/middleware"
//import type {} from '@redux-devtools/devtools' // required for devtools typing

import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
} from "lucide-react"

import { Badge } from "components/ui/badge"
import { Button } from "components/ui/button"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "components/ui/drawer"
import { Input } from "components/ui/input"
import { Label } from "components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "components/ui/select"
import { Textarea } from "components/ui/textarea"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "components/ui/tooltip"
import { ModeToggle } from "components/theme-toggle"
import { ScrollArea, ScrollBar } from "components/ui/scroll-area"

import { Form, FormControl, FormField, FormMessage, FormItem } from "components/ui/form"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

const output = "Nothing yet..."

export default function Page() {
  
  const [output, setOutput] = useState("")
  
  const scrapeFormSchema = z.object({
    message: z.string().url({ message: "Please enter a valid URL." }), //valid url only
  })

  const scrapeForm = useForm<z.infer<typeof scrapeFormSchema>>({
    resolver: zodResolver(scrapeFormSchema),
  })
  const onScrapeSubmit = async (data: z.infer<typeof scrapeFormSchema>) => {
    try {
      console.log("Sending:", data.message)
      const endpoint = `backend/playground/get`
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: data.message }),
      })

      const json = await response.json()
      console.log(json)
      setOutput(JSON.stringify(json))

    } catch (error) {
      console.error("Error scraping URL: ", error)
      setOutput("Failed to process URL.");
    }
    scrapeForm.reset()
  }


  return (
    <>
      <TooltipProvider>
        <div className="grid h-screen w-full pl-[56px]">
          <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
            <div className="border-b p-2">
              {/* <Button variant="outline" size="icon" aria-label="Home">
                <Triangle className="fill-foreground size-5" />
              </Button> */}
              <ModeToggle></ModeToggle>
            </div>
            <nav className="grid gap-1 p-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="bg-muted rounded-lg" aria-label="Playground">
                    <SquareTerminal className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Playground
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Models">
                    <Bot className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Models
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-lg" aria-label="API">
                    <Code2 className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  API
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Documentation">
                    <Book className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Documentation
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-lg" aria-label="Settings">
                    <Settings2 className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Settings
                </TooltipContent>
              </Tooltip>
            </nav>
            <nav className="mt-auto grid gap-1 p-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="mt-auto rounded-lg" aria-label="Help">
                    <LifeBuoy className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Help
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="mt-auto rounded-lg" aria-label="Account">
                    <SquareUser className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={5}>
                  Account
                </TooltipContent>
              </Tooltip>
            </nav>
          </aside>
          <div className="flex flex-col">
            <header className="bg-background sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b px-4">
              <h1 className="text-xl font-semibold">Playground</h1>
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Settings className="size-4" />
                    <span className="sr-only">Settings</span>
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="max-h-[80vh]">
                  <DrawerHeader>
                    <DrawerTitle>Configuration</DrawerTitle>
                    <DrawerDescription>Configure the settings for the model and messages.</DrawerDescription>
                  </DrawerHeader>
                  <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                    <fieldset className="grid gap-6 rounded-lg border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
                      <div className="grid gap-3">
                        <Label htmlFor="model">Model</Label>
                        <Select>
                          <SelectTrigger id="model" className="items-start [&_[data-description]]:hidden">
                            <SelectValue placeholder="Select a model" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="genesis">
                              <div className="text-muted-foreground flex items-start gap-3">
                                <Rabbit className="size-5" />
                                <div className="grid gap-0.5">
                                  <p>
                                    Neural <span className="text-foreground font-medium">Genesis</span>
                                  </p>
                                  <p className="text-xs" data-description>
                                    Our fastest model for general use cases.
                                  </p>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem value="explorer">
                              <div className="text-muted-foreground flex items-start gap-3">
                                <Bird className="size-5" />
                                <div className="grid gap-0.5">
                                  <p>
                                    Neural <span className="text-foreground font-medium">Explorer</span>
                                  </p>
                                  <p className="text-xs" data-description>
                                    Performance and speed for efficiency.
                                  </p>
                                </div>
                              </div>
                            </SelectItem>
                            <SelectItem value="quantum">
                              <div className="text-muted-foreground flex items-start gap-3">
                                <Turtle className="size-5" />
                                <div className="grid gap-0.5">
                                  <p>
                                    Neural <span className="text-foreground font-medium">Quantum</span>
                                  </p>
                                  <p className="text-xs" data-description>
                                    The most powerful model for complex computations.
                                  </p>
                                </div>
                              </div>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="temperature">Temperature</Label>
                        <Input id="temperature" type="number" placeholder="0.4" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="top-p">Top P</Label>
                        <Input id="top-p" type="number" placeholder="0.7" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="top-k">Top K</Label>
                        <Input id="top-k" type="number" placeholder="0.0" />
                      </div>
                    </fieldset>
                    <fieldset className="grid gap-6 rounded-lg border p-4">
                      <legend className="-ml-1 px-1 text-sm font-medium">Messages</legend>
                      <div className="grid gap-3">
                        <Label htmlFor="role">Role</Label>
                        <Select defaultValue="system">
                          <SelectTrigger>
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="system">System</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="assistant">Assistant</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="content">Content</Label>
                        <Textarea id="content" placeholder="You are a..." />
                      </div>
                    </fieldset>
                  </form>
                </DrawerContent>
              </Drawer>
              <Button variant="outline" size="sm" className="ml-auto gap-1.5 text-sm">
                <Share className="size-3.5" />
                Share
              </Button>
            </header>
            <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0">
                <form className="grid w-full items-start gap-6">
                  <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">Settings</legend>
                    <div className="grid gap-3">
                      <Label htmlFor="model">Model</Label>
                      <Select>
                        <SelectTrigger id="model" className="items-start [&_[data-description]]:hidden">
                          <SelectValue placeholder="Select a model" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="genesis">
                            <div className="text-muted-foreground flex items-start gap-3">
                              <Rabbit className="size-5" />
                              <div className="grid gap-0.5">
                                <p>
                                  Neural <span className="text-foreground font-medium">Genesis</span>
                                </p>
                                <p className="text-xs" data-description>
                                  Our fastest model for general use cases.
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="explorer">
                            <div className="text-muted-foreground flex items-start gap-3">
                              <Bird className="size-5" />
                              <div className="grid gap-0.5">
                                <p>
                                  Neural <span className="text-foreground font-medium">Explorer</span>
                                </p>
                                <p className="text-xs" data-description>
                                  Performance and speed for efficiency.
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                          <SelectItem value="quantum">
                            <div className="text-muted-foreground flex items-start gap-3">
                              <Turtle className="size-5" />
                              <div className="grid gap-0.5">
                                <p>
                                  Neural <span className="text-foreground font-medium">Quantum</span>
                                </p>
                                <p className="text-xs" data-description>
                                  The most powerful model for complex computations.
                                </p>
                              </div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="temperature">Temperature</Label>
                      <Input id="temperature" type="number" placeholder="0.4" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-3">
                        <Label htmlFor="top-p">Top P</Label>
                        <Input id="top-p" type="number" placeholder="0.7" />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="top-k">Top K</Label>
                        <Input id="top-k" type="number" placeholder="0.0" />
                      </div>
                    </div>
                  </fieldset>
                  <fieldset className="grid gap-6 rounded-lg border p-4">
                    <legend className="-ml-1 px-1 text-sm font-medium">Messages</legend>
                    <div className="grid gap-3">
                      <Label htmlFor="role">Role</Label>
                      <Select defaultValue="system">
                        <SelectTrigger>
                          <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="system">System</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="assistant">Assistant</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="content">Content</Label>
                      <Textarea id="content" placeholder="You are a..." className="min-h-[9.5rem]" />
                    </div>
                  </fieldset>
                </form>
              </div>
              <div className="bg-muted/50 relative flex h-full min-h-[50vh] flex-col rounded-xl p-4 lg:col-span-2">
                <Badge variant="outline" className="absolute right-3 top-3">
                  Output
                </Badge>
                <ScrollArea id="output" className="h-2/3 p-6">
                  {output}
                  <ScrollBar orientation="vertical" />
                </ScrollArea>
                <Form {...scrapeForm}>
                  <form
                    onSubmit={scrapeForm.handleSubmit(onScrapeSubmit)}
                    className="bg-background focus-within:ring-ring relative overflow-hidden rounded-lg border focus-within:ring-1"
                    x-chunk="dashboard-03-chunk-1"
                  >
                    <FormField
                      control={scrapeForm.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <div className=" min-h-2 w-full p-3">
                            <FormMessage className="" />
                          </div>
                          <Label htmlFor="message" className="sr-only">
                            Message
                          </Label>
                          <FormControl>
                            <Textarea
                              id="message"
                              placeholder="Type your message here..."
                              className="min-h-12 resize-none border-0 p-3 shadow-none focus-visible:ring-0"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="flex items-center p-3 pt-0">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Paperclip className="size-4" />
                            <span className="sr-only">Attach file</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Attach File</TooltipContent>
                      </Tooltip>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Mic className="size-4" />
                            <span className="sr-only">Use Microphone</span>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="top">Use Microphone</TooltipContent>
                      </Tooltip>
                      <Button type="submit" size="sm" className="ml-auto gap-1.5">
                        Send Message
                        <CornerDownLeft className="size-3.5" />
                      </Button>
                    </div>
                  </form>
                </Form>
              </div>
            </main>
          </div>
        </div>
      </TooltipProvider>
    </>
  )
}
