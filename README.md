# local-bin

A local fake server to inspect requests.

I was a big fan of requestb.in and one day, it was gone for good. Yes, you can run it locally but it requires a bunch of things to get it up and running. There are other alternatives, but again you need to do some complex local setup or you have to pay to get a private endpoint.

Enter `local-bin`. A local express server that always responds with a `200 OK` to whatever you throw at it and leverages the power of `ngrok` to achieve 2 things:

1. Get a free request inspector where you can see what your code is actually sending.
2. A public url you can use to also test remote webhooks, production code, etc.

## Usage

If you have a modern version of node up and running (v8+) there is nothing to install (but you can if you want). All you need to do is:

```ssh
npx local-bin
```

This command will have npm to download to cache and run  `local-bin` and start it for you.

By default `local-bin` will listen on port 3000 and you will send all your request to this port. Custom port will be added soon. It will also automatically start ngrok, start listening on the same port and provide you with a random public URL. 

To inspect your requests, all you have to do is to open your browser at http://localhost:4040.

To kill `local-bin` just do `Ctrl-C`.

## To Do

- Add support for custom port. In case you have something else already running in port 3000.
- Add support for `ngrok` configurations. ngrok is started internally so there is no way for now to pass in your token or custom subdomains.
