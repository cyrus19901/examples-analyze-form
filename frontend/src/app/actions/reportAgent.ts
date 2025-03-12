"use server";

import { b } from "../../baml_client";

import { Image } from "@boundaryml/baml";
import { FinancialMetricsEBITDA } from "../../baml_client";
import path from "path";

// async function fixMissingParams(analysis: Analysis): Promise<Analysis> {
//     const missingParams: string[] = [];
//     for (const formula of analysis.formulas) {
//         for (const param of formula.parameters) {
//             if (!(param in analysis.keyAssumptions)) {
//                 missingParams.push(param);
//             }
//         }
//     }

//     if (missingParams.length > 0) {
//         const missingFormulas = await b.GetMissingParams(missingParams, analysis); // ✅ Correctly typed `MissingParam[]`

//         // for (const param of missingParams) {
//         //     if (!missingFormulas.find((f) => f.name === param)) { // ✅ Fixed condition
//         //         throw new Error(`Could not find formula for parameter ${param}`);
//         //     }
//         // }
//         const extractedFormulas = missingFormulas.map((f) => f.formula);
//         analysis.formulas.push(...extractedFormulas);
//     }

//     return analysis;
// }

export async function analyzeImage(imageUrl: string): Promise<FinancialMetricsEBITDA[]> {
    const absolutePath = imageUrl.startsWith("/uploads")
      ? path.join(process.cwd(), "public", imageUrl)
      : imageUrl;
    let analysis: FinancialMetricsEBITDA[] = await b.AnalyzeFinancials(Image.fromUrl("https://i.imgur.com/jTsYBWr.png"));
    // analysis = await fixMissingParams(analysis);
    return analysis;
}