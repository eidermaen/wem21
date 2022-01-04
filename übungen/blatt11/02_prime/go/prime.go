package main

import (
	"fmt"
	"time"
)

func main() {
	primes := 0

	startTime := time.Now()

	for i := 1; i < 100_001; i++ {
		if isPrime(i) {
			primes++
		}
	}

	endTime := time.Now()

	fmt.Println(endTime.Sub(startTime))
}

func isPrime(number int) bool {
	prime := true

	for i := 2; i < 100_001; i++ {
		if number%i == 0 {
			prime = false
			break
		}
	}

	return prime
}
