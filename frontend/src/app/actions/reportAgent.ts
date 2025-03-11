"use server";

import { b } from "../../baml_client";

import { Image } from "@boundaryml/baml";
import { Analysis } from "../../baml_client";
// Function to get missing parameters from an analysis
function getMissingParams(analysis: Analysis): string[] {
  const validParams: Set<string> = new Set(Object.keys(analysis.keyAssumptions));

  for (const formula of analysis.formulas) {
    validParams.add(formula.name);
  }

  const missingParams: string[] = [];

  for (const formula of analysis.formulas) {
    for (const param of formula.parameters) {
      if (!validParams.has(param)) {
        missingParams.push(param);
      }
    }
  }

  return missingParams;
}

// Function to process an image and analyze it using BAML
export async function reportAgent(): Promise<Analysis> {
  console.log(b)
  let analysis: Analysis = await b.AnalyzeProforma(Image.fromUrl("https://i.imgur.com/9CYdOda.png"));
  let maxTries = 5;
  let missingParams = getMissingParams(analysis);

  while (missingParams.length > 0 && maxTries > 0) {
    maxTries--;
    console.log(`Missing parameters: ${missingParams}`);

    const newFormulas = await b.GetMissingParams(missingParams, analysis);

    for (const formula of newFormulas) {
      formula.formula.name = formula.name;
      analysis.formulas.push(formula.formula);
    }

    missingParams = getMissingParams(analysis);
  }

  if (missingParams.length > 0) {
    console.log(`Still missing parameters: ${missingParams}`);
    console.log("Please provide the missing parameters with user input.");
  }
  console.log(analysis.keyAssumptions)
  console.log(analysis.proformaMetrics)
  console.log(analysis.formulas)
  return analysis;
}
