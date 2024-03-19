// 122. Best Time to Buy and Sell Stock II
export function maxProfit(prices: number[]): number {
  let n = prices.length;
  let buy = 0;
  let profit = 0;
  let sell = 0;

  while (sell < n && buy < n) {
    // look for next buy low point
    while (buy < n - 1 && prices[buy + 1] <= prices[buy]) {
      buy++;
    }

    if (buy === n - 1) {
      return profit;
    }

    sell = buy;

    // look for the next sell high point
    while (sell < n - 1 && prices[sell + 1] >= prices[sell]) {
      sell++;
    }

    profit += prices[sell] - prices[buy];

    buy = sell;
  }

  return profit;
}
