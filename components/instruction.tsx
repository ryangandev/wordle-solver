import React from "react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Instruction = () => {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>How to Use Wordle Solver?</AccordionTrigger>
        <AccordionContent>
          <ul className=" list-decimal list-inside">
            <li>Enter your Wordle guess.</li>
            <li>
              Click on each square to match the colors of your Wordle result.
            </li>
            <li>
              Click &ldquo;Make Guesses&rdquo; to see possible words for your
              next guess.
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default Instruction;
