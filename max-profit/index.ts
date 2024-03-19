export function maxProfit(prices: number[]): number {
  let max = 0;
  let sell = 1;
  let buy = 0;

  while (sell < prices.length) {
    if (prices[sell] > prices[buy]) {
      max = Math.max(max, prices[sell] - prices[buy]);
    } else {
      buy = sell;
    }
    sell++;
  }

  return max;
}
