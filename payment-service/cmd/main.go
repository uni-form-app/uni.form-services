package main

import (
	"main/cmd/factory"
	"main/config"
)

func main() {
	if err := config.Load(); err != nil {
		panic(err)
	}

	factory := factory.NewFactory()

	factory.Run()
}
