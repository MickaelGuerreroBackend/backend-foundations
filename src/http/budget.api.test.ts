import request from "supertest";
import { app } from "./app";

describe("Budget API", () => {
  test("GET /budget should return OK", async () => {
    const res = await request(app).get(
      "/budget?income=2000&expenses=1200&threshold=100"
    );

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      remaining: 800,
      alert: false,
    });
    expect(res.body.message).toContain("✅ OK");
  });

  test("GET /budget should return ALERT", async () => {
    const res = await request(app).get(
      "/budget?income=1500&expenses=1450&threshold=100"
    );

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      remaining: 50,
      alert: true,
    });
    expect(res.body.message).toContain("⚠️ Alerte");
  });

  test("POST /budget should return OK", async () => {
    const res = await request(app)
      .post("/budget")
      .send({ income: 2000, expenses: 1200, threshold: 100 });

    expect(res.status).toBe(200);
    expect(res.body.remaining).toBe(800);
    expect(res.body.alert).toBe(false);
  });

  test("POST /budget should return 400 on invalid income", async () => {
    const res = await request(app)
      .post("/budget")
      .send({ income: "abc", expenses: 1200, threshold: 100 });

    expect(res.status).toBe(400);
    expect(res.body.error).toContain("income");
  });
});
