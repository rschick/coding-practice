package main

import "fmt"
import "example.com/greetings"

func main() {
	message := greetings.Hello("Russ")
	fmt.Println(message)
}
