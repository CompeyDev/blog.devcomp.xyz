---
title: Problems with Dependency Management
published: 2023-7-16T07:35:18Z
description: 'Why I think development (especially web development) in modern days even with fancy tooling is flawed and more unproductive than we think.'
image: './cover.png'
tags: ['tooling', 'hot-takes', 'package-management']
category: 'Opinions'
draft: false 
---

I'd like to preface this post with the fact that I'm extremely passionate about this topic – so passionate that I could rant about this for hours on end. In fact, take my words with a pinch of salt as I'm clearly your average Rustacean who believes anything related to Rust is the way to go.

## Part 1: Introduction

Before I state my (_objectively correct ™️_) my opinion that no one asked for, let's agree on a few key terms regarding what package managers are and why they matter. Back in the good ol' days, the boys and I used to raw dog C like there was no tomorrow. Memory Safety? What's that?

As web dev became the new thing for the cool kids, I decided to try out JavaScript (talk about a downgrade…), which initially blew my mind. There was this thing called a package manifest, and this package manager, where I could simply run a singular command and set my development environment up in seconds – goodbye to manually installing system-wide packages!

In simple terms, package managers were this magical CLI that would look at this manifest I defined with the dependencies required for both development and production releases, and install them accordingly. Sounds great, right? What could go wrong?

## Part 2: The Problems

### Package Hell

It's 2023 now, and developers feel the need to handicap themselves every single time they start a new project by adding packages such as `lodash` and `is-even`. Like seriously, what even is the point of `_.toNumber`??!?! Are people stupid enough to not use language provided APIs and instead resort to a package which basically provides abstractions around incredibly basic code?

### Standards

Building on the introduction, NPM was a great experience for me… at first. You see, eventually I realized it was much more effective and productive to install a singular system-wide package, rather than install packages with thousands of peer dependencies. Don't believe me? Quickly clone down an average Next.js application you've written and execute:

```bash
time npm i
```

Furthermore, you can also have a look at the disk usage of the `node_modules` directory, if you've got the guts. My development directory weighs at ~28 GB, a majority of which is contributed to by the size of `node_modules`.

```sh
$ du -h ~/dev
...
28.6G    /home/compey/dev/
```

## Part 3: The Saviour We Never Knew We Needed: PNPM

PNPM (or plug n' play package manager) is an alternative package manager for the JavaScript ecosystem which aims to solve most of the problems I've listed above. My `node_modules` directory usage went down 25% a couple of years ago, when I made the switch. Not only that, PNPM nearly halves the time required to install packages as compared to NPM, which is just mind-boggling to me, considering that it's written in JavaScript (or TypeScript) too.

Well, how exactly does PNPM work? Below is a short snippet from [their site](https://pnpm.io) which explains the technology behind it:

> When using NPM, if you have 100 projects using a dependency, you will have 100 copies of that dependency saved on disk. With PNPM, the dependency will be stored in a content-addressable store, so:
>
> 1. If you depend on different versions of the dependency, only the files that differ are added to the store. For instance, if it has 100 files, and a new version has a change in only one of those files, `pnpm update` will only add 1 new file to the store, instead of cloning the entire dependency just for the singular change.
>
> 2. All the files are saved in a single place on the disk. When packages are installed, their files are hard-linked from that single place, consuming no additional disk space. This allows you to share dependencies of the same version across projects.
>
> As a result, you save a lot of space on your disk proportional to the number of projects and dependencies, and you have a lot faster installations!

If you'd like to know about PNPM in more detail, consider checking out the following:

- <https://pnpm.io/blog/2020/05/27/flat-node-modules-is-not-the-only-way>
- <https://pnpm.io/symlinked-node-modules-structure>

## Part 4: Extensibility

I feel like we require some sort of guidelines, or at least a consensus on things package managers should support. Pretty much all major package managers are extremely rigid with what they follow and allow little to no customization around these. For instance: defining schemas or defining custom paths for manifests/lockfiles. Or, most importantly, conditional dependencies. As I've stated above, packages occupy huge amounts of storage – and PNPM reduces the scale of it significantly by only downloading singular copies of packages and symlinking them. However, what few people have attempted to implement are conditional dependencies. Out of the few, `cargo` provides a great exemplar for this.

As a developer making use of a library, we usually don't make use of all the code originally included within the package. Yet, we still download and store all the code within the package. In order to combat this, the library developer could define a number of features, which one could conditionally enable based on their current requirements. This would also improve the current state of peer dependency hell, by allowing the library developer to specifically include packages required for certain features, where the end user only needs to install the peer dependencies for the features they use.

I can see this as a great solution to huge bundles of JavaScript which need to be loaded and executed for a majority of standard websites we use on a daily basis. Opt-in packages, not so complicated, is it?
