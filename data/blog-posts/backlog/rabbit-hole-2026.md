---
title: "The Rabbit Hole Starts With One Question"
subtitle: "How curiosity led me toward digital sovereignty"
date: "2026-08-11"
author: "Velitchko Filipov"
hashtags:
  - privacy
  - digital-sovereignty
  - windows
  - linux
  - grapheneos
  - open-source
  - self-hosting
  - degoogle
categories:
  - Privacy
  - Opinion
  - Technology
excerpt: "I didn't wake up one morning and decide to de-Google my life. It started with a much simpler question: what are my devices actually doing, and how much control do I really have over them?"
featured: false
---

## EDITORIAL COMMENTS
- Make the windows bit somehow into a pun - A window of opportunity or when life closes a door - it opens a window or something
- After windows - the other question that emerged was google - all the ads, the ai-generated summaries, the amount of times i misclicked on a result because it just didnt see the "promoted" tag - yeah thats probably where most of the clicks come from.
  - So I swapped to duckduckgo -> all ai features off - no account or login needed; swapped from chrome to firefox - got a bunch of the privacy extensions some I REALLY RECOMMENTS (ghostery, privacy badger, ublock origin, cookie auto delete, clear URLs). 
  - Also learned about browser and system fingerprinting and how that is used to track you even whne you dont have or use cookies or anything - yeah its easier than you think -> check this website https://coveryourtracks.eff.org/
- Started with ubuntu - it was nice for a while - quickly realized how much things are assumed and baked into it (not necessarily bad as it is targeting people that want convinience and things within the eco system and the LTS to just work)
- Arch really just fit and aligned with what i wanted - bare bones - no bloat - simple. I customized it to fit my workflow - not the other way around as with other operating systems or distros that are opinionated and make swapping a desktop environment just an impossible pain.
- A thing with the phone is - I have a nothing phone 2 - I love that device - I started slow by swapping to the fossify apps (link) and then over time reducing my reliance on google and other big service prodivers - slightly paying attention to the permissions, background usage and things like that - Why do apps i close continue in the background - why does force close / shutdown not do the thing it says it does? Why is my phone at idle just uploading and downloading large chunks of internet packets. Whats going on? 
  - Started eyeing graphene - sadly - only officially supported on pixel phones (and motorola - 2027 fingers crossed). So I bought a pixel phone installed it took all in all 10 minutes or so to flash the device - and it felt immediately clean and somehow I felt also just a bit free - as if i am not tied or weighed down - not sure how to describe this.
  - The one drawback and thing I am trying to get used to - NFC payments over google wallet arent possible - was my default way of paying -> but yeah google wont whitelist the project - Jeez I wonder why. 
  - Interesting story: https://techcrunch.com/2026/07/24/us-accuses-american-of-allegedly-wiping-his-phone-using-a-duress-password-during-border-search/- https://keepandroidopen.org/ -> One of the things that really was the last drop and made me go graphene. I am happy to have done this. 

# The Rabbit Hole Starts With One Question

> *The funny thing about curiosity is that it rarely stops where you expect it to.*

