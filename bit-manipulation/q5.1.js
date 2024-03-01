let N = 0b10000000000;
let M = 0b10011;
let i = 2;
let j = 6;

function insertBits(n, m, i, j) {
  let mask = ~(((2 << (j - i)) - 1) << i);
  return (n & mask) | (m << i);
}

console.log(insertBits(N, M, i, j).toString(2));
