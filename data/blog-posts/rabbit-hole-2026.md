---
title: "Down The Rabbit Hole"
subtitle: "How curiosity led me toward digital sovereignty"
date: "2026-08-25"
author: "Velitchko Filipov"
hashtags:
  - privacy
  - digital-sovereignty
  - open-source
categories:
  - Privacy
  - Opinion
  - Technology
excerpt: "I didn't wake up one morning and decide to de-Google my life. It started with a much simpler question: what are my devices actually doing, and how much control do I really have over them?"
featured: false
---

# The Rabbit Hole Starts With One Question

![The Rabbit Hole Starts With One Question](/blog/rabbit-hole-cutaway.png)

> *The funny thing about curiosity is that it rarely stops where you expect it to.*

In my [previous post](https://velitchko.github.io/blog/digital-reclaiming-2026), I wrote about deleting old accounts and discovering how difficult it can be to reclaim personal data once it has already left your hands. What I left mostly unexplored was the question that came before all of that: why had I started paying attention to these dependencies in the first place?

The honest answer is that I never planned to "de-Google" my life, switch operating systems, replace large parts of my software stack, or spend time thinking about digital sovereignty. I was not trying to become a privacy advocate, and I certainly was not looking for an excuse to replace every proprietary tool I used.

I was perfectly happy using mainstream software as long as it solved the problem I needed it to solve.

What changed was my curiosity and led me to gain a new perspective on the topic.

---

## It Started With Windows

For years, Windows was simply the operating system on my computer. I used it, updated it, occasionally complained about it, and otherwise treated most of what happened below the application layer as somebody else's problem.

An accumulation of small moments made me increasingly curious about how little I actually understood about the machine and software I was using every day.

Why did shutting the computer down sometimes take surprisingly long? Why was there network activity during startup before I had even opened anything? Why did updates introduce new services or quietly change settings I had previously configured (*cough* Microsoft Edge *cough*)?

Why did Microsoft Copilot repeatedly reappear even after disabling it for the 100th time? Remove, disable, another update arrives, and there it is again! Over time, the issue stopped being about Copilot itself and became more about the feeling that I was not fully in control of the operating system running on my own machine. It did not feel like I owned my own machine.

Windows Recall sharpened that feeling. Microsoft now describes Recall as opt-in, local, encrypted, and protected by Windows Hello. Sure. But the basic mechanism is still that the operating system periodically saves snapshots of your active screen and makes them searchable.<sup>[1](#note-1)</sup> Emails, websites, private chats, half-visible windows, whatever happened to be on screen when the snapshot was taken: the operating system has become a witness.

A recent video walkthrough of a clean Windows 11 system left idle really highlights the issue I am describing. It reports background telemetry and network traffic to Microsoft and third-party advertising or market-research infrastructure, all while the user is doing nothing, and discusses Recall as part of the same ownership problem.<sup>[2](#note-2)</sup>

The setup process points in the same direction. Windows requires internet connectivity and a Microsoft account during initial device setup.<sup>[3](#note-3)</sup> Having a local account is close to impossible for the average person and that is not a small issue. Installing an operating system on your own computer should not begin by forcing the machine through a cloud account.

So yeah, Windows became a window.

A window into alternatives, into different operating systems, and into the uncomfortable fact that I was increasingly just present on a machine whose defaults someone else had decided.

So my question became:

> **What is my computer actually doing when I am not actively telling it to do anything?**

And that question sent me into a rabbit hole of services, logs, startup processes, network activity, telemetry settings, permissions, and documentation. Privacy Guides has a useful discussion on minimizing Windows 11 data collection that shows just how many separate mechanisms are involved once you start looking.<sup>[4](#note-4)</sup>

The more I inspected, the more I realized that the thing bothering me was not only data collection. It was the lack of transparency and visibility into (*and authority over*) the defaults of my own operating system.

---

## Then Google Comes Along

Once I started looking at operating-system defaults, the next question was almost too obvious.

What about the browser and search engine?

For a long time I used Google Search and Chrome because they were simply there. They worked, they were familiar, and changing them felt like one of those tasks that belongs in the same category as cleaning a drawer: probably useful, never urgent.

But recently Google Search started feeling less like search and helpful information and more like bloat.

Ads. AI-generated summaries. Sponsored results. Interface changes that made it just a little too easy to click the wrong thing because the "promoted" label was technically visible but practically missable.

Which, yes, is probably where a lot of those clicks come from.

So I swapped search first. DuckDuckGo became the default, with the AI features turned off and no account required.<sup>[5](#note-5)</sup> Then I moved from Chrome to Firefox.<sup>[6](#note-6)</sup> The point was not that this magically solved tracking. It gave me a browser setup I could reason about more easily and configure more aggressively.

Some extensions have become part of that baseline for me. They do different things, and they are not a substitute for understanding the sites you use, but together they prevent tracking and try to preserve some of your privacy online.

| Extension | What I use it for |
| --- | --- |
| [uBlock Origin](https://ublockorigin.com/) | Blocking ads, trackers, and other unnecessary page requests |
| [Privacy Badger](https://privacybadger.org/) | Learning-based tracker blocking from the EFF |
| [Ghostery](https://www.ghostery.com/) | Additional tracker visibility and blocking |
| [Cookie AutoDelete](https://github.com/Cookie-AutoDelete/Cookie-AutoDelete) | Removing cookies after tabs close, instead of letting them sit forever |
| [ClearURLs](https://docs.clearurls.xyz/) | Cleaning tracking parameters from links before they spread further |

This was also when I learned more about browser and system fingerprinting: the quiet art of recognizing you even when you are not logged in and even when cookies are not the whole story. The EFF's Cover Your Tracks test is a useful and a pretty scary place to start if you want to see how distinctive your browser can be.<sup>[7](#note-7)</sup>

I am not trying to instill a sense of panic into you (or myself for that matter). But a question eveyrone should ask themselves is:

> **What am I exposing by default, and do I actually want that?**

---

## Linux Was a Consequence

These considerations eventually pushed me toward Linux, and later Arch Linux (*btw*).<sup>[8](#note-8)</sup> I made this move because I wanted a system that was easier for me to inspect, understand, modify, and maintain on my own terms.

I started with Ubuntu, and it was nice for a while. That is not a backhanded compliment. Ubuntu is good at what it tries to be: convenient, stable, approachable, and likely to work without turning every small configuration choice into a tiny research project.

But after a while I noticed the same pattern again. Many configurations, settings, and assumptions were already baked in. Some of them were reasonable. Some were even helpful. But the system was still opinionated in ways that did not quite match what I wanted.

Arch, on the other hand, does not assume much. The system starts relatively small, and much of what eventually runs on it is there because I installed, configured, or enabled it myself. I can easily inspect services, follow logs, read configuration files, replace components, monitor network traffic, and generally understand far more of the path between *"I asked the computer to do something"* and *"the computer did it"* just because I set it up myself and did not click through some installer.

More importantly, I could make the machine fit my workflow instead of reshaping my workflow around the machine. Desktop environment, window manager, services, packages, startup behavior, update cadence: all of it became something I could choose deliberately.

That might not sound like a whole lot to a lot of people, but it changed my relationship with the machine. The operating system stopped being something I mostly tolerated and became something I could actually shape.

Moving to Linux did not suddenly make my computer "private." What it gave me was something I had not appreciated until then: inspectability and control.

<mark>My machine finally felt mine.</mark>

---

## The Same Approach Followed Onto My Phone

Once I had spent some time paying closer attention to my desktop, it became difficult not to apply the same thinking to the device I carried around in my pocket every day.

In many ways, the phone was the more uncomfortable device to examine. It spends nearly every waking hour with me and has access to location, photographs, messages, contacts, microphones, cameras, authentication tokens, payment systems, and a remarkably detailed history of how I use it.

Downloading my Google Takeout archive made that discomfort much harder to dismiss. I expected the usual account export. Instead, I found a much more detailed record of my own activity than I had expected: location history, searches, device use, app activity, and metadata I had barely thought about at the time. It was not proof that every Android phone behaves identically, of course. But it was a very effective reminder of what a default Google-connected phone can accumulate over time.<sup>[15](#note-15)</sup>

This did not start with me throwing my phone away. I had a Nothing Phone, and I liked that device a lot. The change started slowly: replacing default apps with Fossify apps<sup>[9](#note-9)</sup> where that made sense, reducing my reliance on Google services and other large providers one piece at a time, and paying slightly more attention to permissions, background usage, and network activity. 

Why did apps I had closed continue in the background? Why did force stop or shutdown not always seem to do the thing the words suggested? Why was the phone, while apparently idle, still uploading and downloading chunks of data? What was my keyboard logging<sup>[10](#note-10)</sup>? What was going on?

Some of what initially looked suspicious turned out to have perfectly ordinary explanations: push notifications, synchronization, cached processes, background jobs, update checks, or operating-system services.

I did not want to build my entire setup around assuming that every unexplained packet was malicious. I wanted a system where I could understand the behavior and meaningfully decide what I was comfortable allowing.

That eventually led me to GrapheneOS.<sup>[11](#note-11)</sup>

The awkward detail (and quite ironic one) is that GrapheneOS is officially supported on Pixel phones. Motorola support is planned for future 2027 flagships<sup>[16](#note-16)</sup> (fimgers crossed), which is promising, but it did not help my Nothing Phone. So I bought a Pixel, flashed GrapheneOS, and the whole process took about ten minutes.

I expected it to be fiddly but it was not.

What appealed to me was not simply the label "privacy-focused Android." It was the way GrapheneOS approaches application sandboxing, permissions, exploit mitigation, and optional Google services. In particular, the ability to install Google Play as ordinary sandboxed application offered a much more practical middle ground than the usual framing of either accepting Google everywhere or removing it completely.

The phone felt immediately clean in a way I did not quite expect. Not magical, not perfect, just lighter. As if fewer invisible agreements had been made on my behalf.

There are trade-offs, obviously. The one I am still getting used to is NFC payments. Google Wallet had been my default way of paying, and it does not work on GrapheneOS because Google does not whitelist the project.

> *Jeez, I wonder why.*

There were also external nudges. The Keep Android Open campaign helped make the platform politics more visible<sup>[12](#note-12)</sup>, and a recent TechCrunch story about a border-search case involving a duress password was the kind of detail that made the security model feel less abstract.<sup>[13](#note-13)</sup>

That specific detail was not decisive on its own, but it was simply the last straw. It was the moment where abstract concerns about control became reasons to understand the security model of the phone I carried.

Again, the goal was not to reject technology. It was to regain some control over the terms under which I used it.

---

## The Defaults Started Looking Less Default

Once I had questioned the operating system and the phone, the same pattern started appearing everywhere else. There is a name for that feeling: <mark>the frequency illusion</mark>, sometimes called the Baader–Meinhof phenomenon<sup>[17](#note-17)</sup>. Once you notice a pattern, it can seem as if it has suddenly appeared everywhere. Usually, the world has not changed that quickly; your attention has.

Why did a simple application require an account? Why did a note-taking tool need its own cloud? Why was authentication tied to Google when an email address would have been enough? Why did a service need location access continuously rather than only while I was using it? Why was a file format useful only inside one vendor's ecosystem?

At that point, I started thinking about what software I could start replacing to minimize side effects and dependencies.

Sometimes the answer was open source. Sometimes it was a privacy-respecting commercial service. Sometimes I kept exactly what I was already using because the convenience was worth it. The important change was that the default choice no longer looked automatically as a default.

This is also where projects such as Privacy Guides became genuinely useful to me.<sup>[14](#note-14)</sup> They provide starting points for browsers, communication tools, DNS, operating systems, authentication, storage, and other categories without pretending that one configuration fits everyone.

I increasingly found myself using those resources not as shopping lists, but as starting points for asking better questions about the software already in my life.

---

## Down The Rabbit Hole

One question led to another, which led to another, and another... Looking back, none of these decisions happened as part of a grand plan. One question simply kept exposing another dependency I had never consciously considered.

Questioning Windows led me to inspect the desktop. Inspecting the desktop made me think about my phone. Thinking about my phone led me to app permissions, background services, and vendor lock-in. From there it was only a small step toward looking at cloud storage, messaging platforms, authentication providers, password managers, browsers, navigation apps, and eventually self-hosted services.

Over time, I started replacing parts of my stack one application at a time. Not because I was trying to build some mythical "perfect privacy setup," but because each replacement addressed a concrete dependency I had already identified.

Some of those changes looked roughly like this:

| Area | What changed | Why |
| --- | --- | --- |
| Desktop OS | Windows → Arch Linux | More inspectability, control, and fewer imposed defaults |
| Search/browser | Google Search + Chrome → DuckDuckGo + Firefox | Fewer account assumptions, more control over AI/search defaults, and a browser I can configure |
| Mobile apps | Default Google-heavy app stack → Fossify and other alternatives | Reduce background dependency on services I did not need for basic tasks |
| Mobile OS | Vendor Android → GrapheneOS | Stronger sandboxing, permissions, and control over Google services |
| Messaging | More use of Signal | End-to-end encryption and reduced dependence on larger social ecosystems |
| Passwords | Dedicated password manager | Less dependence on browser or platform accounts for credentials |
| Applications | Increasing preference for open-source alternatives | Better inspectability, fewer unnecessary accounts, and more local-first options |
| Cloud services | Selective replacement or self-hosting | Reduce unnecessary third-party dependencies without abandoning the cloud entirely |

I do not want to turn this into a giant "privacy stack" checklist, because I think that misses the point. The interesting and hopefully useful part is why I made the change, what problem it solved, and what trade-offs came with it.

---

## From Privacy to Digital Sovereignty

The more I went through this process, the less useful the word "privacy" became on its own.

Privacy is part of it, certainly, but what I am really interested in is **digital sovereignty**: having meaningful control over the systems, services, identities, and data that increasingly define large parts of everyday life.

For me, that does not mean withdrawing from modern technology. It means reducing unnecessary dependencies, avoiding lock-in where practical, understanding where my data goes, and choosing tools that give me a reasonable path out if I ever decide to leave.

In that sense, Arch Linux, GrapheneOS, open-source software, self-hosting, and deleting unused accounts are different responses to the same underlying question:

> **How much control do I actually have over my own digital life?**

Curiosity was simply a first step.

---

## What's Next?

The next part of this series will be much more practical. I want to go through the tools and services I eventually settled on, the ones I tried and abandoned, and the trade-offs involved in replacing parts of a mainstream software stack.

That includes open-source applications, privacy-preserving alternatives, self-hosted services, de-Googling, reducing dependence on large cloud ecosystems, and some of the resources that made the process significantly easier. I also want to make the first step less vague: how to audit a digital footprint, take stock of the accounts and data you have already spread around, and where I would begin if I had to do this all over again.

The goal is not to convince anyone to reproduce my setup exactly. In fact, I would argue against doing that. Different threat models, workflows, technical abilities, and tolerances for inconvenience produce very different answers.

What I hope to provide instead is a useful starting point for asking better questions about the technology we already use—and perhaps a few practical ways of changing the answers when they no longer feel right.

---

## Notes & References

Below is a list of references so you can scan everything in one place.

<ol>
  <li id="note-1">
    <strong>Microsoft Recall</strong><br />
    Microsoft Support / Microsoft Learn<br />
    <a href="https://support.microsoft.com/en-US/Windows/Ai/Ai-Features/retrace-your-steps-with-recall" target="_blank" rel="noopener noreferrer">https://support.microsoft.com/en-US/Windows/Ai/Ai-Features/retrace-your-steps-with-recall</a><br />
    <a href="https://learn.microsoft.com/en-us/windows/client-management/manage-recall" target="_blank" rel="noopener noreferrer">https://learn.microsoft.com/en-us/windows/client-management/manage-recall</a><br />
    Microsoft's own documentation for Recall, including periodic snapshots, local storage and analysis, opt-in controls, Windows Hello protection, filtering, and management policies.
  </li>

  <li id="note-2">
    <strong>Leaving Windows 11 Idle</strong><br />
    YouTube video walkthrough<br />
    <a href="https://www.youtube.com/watch?v=Wtg_s1GQiMU" target="_blank" rel="noopener noreferrer">https://www.youtube.com/watch?v=Wtg_s1GQiMU</a><br />
    A video walkthrough discussing Windows 11 idle network activity, telemetry, Recall, and the broader ownership problem around modern Windows defaults.
  </li>

  <li id="note-3">
    <strong>Windows 11 System Requirements</strong><br />
    Microsoft Support<br />
    <a href="https://support.microsoft.com/en-US/Windows/Experience/Compatibility/windows-11-system-requirements" target="_blank" rel="noopener noreferrer">https://support.microsoft.com/en-US/Windows/Experience/Compatibility/windows-11-system-requirements</a><br />
    Microsoft's system requirements page states that Windows 11 Home and Windows 11 Pro for personal use require internet connectivity and a Microsoft account during initial setup.
  </li>

  <li id="note-4">
    <strong>Privacy Guides – Minimizing Windows 11 Data Collection</strong><br />
    Privacy Guides Community<br />
    <a href="https://discuss.privacyguides.net/t/minimizing-windows-11-data-collection/28193" target="_blank" rel="noopener noreferrer">https://discuss.privacyguides.net/t/minimizing-windows-11-data-collection/28193</a><br />
    A community discussion covering Windows telemetry, privacy settings, and practical approaches to reducing unnecessary data collection. Useful as a starting point for understanding how many different services and settings participate in Windows data collection.
  </li>

  <li id="note-5">
    <strong>DuckDuckGo</strong><br />
    DuckDuckGo<br />
    <a href="https://duckduckgo.com/" target="_blank" rel="noopener noreferrer">https://duckduckgo.com/</a><br />
    A search engine that does not require an account and provides settings for turning off AI-assisted features.
  </li>

  <li id="note-6">
    <strong>Firefox</strong><br />
    Mozilla<br />
    <a href="https://www.mozilla.org/firefox/" target="_blank" rel="noopener noreferrer">https://www.mozilla.org/firefox/</a><br />
    The browser I moved to because it gives me more control over extensions, defaults, and privacy-related configuration.
  </li>

  <li id="note-7">
    <strong>Cover Your Tracks</strong><br />
    Electronic Frontier Foundation<br />
    <a href="https://coveryourtracks.eff.org/" target="_blank" rel="noopener noreferrer">https://coveryourtracks.eff.org/</a><br />
    A browser test showing how tracking protection and fingerprinting resistance behave in practice.
  </li>

  <li id="note-8">
    <strong>Arch Linux</strong><br />
    Arch Linux Project<br />
    <a href="https://archlinux.org/" target="_blank" rel="noopener noreferrer">https://archlinux.org/</a><br />
    A lightweight and flexible Linux distribution that places much of the system configuration directly in the hands of the user.
  </li>

  <li id="note-9">
    <strong>Fossify</strong><br />
    Fossify<br />
    <a href="https://www.fossify.org/" target="_blank" rel="noopener noreferrer">https://www.fossify.org/</a><br />
    Open-source Android apps that can replace many default utilities without requiring a larger account ecosystem. The project source is available at <a href="https://github.com/FossifyOrg" target="_blank" rel="noopener noreferrer">github.com/FossifyOrg</a>; its apps are also available through <a href="https://f-droid.org/packages/" target="_blank" rel="noopener noreferrer">F-Droid</a>.
  </li>

  <li id="note-10">
    <strong>Learn how Gboard gets better</strong><br />
    Google Gboard Help<br />
    <a href="https://support.google.com/gboard/answer/12373137?hl=en" target="_blank" rel="noopener noreferrer">https://support.google.com/gboard/answer/12373137?hl=en</a><br />
    Google's explanation of Gboard federated learning, conventional learning for dictation, default learning settings, and optional audio snippet donation.
  </li>

  <li id="note-11">
    <strong>GrapheneOS</strong><br />
    GrapheneOS Project<br />
    <a href="https://grapheneos.org/" target="_blank" rel="noopener noreferrer">https://grapheneos.org/</a><br />
    A security- and privacy-focused Android-based operating system for supported Pixel devices, with a strong emphasis on application sandboxing, exploit mitigation, permissions, and user control.
  </li>

  <li id="note-12">
    <strong>Keep Android Open</strong><br />
    Keep Android Open<br />
    <a href="https://keepandroidopen.org/" target="_blank" rel="noopener noreferrer">https://keepandroidopen.org/</a><br />
    A campaign documenting concerns about preserving the ability to install alternative Android operating systems.
  </li>

  <li id="note-13">
    <strong>TechCrunch – Border Search Duress Password Story</strong><br />
    TechCrunch<br />
    <a href="https://techcrunch.com/2026/07/24/us-accuses-american-of-allegedly-wiping-his-phone-using-a-duress-password-during-border-search/" target="_blank" rel="noopener noreferrer">https://techcrunch.com/2026/07/24/us-accuses-american-of-allegedly-wiping-his-phone-using-a-duress-password-during-border-search/</a><br />
    A recent story that made the practical meaning of mobile-device security features harder to treat as abstract.
  </li>

  <li id="note-14">
    <strong>Privacy Guides</strong><br />
    Privacy Guides<br />
    <a href="https://www.privacyguides.org/" target="_blank" rel="noopener noreferrer">https://www.privacyguides.org/</a><br />
    A useful collection of privacy-oriented recommendations covering operating systems, browsers, communication, DNS, storage, authentication, and other parts of a modern software stack.
  </li>

  <li id="note-15">
    <strong>Google Takeout</strong><br />
    Google<br />
    <a href="https://takeout.google.com/" target="_blank" rel="noopener noreferrer">https://takeout.google.com/</a><br />
    Google's export service for reviewing and downloading data associated with a Google account.
  </li>

  <li id="note-16">
    <strong>Motorola - GrapheneOS</strong><br />
    Motorola<br />
    <a href="https://motorolanews.com/motorola-three-new-b2b-solutions-at-mwc-2026/" target="_blank" rel="noopener noreferrer">https://motorolanews.com/motorola-three-new-b2b-solutions-at-mwc-2026/</a><br />
    Current information on the planned Motorola phone and support for GrapheneOS.
  </li>

  <li id="note-17">
    <strong>The Frequency Illusion</strong><br />
    Wikipedia<br />
    <a href="https://en.wikipedia.org/wiki/Frequency_illusion" target="_blank" rel="noopener noreferrer">https://en.wikipedia.org/wiki/Frequency_illusion</a><br />
    The frequency illusion: noticing something and then overestimating how often it occurs.
  </li>
</ol>
