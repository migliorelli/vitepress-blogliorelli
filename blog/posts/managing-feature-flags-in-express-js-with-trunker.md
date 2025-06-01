---
title: Managing Feature Flags in Express.js with Trunker
date: 2025-06-1T17:10:00-03:00
tags:
  - Express.js
  - Trunker
---

Managing feature flags in Express.js applications can be challenging. To simplify this process, I developed [**Trunker**](https://www.npmjs.com/package/trunker), a lightweight middleware that enables dynamic route control based on feature flags.

## What is Trunker?

Trunker is a middleware for Express.js that allows you to define feature flags (either static or asynchronous) to control access to specific routes. This approach is particularly useful for implementing Trunk-Based Development, where features can be toggled without deploying new code.

## Installation

Install Trunker via npm:

```bash
yarn add trunker
```

## Usage

To use Trunker, import it into your Express.js application and define your *feature flags*:

```js
import express from "express";
import { createTrunker } from "trunker";
import { getUser } from "./utils";

const app = express();
const trunker = createTrunker({
  flags: {
    betaFeature1: true,
    betaFeature2: async (req) => {
      const user = await getUser(req.body.userId);
      return user.isBetaTester
    },
  },
});

app.use(trunker.middleware());

// It can be accessed
app.get("/beta-feature1", trunker.restrict("betaFeature1"), (req, res) => {
  res.send("Hello, world! From /beta-feature1.");
});

// It cant be accessed
app.get("/beta-feature2", trunker.restrict("betaFeature2"), (req, res) => {
  res.send("Hello, world! From /beta-feature2.");
});

app.listen(3000, () => console.log("Listening on port 3000"));
```

In this example:

- `betaFeature1` is a **static** flag set to true.
- `betaFeature2` is an **asynchronous** flag that determines access based on user data.

The *feature flag* can be **static** or **asynchronous**. If the flag is **static**, it will be evaluated immediately and if it's **asynchronous**, it will be evaluated when the request is made.

The method `trunker.restrict` accepts either a `string` or an `array` of strings.

You can also manually check if a *feature flag* is active:

```js
import { isFlagActive } from "trunker";

app.get("/beta-feature", async (req, res) => {
  const isBetaFeatureActive = await isFlagActive(req, "betaFeature");
  if (isBetaFeatureActive) {
    res.send("Hello, world! From /beta-feature.");
  } else {
    res.status(403).send("Forbidden");
  }
});
```

## Learn More

For detailed documentation and source code, visit the [Trunker GitHub repository](https://github.com/migliorelli/trunker).

Feel free to contribute, report issues, or suggest enhancements!

Por hoje é só.