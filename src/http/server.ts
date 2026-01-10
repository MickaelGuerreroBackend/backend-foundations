import * as http from "http";
import type { IncomingMessage, ServerResponse } from "http";
import { computeBudget } from "../domain/budget";

const server = http.createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    // On ne gère qu'une route simple pour apprendre
    if (!req.url) {
      res.writeHead(400, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "Missing URL" }));
      return;
    }

    // Exemple d'appel :
    // /budget?income=1500&expenses=1450&threshold=100
    if (req.url.startsWith("/budget")) {
      const url = new URL(req.url, "http://localhost:3000");
      const income = Number(url.searchParams.get("income"));
      const expenses = Number(url.searchParams.get("expenses"));
      const threshold = Number(url.searchParams.get("threshold"));

      try {
        const result = computeBudget({
          monthlyIncome: income,
          monthlyFixedExpenses: expenses,
          alertThreshold: threshold,
        });

        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(result));
      } catch (error) {
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: (error as Error).message }));
      }

      return;
    }

    // Route inconnue
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "Not found" }));
  }
);

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
