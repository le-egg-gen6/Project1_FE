import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useGraph } from "@/context/GraphContext";
import service from "@/service/service";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const formSchema = z.object({
  isDirected: z.boolean().default(true),
  isManualInput: z.boolean().default(true),
  manualInput: z.string().optional(),
});

type AddGraphDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function AddGraphDialog({ open, onOpenChange }: AddGraphDialogProps) {
  const { addGraph } = useGraph();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      isDirected: true,
      isManualInput: true,
      manualInput: "",
    },
  });

  const isManualInput = form.watch("isManualInput");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      let newGraph;
      if (values.isManualInput) {
        const edges = JSON.parse(values.manualInput || "[]");
        const response = await service.get(
          `/add-edges?edges=${JSON.stringify(edges)}&type=${
            values.isDirected ? "directed" : "undirected"
          }`
        );
        newGraph = await response.data;
      } else {
        const response = await service.post(
          `/generate-random?type=${
            values.isDirected ? "directed" : "undirected"
          }`
        );
        newGraph = await response.data;
      }
      addGraph(newGraph);
      setTimeout(() => toast.success("Graph created successfully"), 1000);
      onOpenChange(false);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-gray-900">
            Add New Graph
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            Create a new graph by inputting edges or generating randomly.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="isDirected"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Directed Graph</FormLabel>
                    <FormDescription>
                      Toggle to switch between directed and undirected graphs
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isManualInput"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Manual Input</FormLabel>
                    <FormDescription>
                      Toggle to switch between manual input and random
                      generation
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            {isManualInput && (
              <FormField
                control={form.control}
                name="manualInput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-gray-700 font-medium">
                      Graph Matrix (JSON format)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="[[0,1],[1,2]]"
                        {...field}
                        className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormDescription className="text-gray-500 text-sm mt-1">
                      Enter graph matrix as a JSON array. For example:
                      [[0,1],[1,2]]
                    </FormDescription>
                    <FormMessage className="text-red-500" />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-primary text-white hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                {isLoading ? "Adding..." : "Add Graph"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