In my [previous post](https://velitchko.github.io/blog/digital-reclaiming-2026), I wrote about deleting old accounts and discovering how difficult it can be to reclaim personal data once it has already left your hands. What I left mostly unexplored was the question that came before all of that: why had I started paying attention to these dependencies in the first place?

The honest answer is that I never planned to "de-Google" my life, switch operating systems, replace large parts of my software stack, or spend time thinking about digital sovereignty. I was not trying to become a privacy advocate, and I certainly was not looking for an excuse to replace every proprietary tool I used.

I was perfectly happy using mainstream software as long as it solved the problem I needed it to solve.

What changed was not my philosophy. It was my curiosity.

---

## It Started With Windows

For years, Windows was simply the operating system on my computer. I used it, updated it, occasionally complained about it, and otherwise treated most of what happened below the application layer as somebody else's problem.

What changed was not one dramatic privacy incident. It was an accumulation of small moments that made me increasingly curious about how little I actually understood about the machine I was using every day.

Why did shutting the computer down sometimes take surprisingly long? Why was there network activity during startup before I had even opened anything? Why did major updates introduce new services or quietly change settings I had previously configured?

The repeated reappearance of Microsoft Copilot became almost symbolic. I would remove or disable it, another update would arrive, and there it was again. Over time, the issue stopped being about Copilot itself and became more about the feeling that I was not fully in control of the operating system running on my own machine.

None of this, by itself, proves anything sinister. A modern operating system has legitimate reasons to synchronize state, complete updates, flush caches, stop services, upload diagnostics, and perform maintenance. But that was precisely the point: I could not tell which of those things were happening, when they were happening, or how much control I actually had over them.

At some point the question changed from *"Why is Windows doing this?"* to something much more useful:

> **What is my computer actually doing when I am not actively telling it to do anything?**

That question sent me into services, logs, startup processes, network activity, telemetry settings, permissions, and documentation. Privacy Guides has a useful discussion on minimizing Windows 11 data collection that shows just how many separate mechanisms are involved once you start looking.<sup>[1](#note-1)</sup>

I was not searching for proof that Windows was "bad." I simply wanted to understand the system I spent most of my day using. The more I inspected, the more I realized that the thing bothering me was not only data collection. It was the lack of visibility into, and authority over, the defaults of my own operating system.

---

## Linux Was a Consequence, Not the Goal

That curiosity eventually pushed me toward Linux, and later Arch Linux.<sup>[4](#note-4)</sup> I did not move because I suddenly decided that proprietary software was morally unacceptable, nor because Linux somehow eliminates every privacy or security problem. I moved because I wanted a system that was easier for me to inspect, understand, modify, and maintain on my own terms.

Arch happened to fit that preference particularly well. The system starts relatively small, and much of what eventually runs on it is there because I installed, configured, or enabled it myself. I can inspect services, follow logs, read configuration files, replace components, monitor network traffic, and generally understand far more of the path between *"I asked the computer to do something"* and *"the computer did it."*

That difference sounds small, but it changed my relationship with the machine. I stopped treating the operating system as a sealed appliance and started treating it as something I could actually reason about.

Moving to Linux did not suddenly make my computer "private." What it gave me was something I had not appreciated until then: inspectability and control.

<mark>What I was looking for was not purity. It was agency.</mark>

---

## The Same Question Followed Me Onto My Phone

Once I had spent some time paying closer attention to my desktop, it became difficult not to apply the same thinking to the device I carried around in my pocket every day.

In many ways, the phone was the more uncomfortable device to examine. It spends nearly every waking hour with me and has access to location, photographs, messages, contacts, microphones, cameras, authentication tokens, payment systems, and a remarkably detailed history of how I use it.

Yet I had spent far less time understanding what my phone was doing than I ever had with my desktop.

I started paying more attention to permissions and background network activity. Applications I thought I had closed would still appear in background processes. Some apps continued communicating while the device was sitting idle. Disabling individual permissions did not always seem to correspond to the behavior I expected.

Some of what initially looked suspicious turned out to have perfectly ordinary explanations: push notifications, synchronization, cached processes, background jobs, update checks, or operating-system services.

That distinction mattered.

I did not want to build my entire setup around assuming that every unexplained packet was malicious. I wanted a system where I could understand the behavior and meaningfully decide what I was comfortable allowing.

That eventually led me to GrapheneOS.<sup>[2](#note-2)</sup>

What appealed to me was not simply the label "privacy-focused Android." It was the way GrapheneOS approaches application sandboxing, permissions, exploit mitigation, and optional Google services. In particular, the ability to install Google Play as ordinary sandboxed applications offered a much more practical middle ground than the usual framing of either accepting Google everywhere or removing it completely.

Again, the goal was not to reject technology. It was to regain some control over the terms under which I used it.

---

## The Defaults Started Looking Less Default

Once I had questioned the operating system and the phone, the same pattern started appearing everywhere else.

Why did a simple application require an account? Why did a note-taking tool need its own cloud? Why was authentication tied to Google when an email address would have been enough? Why did a service need location access continuously rather than only while I was using it? Why was a file format useful only inside one vendor's ecosystem?

At that point, replacing software stopped being a project in itself. It became a side effect of reviewing dependencies.

Sometimes the answer was open source. Sometimes it was a privacy-respecting commercial service. Sometimes I kept exactly what I was already using because the convenience was worth it. The meaningful change was that I had stopped treating the default choice as automatically neutral.

This is also where projects such as Privacy Guides became genuinely useful to me.<sup>[3](#note-3)</sup> They provide starting points for browsers, communication tools, DNS, operating systems, authentication, storage, and other categories without pretending that one configuration fits everyone.

I increasingly found myself using those resources not as shopping lists, but as prompts for asking better questions about the software already in my life.

---

## One Question Led to Another

Looking back, none of these decisions happened as part of a grand plan. One question simply kept exposing another dependency I had never consciously considered.

Questioning Windows led me to inspect the desktop. Inspecting the desktop made me think about my phone. Thinking about my phone led me to app permissions, background services, and Google integration. From there it was only a small step toward looking at cloud storage, messaging platforms, authentication providers, password managers, browsers, navigation apps, and eventually self-hosted services.

Over time, I started replacing parts of my stack one application at a time. Not because I was trying to build some mythical "perfect privacy setup," but because each replacement addressed a concrete dependency I had already identified.

Some of those changes looked roughly like this:

| Area | What changed | Why |
| --- | --- | --- |
| Desktop OS | Windows → Arch Linux | More inspectability, control, and fewer imposed defaults |
| Mobile OS | Stock Android → GrapheneOS | Stronger sandboxing, permissions, and control over Google services |
| Messaging | More use of Signal | End-to-end encryption and reduced dependence on larger social ecosystems |
| Passwords | Dedicated password manager | Less dependence on browser or platform accounts for credentials |
| Applications | Increasing preference for open-source alternatives | Better inspectability, fewer unnecessary accounts, and more local-first options |
| Cloud services | Selective replacement or self-hosting | Reduce unnecessary third-party dependencies without abandoning the cloud entirely |

I do not want to turn this into a giant "privacy stack" checklist, because I think that misses the point. The interesting part is not whether I use one particular application over another. It is why I made the change, what problem it solved, and what trade-offs came with it.

That is something I want to go into in much more detail in the next post.

---

## Open Source Became Part of the Answer

As I started replacing software, I naturally gravitated toward open-source applications.

Not because open source automatically means secure, private, or well-designed. It does not. Bad open-source software exists just as bad proprietary software does.

What open source often gives me, however, is a better chance of understanding what a tool is doing and a lower dependency on a single vendor's business model. It also tends to make certain kinds of software easier to self-host, audit, migrate away from, or keep using even if the original developer changes direction.

That matters to me more now than it used to.

If I can choose between two applications that solve the same problem equally well, but one keeps my data locally, uses an open format, does not require an account, and can be replaced without losing everything, that increasingly feels like the better long-term choice.

The benefit is not only privacy. It is resilience.

---

## Convenience Still Matters

There is a trap in privacy discussions where everything eventually becomes binary. Either you completely abandon mainstream technology, or you accept that privacy is impossible and stop caring.

I do not find either extreme particularly useful.

I still use cloud services. I still use proprietary software where it solves a problem exceptionally well. I still choose convenience when the trade-off makes sense, and I do not intend to self-host every service I touch simply because I technically can.

The difference is that I now think much more consciously about those trade-offs instead of accepting them by default.

That is really the theme connecting everything in this series. It is not about finding the "perfect" operating system, phone, cloud provider, or application. It is about understanding what those tools are doing, what they need access to, how difficult they are to leave, and whether that exchange still makes sense to me.

Sometimes the answer is yes.

Sometimes it is not.

The important part is that the decision is deliberate.

---

## From Privacy to Digital Sovereignty

The more I went through this process, the less useful the word "privacy" became on its own.

Privacy is part of it, certainly, but what I am really interested in is **digital sovereignty**: having meaningful control over the systems, services, identities, and data that increasingly define large parts of everyday life.

For me, that does not mean withdrawing from modern technology. It means reducing unnecessary dependencies, avoiding lock-in where practical, understanding where my data goes, and choosing tools that give me a reasonable path out if I ever decide to leave.

In that sense, Arch Linux, GrapheneOS, open-source software, self-hosting, and deleting unused accounts are not separate hobbies. They are all different responses to the same underlying question:

> **How much control do I actually have over my own digital life?**

Curiosity was simply the first step.

---

## What's Next?

The next part of this series will be much more practical. I want to go through the tools and services I eventually settled on, the ones I tried and abandoned, and the trade-offs involved in replacing parts of a mainstream software stack.

That includes open-source applications, privacy-preserving alternatives, self-hosted services, de-Googling, reducing dependence on large cloud ecosystems, and some of the resources that made the process significantly easier.

The goal is not to convince anyone to reproduce my setup exactly. In fact, I would argue against doing that. Different threat models, workflows, technical abilities, and tolerances for inconvenience produce very different answers.

What I hope to provide instead is a useful starting point for asking better questions about the technology we already use—and perhaps a few practical ways of changing the answers when they no longer feel right.

---

## Notes & References

Below is a list of references so you can scan everything in one place.

<ol>
  <li id="note-1">
    <strong>Privacy Guides – Minimizing Windows 11 Data Collection</strong><br />
    Privacy Guides Community<br />
    <a href="https://discuss.privacyguides.net/t/minimizing-windows-11-data-collection/28193" target="_blank" rel="noopener noreferrer">https://discuss.privacyguides.net/t/minimizing-windows-11-data-collection/28193</a><br />
    A community discussion covering Windows telemetry, privacy settings, and practical approaches to reducing unnecessary data collection. Useful as a starting point for understanding how many different services and settings participate in Windows data collection.
  </li>

  <li id="note-2">
    <strong>GrapheneOS</strong><br />
    GrapheneOS Project<br />
    <a href="https://grapheneos.org/" target="_blank" rel="noopener noreferrer">https://grapheneos.org/</a><br />
    A security- and privacy-focused Android-based operating system for supported Pixel devices, with a strong emphasis on application sandboxing, exploit mitigation, permissions, and user control.
  </li>

  <li id="note-3">
    <strong>Privacy Guides</strong><br />
    Privacy Guides<br />
    <a href="https://www.privacyguides.org/" target="_blank" rel="noopener noreferrer">https://www.privacyguides.org/</a><br />
    A useful collection of privacy-oriented recommendations covering operating systems, browsers, communication, DNS, storage, authentication, and other parts of a modern software stack.
  </li>

  <li id="note-4">
    <strong>Arch Linux</strong><br />
    Arch Linux Project<br />
    <a href="https://archlinux.org/" target="_blank" rel="noopener noreferrer">https://archlinux.org/</a><br />
    A lightweight and flexible Linux distribution that places much of the system configuration directly in the hands of the user.
  </li>

  <li id="note-5">
    <strong>Reclaiming Your Digital Life</strong><br />
    Velitchko Filipov<br />
    <a href="https://velitchko.github.io/blog/digital-reclaiming-2026" target="_blank" rel="noopener noreferrer">https://velitchko.github.io/blog/digital-reclaiming-2026</a><br />
    The first post in this series, focusing on account deletion, GDPR requests, the growing value of personal data, and why I started thinking more seriously about digital sovereignty.
  </li>
</ol>

---

## How to Use This Post

### Share Your Experience

Feel free to:

- **Share your own journey** into privacy, Linux, open-source software, or self-hosting.
- **Recommend tools** that helped you understand or regain control over your own devices.
- **Suggest alternatives** that strike a useful balance between convenience and privacy.
- **Challenge my assumptions**—different workflows and threat models will naturally lead to different choices.
- **Share on social media** with `#Privacy #DigitalSovereignty #Linux #GrapheneOS #OpenSource`

### Talk About It!

**Discussion**  
I am particularly interested in what first made other people start questioning the defaults they had accepted for years.

- Was there a particular feature, update, or incident that changed how you thought about your devices?
- Have you ever inspected what your computer or phone is doing while apparently "idle"?
- Which software dependency would be hardest for you to replace?
- Where do you draw the line between convenience, privacy, and control?
- Have you moved away from a large ecosystem such as Google, Microsoft, Apple, or Amazon? What actually worked?
- What does **digital sovereignty** mean to you in practice?