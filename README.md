# The Coming of Stages : Website

This is the repository of "The Coming of Stages" project.

## Running locally

This project is built using [Next.js](https://nextjs.org/). To run it locally, you need to have [Node.js](https://nodejs.org/) at least version 20 installed.

This project uses `corepack` for seemless package manager management, so enable it by running:

```bash
corepack enable
```

Then, run the following command to install all dependencies. `pnpm` will be used automatically.

```bash
pnpm install
```

Setup any environment variables needed for the project. You can copy the [`.env.example`](/.env.example) file to `.env.local` and fill in the values.

Finally, run the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## License

MIT