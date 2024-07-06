---
title: My Awesome Adventures with Go
published: 2022-11-11T15:22:00Z
description: 'My learning experiences with the systems programming language Go and how I created a redis caching API for datalink.'
image: './cover.webp'
tags: ['languages', 'learning-experiences', 'backend-development']
category: 'Languages'
draft: false 
---

Recently, I set forth attempting to conquer the land of safe systems programming, with my eyes set on [Rust](https://rust-lang.org). After a week of my painful attempt at trying to learn the borrow checking system, hundreds of stack overflow searches and debugging — I decided that Rust just wasn't for me (yet).

However, all hope was not lost; while browsing through some source code on GitHub, I noticed [Go](https://go.dev), a language which I have some past experience with. With this rekindled love for Go, I set forth creating my first major Go project: "Quickie". Quickie is a REST API built using [Gin](https://gin-gonic.com), a web HTTP server framework similar to Express for JavaScript or Django for Python. Quickie is a redis caching layer for my data platform, [datalink](https://datalink.dev).

After briefly going through the Gin docs, I got started, building a general framework & playing around with it. Eventually, I began the redis implementation using [redis-go](https://github.com/redis-go/redis), with two main endpoints, set & get (pretty self explanatory). While working with JSON data to store in the database, I familiarized myself with serialization & deserialization in Go along the lines of:

```go
import (
    "encoding/json"
    "fmt"
    "github.com/go-redis/redis"
)

type dataValue struct {
    Table string `json:"table"`
    Value any    `json:"value"`
}

func main() {
client := redis.NewClient(&redis.Options{
        Addr:     "localhost:6379",
        Password: "",
        DB:       0,
})
var dataValues []*dataValue
dataValues = append(dataValues, &dataValue{Table: table, Value: value})

s, _ := json.Marshal(dataValues)

// Now we can finally store it in the database
_, err := client.Set(key, s, 0).Result()  
}
```

Furthermore, I noticed how the pointer abstraction system was really simplified, which lead to quite less cluttered memory reference and dereference statements. Moving on, I realized rate-limiting was vital and therefore set it up too, with a [handy little library](https://github.com/JGLTechnologies/gin-rate-limit). Overall, the developer experience with Go was amazing, in a concise way I would describe it as:

> rust with a simpler and less stricter syntax, without a focus on highly idiomatic code

Anyway, Quickie is now open-sourced, so you can take a look at it for yourself if you'd like!

::github{repo="datalinkhq/quickie"}
