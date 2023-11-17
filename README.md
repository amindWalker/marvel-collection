<div align='center'>

  # **[High-Performance Marvel API Client]()**
  DEMO: [marvel-collection](https://marvelcollection.pages.dev/)

</div>

> **Note**
> * Utilize the Marvel API and achieve optimal performance with **minimal requests**.
> * Built with [Bun](https://bun.sh/), [Vite](https://vitejs.dev/), [TypeScript](https://www.typescriptlang.org/), [UnoCSS/TailwindCSS](https://unocss.dev/) and [React](https://react.dev/)

## **Caching**

Caching is an important technique for improving the performance of applications. By caching frequently used data, we can reduce the number of requests we need to make to external services like the Marvel API. This can lead to faster response times, reduced network latency, and improved scalability.

In the case of the Marvel API, caching can be especially valuable. The **API can be slow** because of the large amount of data, especially when retrieving information about characters and series. By caching this data, we can reduce the number of requests we make to the API, which can make our application much faster and more efficient.

One innovative approach to caching data efficiently for web applications is leveraging SQLite for WebAssembly (SQLite for WASM). SQLite is a light and simple database engine, and when combined with WebAssembly, it becomes a powerful tool for saving data. This allows us to store and retrieve the cached Marvel API data directly without external services, providing a responsive experience.

Another cool thing in WebAssembly is the new WebAssembly System Interface (WASI). WASI lets us run WebAssembly modules outside the browser, giving us new options for server-side work. By using WASI as a lightweight and container-less backend choice, we can create a system to mirror the Marvel API data. This means managing stored data on the server side efficiently, so the info is always ready without requesting the Marvel API again. Bringing together SQLite for WASM and container-less WASI gives us a strong solution to make HTTP requests efficiently.

## **Follow Along**

⭐ Star this repo and visit the current state of this application **(demo: [marvel-collection](https://marvelcollection.pages.dev/))** to see what is coming.
