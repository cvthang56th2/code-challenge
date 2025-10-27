var sum_to_n_a = function(n) {
  // Using mathematical formula: n * (n + 1) / 2
  return n * (n + 1) / 2;
};

var sum_to_n_b = function(n) {
  // Using iterative approach with for loop
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

var sum_to_n_c = function(n) {
  // Using recursive approach
  if (n <= 1) {
    return n;
  }
  return n + sum_to_n_c(n - 1);
};