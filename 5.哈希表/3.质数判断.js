// 基础
function isPrime(number) {
  for (let i = 2; i < number; i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
}

console.log(isPrime(4));
console.log(isPrime(11));

// 高效
function isPrimeFast(number) {
  const count = parseInt(Math.sqrt(number));
  for (let i = 2; i <= count; i++) {
    if (number % i === 0) {
      return false;
    }
  }
  return true;
}
console.log(isPrimeFast(40));
console.log(isPrime(111));
