# **[High-Performance Marvel API Client with Rust]()**
> **Note**
> * Consuming data from the Marvel API and getting the performance while being efficient with **minimal requests** can be a challenge.
> * In the first iteration of the app I've used [`React Native`](https://reactnative.dev/) and the performance wasn't what I expected. This time I'm going to build an application that aggressively caches data from the Marvel API using [`Rust`](https://rust-lang.org), a high-performance systems programming language. At the end of this experiment we gonna look at the benefits of caching, the challenges of working with the smallest possible requests, and how Rust can help us build a fast and efficient API client.

## **Caching is Important**

Caching is an important technique for improving the performance of applications. By caching frequently used data, we can reduce the number of requests we need to make to external services like the Marvel API. This can lead to faster response times, reduced network latency, and improved scalability.

In the case of the Marvel API, caching can be especially valuable. The **API can be slow**, and it can return a large amount of data, especially when retrieving information about characters and series. By caching this data, we can reduce the number of requests we make to the API, which can make our application much faster and more efficient.

## **Follow Along**

⭐ Star this repo and visit the actual state of this application **(demo: [marvel-collection](https://marvelcollection.pages.dev/))** to see what is coming.

> **Note**
> _Having spent many years refactoring code from many different languages, including Python, JavaScript, Lua, TypeScript... I have never had such a pleasant refactoring experience. In just one day, in a few of hours, I've done all the refactoring that used to take at least 3 days. The compiler makes life so much easier and more efficient, I'm amazed!_
