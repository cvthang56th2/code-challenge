import { useState } from "react";
import { Info } from "lucide-react";
import { CurrencySwapForm } from "./problem2/CurrencySwapForm";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

export const Problem2Solution = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div>
      <div className="text-center mb-8">

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger>
            <Button variant="outline" size="sm" className="gap-2">
              <Info className="h-4 w-4" />
              Show Requirements
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto text-left">
            <DialogHeader>
              <DialogTitle>Problem 2: Fancy Form</DialogTitle>
            </DialogHeader>
            <DialogDescription className="text-sm text-muted-foreground my-4">
              Create a currency swap form based on the template provided in the folder. A user would use this form to swap assets from one currency to another.
            </DialogDescription>

            <div className="space-y-6 text-sm">
              <div>
                <p className="text-muted-foreground italic">
                  *You may use any third party plugin, library, and/or framework for this problem.*
                </p>
              </div>

              <div>
                <h3 className="font-semibold mb-3">📋 Requirements</h3>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground leading-relaxed">
                  <li>You may add input validation/error messages to make the form interactive.</li>
                  <li>Your submission will be rated on its usage intuitiveness and visual attractiveness.</li>
                  <li>Show us your frontend development and design skills, feel free to totally disregard the provided files for this problem.</li>
                  <li>
                    You may use this{" "}
                    <a
                      href="https://github.com/Switcheo/token-icons/tree/main/tokens"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      repo
                    </a>{" "}
                    for token images, e.g.{" "}
                    <a
                      href="https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/SWTH.svg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      SVG image
                    </a>.
                  </li>
                  <li>
                    You may use this{" "}
                    <a
                      href="https://interview.switcheo.com/prices.json"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      URL
                    </a>{" "}
                    for token price information and to compute exchange rates (not every token has a price, those that do not can be omitted).
                  </li>
                </ol>
              </div>

              <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800 flex gap-2">
                <span className="text-xl">✨</span>
                <div>
                  <p className="text-amber-700 dark:text-amber-300">
                    <span className="font-semibold mr-1 text-amber-800 dark:text-amber-200">Bonus:</span>
                    Extra points if you use{" "}
                    <a
                      href="https://vite.dev/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline font-medium"
                    >
                      Vite
                    </a>{" "}
                    for this task!
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 flex gap-2">
                <span className="text-xl">💡</span>
                <p className="text-blue-700 dark:text-blue-300">
                  <span className="font-semibold mr-1 text-blue-800 dark:text-blue-200">Hint: </span>
                  Feel free to simulate or mock interactions with a backend service, e.g. implement a loading indicator
                  with a timeout delay for the submit button is good enough.
                </p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <h1 className="text-4xl font-bold text-foreground mt-2">
          Crypto Currency Exchange
        </h1>
        <p className="text-muted-foreground">
          Swap your tokens instantly with the best rates available
        </p>
      </div>

      <CurrencySwapForm />

      <div className="text-center mt-8 space-y-2">
        <p className="text-sm text-muted-foreground">
          Powered by real-time market data
        </p>
        <p className="text-xs text-muted-foreground">
          This is a demo interface. No actual transactions are performed.
        </p>
      </div>
    </div>
  );
};