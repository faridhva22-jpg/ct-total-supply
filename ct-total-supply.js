export default async function handler(req, res) {
  try {
    const rpcUrl = "https://api.mainnet-beta.solana.com";
    const mint = "9YZZtRDqd9kiJMqgZ8XmFaE1mfK2T4kNpYgW1Nfn9rYV";

    const body = {
      jsonrpc: "2.0",
      id: 1,
      method: "getTokenSupply",
      params: [mint]
    };

    const rpcRes = await fetch(rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    const json = await rpcRes.json();
    const uiAmount = json.result?.value?.uiAmount;

    if (typeof uiAmount !== "number") {
      return res.status(500).send("0");
    }

    res.setHeader("Content-Type", "text/plain");
    return res.send(uiAmount.toString());
  } catch (e) {
    return res.status(500).send("0");
  }
}
