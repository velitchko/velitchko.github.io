---
title: "If You Really, Really, Really Want to Do This"
subtitle: "A practical privacy pack for auditing your digital footprint and reducing dependencies"
date: "2026-08-30"
author: "Velitchko Filipov"
hashtags:
  - privacy
  - digital-sovereignty
  - digital-footprint
categories:
  - Privacy
  - Technology
  - Guide
excerpt: "So you really want to reclaim your digital life? This is where I would start: map your footprint before deleting anything, secure the identities that matter, audit the ecosystems you depend on, replace defaults deliberately, and only then start deleting and self-hosting."
featured: false
---

# If You Really, Really, Really Want to Do This

> *Before you start deleting accounts and rebuilding your software stack, you need to know what you actually have.*

In the [previous post](https://velitchko.github.io/blog/rabbit-hole-2026), I wrote about the questions that pushed me down this rabbit hole in the first place: Windows, Google, the phone in my pocket, the applications running in the background, and the uncomfortable realization that a lot of the technology I used every day was operating on defaults I had never consciously chosen.<sup>[1](#note-1)</sup>

I ended that post by promising something more practical. If somebody read the first two pieces and thought, *"Okay, fine. I really, really, really want to do this. Where do I actually start?"*, this is roughly the answer I would give them.

The temptation is to begin with the fun part. Install Linux. Flash GrapheneOS. Replace Google Search. Set up a home server. Delete Facebook. Spend a weekend moving everything into open-source software and emerge on Monday as a sovereign digital citizen. 😅

I would not start there.

If I had to do this again, I would begin with an audit. Before removing anything, migrating anything, or deleting anything, I would build a map of my existing digital footprint. The surprising part of this process is not how much data individual services have; it is how many services you have forgotten existed in the first place.

That changes the problem completely. Privacy stops being a shopping list of "better apps" and becomes an inventory problem: **what accounts exist, which identities connect them, what data they contain, which ones still matter, and which dependencies can I realistically remove?**

---

## Step Zero: Decide What You Are Actually Trying to Achieve

One lesson from going through this process is that "more privacy" is not a particularly useful specification. Privacy, security, anonymity, convenience, resilience, and independence overlap, but they are not the same goal. A setup designed for a journalist protecting sources will look very different from one designed for somebody who simply wants fewer companies profiling them.

My own goal is comparatively mundane: reduce unnecessary data collection, reduce vendor lock-in, remove accounts I no longer need, make the devices I own more understandable, and keep important data in places where I have a reasonable degree of control over it. I am not trying to become anonymous, disappear from the internet, or build a threat model around nation-state surveillance.

That distinction matters because otherwise this becomes an endless optimization problem. There is always another setting to harden, another service to replace, another server to self-host, and another person online willing to tell you that the thing you just installed is still insufficiently private.

<mark>The goal is not privacy purity. The goal is deliberate control.</mark>

Once I framed the project that way, the next step became obvious: I needed to know what I was actually dealing with.

---

## Build the Map Before You Burn the Map

Most of us do not have an accurate list of our online accounts. We have a vague memory of the important ones and a password manager containing some of the rest. Somewhere beyond that is a much larger graveyard of old shops, forums, SaaS trials, newsletters, apps, social networks, travel sites, developer tools, and services we authenticated into once with Google and immediately forgot.

That is where I would start.

Before deleting anything, collect the identifiers you have used over the years: current and old email addresses, usernames, aliases, phone numbers, and any recurring handles. Then use multiple sources to reconstruct the account history. No single technique finds everything, but the overlap becomes surprisingly informative.

I am currently building a repository around exactly this workflow. **[TODO: add repository link once public]**. The idea is not to produce another magical "scan me and fix my privacy" tool; it is to combine several imperfect signals into one local audit that helps you remember where your digital footprint actually lives.

### The signals I currently use

| Source | What it can reveal | Important caveat |
| --- | --- | --- |
| Sherlock | Public profiles associated with usernames across hundreds of sites | A matching username is not proof that the account is yours |
| MailAccess / email-account discovery | Services potentially associated with an email address | Availability and reliability vary by service; treat results as leads |
| Have I Been Pwned | Breaches in which an email address appears | A breach record is evidence the address existed in that dataset, not necessarily that the account still exists |
| Google Takeout / Gmail MBOX | Registration emails, verification messages, receipts, password resets, newsletters, OAuth notices | Your mailbox is extremely sensitive and should be analyzed locally |
| Firefox password export | Domains for which you have saved credentials | The CSV contains passwords in plaintext—handle it like a secret |
| Google third-party connections | Services where you used Sign in with Google or granted account access | Removing the Google connection does **not** delete the third-party account |

Sherlock is useful because usernames are surprisingly persistent. The project can check a username across hundreds of social networks and other services, which makes it useful as a discovery mechanism rather than as definitive proof of ownership.<sup>[2](#note-2)</sup> Have I Been Pwned gives you another historical signal: if an old email address appears in a breach associated with a service you had completely forgotten, that is a good reason to investigate whether the account still exists and whether its password was reused anywhere else.<sup>[3](#note-3)</sup>

The more interesting sources, however, are often the ones you already possess.

---

## Your Inbox Is an Accidental Account Database

Email is one of the best records of your digital history because almost every service has, at some point, sent some variation of:

- "Welcome!"
- "Verify your email address."
- "Your account has been created."
- "Reset your password."
- "Your receipt."
- "We have updated our Terms of Service."
- "We miss you."
- "Sad to see you go." 🙄

Google Takeout lets you export data from your Google account, including Gmail, and that archive can be examined locally.<sup>[4](#note-4)</sup> For Gmail, this means you can turn years of messages into a searchable source for account discovery. My repository is experimenting with analyzing the exported mailbox for domains, common registration language, receipts, verification links, password-reset emails, OAuth notifications, and other patterns that suggest an account relationship.

The important part is that this analysis should happen **locally**. A Google Takeout archive is effectively a compressed history of your digital life. Uploading it to a random "privacy scanner" would be a spectacularly ironic way to improve your privacy.

The same applies even more strongly to browser password exports. Firefox allows saved logins to be exported to CSV, which can be incredibly useful for discovering accounts you have forgotten.<sup>[5](#note-5)</sup> Mozilla also makes the danger very explicit: the exported passwords are readable plaintext.

> **Do not upload a browser password CSV to an online tool. Do not email it to yourself. Do not leave it sitting in Downloads for six months.**

If I use that CSV in the audit, I want the analyzer to extract the service and domain information locally, produce the inventory, and then allow the original export to be destroyed immediately. The passwords themselves are not interesting for the audit; the fact that an account existed is.

---

## Google Will Also Tell You Which Apps You Forgot About

One of the simplest checks requires no OSINT tooling at all.

Open your Google Account and review the third-party connections. Google lets you see applications where you use **Sign in with Google**, applications that have been granted access to Google Account data, and accounts that have been linked to Google in other ways.<sup>[6](#note-6)</sup>

This list can be a gold mine of forgotten services.

There is an important distinction here, though: **unlinking an application from Google is not the same as deleting the account at that application**. If you used Google OAuth to create an account with a service, removing its Google access may only sever the authentication relationship. The service can still have a perfectly valid account containing your name, email address, activity history, uploads, purchases, or whatever else you gave it.

I therefore treat the Google connections page as another discovery source. Before revoking access, I first determine whether I still need the service and whether Google is my only login method. If I want to keep the account, I make sure there is another way to authenticate. If I do not want it, I delete the account at the service itself and then remove the Google connection.

That order saves a surprising amount of pain.

---

## Turn Discovery Into an Actual Audit

Finding accounts is only useful if you can turn the findings into decisions. A giant list of 600 domains is not a privacy strategy; it is just a new source of anxiety.

The audit therefore needs structure. For each service I want at least:

| Field | Question |
| --- | --- |
| Service | What company or product is this? |
| Evidence | Why do I think I have or had an account? |
| Identifier | Which email, username, phone number, or OAuth identity was used? |
| Access | Can I still log in? |
| Usage | Do I still actively use it? |
| Sensitivity | What kind of data did I give it? |
| Security | Is the password unique? Is MFA enabled? Has the service appeared in a breach? |
| Dependency | Is another account required to authenticate? |
| Vendor ecosystem | Does it belong to a larger platform relationship? |
| Decision | Keep, migrate, delete, investigate, or legally required retention |
| Status | Not started, request sent, waiting, deleted, retained |
| Notes | DPO contacts, deletion URLs, retention explanations, support history |

Once that exists, the exercise becomes much less abstract. I can sort by risk, importance, and effort rather than randomly deleting whatever account happens to annoy me that afternoon.

My own priority order is roughly: secure the important accounts first, delete obvious junk second, investigate accounts I cannot access third, and only then start migrating services that I actively use.

That might sound backwards for a post about reducing your footprint, but there is little point deleting twenty abandoned forums while your primary email account still uses a reused password and no MFA.

---

## Identity Is More Important Than the Apps

If I had to pick one layer to fix before anything else, it would probably be identity.

Your email account, password manager, recovery addresses, phone number, OAuth providers, and MFA methods are the skeleton underneath almost everything else. If those relationships are weak, replacing Google Maps with an open-source alternative is not going to save you.

My baseline would be:

- A dedicated password manager with unique passwords for every service.
- MFA wherever it matters, preferably using passkeys or an authenticator rather than SMS where practical.
- Recovery codes stored somewhere safe and offline.
- Email aliases for new accounts where that makes sense.
- Fewer "Sign in with Google / Facebook / Apple" dependencies.
- A deliberate recovery strategy for the accounts that can reset everything else.

This is also why the account audit is useful. It reveals how much of your digital life depends on one or two identity providers.

If losing access to one Google, Apple, Microsoft, or Meta account would lock you out of dozens of unrelated services, that is a dependency worth reducing even if you have no intention of leaving the provider itself.

---

## Then Comes the "de-MAGA" Part

I have jokingly started referring to one part of this as **de-MAGA**: reducing dependence on Meta, Microsoft, Amazon, Google, and Apple. Yes, the acronym cheats slightly. Please direct complaints to the acronym department. 😅

The point is not to purge every trace of these companies from existence. That would be both unrealistic and, in many cases, counterproductive. Amazon alone sits underneath an enormous amount of web infrastructure through AWS; trying to avoid every indirect dependency would turn this into an archaeological project rather than a useful privacy exercise.

Instead, I look at **direct relationships**: accounts, identity, storage, communication, operating systems, purchases, behavioral history, and the services where these companies are the primary party holding information about me.

### The questions I ask

| Ecosystem | Things worth auditing |
| --- | --- |
| Meta | Facebook, Instagram, Messenger, WhatsApp, Threads, old profiles, advertising preferences, connected apps |
| Microsoft | Windows account, Outlook, OneDrive, Microsoft 365, Teams, LinkedIn, Xbox, developer services |
| Amazon | Retail account, Alexa, Kindle, Audible, Prime, Photos, Ring, purchase history and devices |
| Google | Gmail, Search history, Chrome, Drive, Photos, Maps/Timeline, YouTube, Android, Play, OAuth connections |
| Apple | Apple Account, iCloud, Photos, App Store, subscriptions, Sign in with Apple, device backups and location services |

This is not a "delete everything immediately" table. Some of these services may be valuable enough that keeping them is the rational choice. The audit simply forces the relationship to become explicit.

Google is a good example. My Google account had accumulated years of email, authentication relationships, app activity, search behavior, YouTube history, location-related data, and device information. I did not need to delete Google overnight to make meaningful progress. I could first move authentication away from Google where practical, replace the browser and search defaults, migrate selected services, reduce unnecessary history, and gradually turn Google from *the identity underneath my digital life* into *one provider among several*.

That is a much more achievable objective.

---

## My "Privacy Pack": Start With the Foundations

Once the footprint is mapped and the important accounts are secured, I would finally start changing the stack. I think of this as a **privacy pack** rather than a definitive privacy setup: a small collection of defaults that reduce unnecessary exposure without turning everyday computing into a full-time security hobby.

### Desktop operating system

If Linux fits your workflow, I think it is worth trying. I use Arch because I value inspectability and control, but I would not tell a new Linux user to start there simply because I did. Fedora, Ubuntu, Mint, and other mainstream distributions may provide a much easier transition.

The more important question is whether you understand the system well enough to maintain it.

If you stay on Windows or macOS, that does not make the entire exercise pointless. Review privacy and telemetry settings, remove software you do not use, inspect startup applications, use full-disk encryption, keep the system updated, and pay attention to which cloud-account integrations are actually necessary.

The best operating system is not the one with the most impressive privacy subreddit. It is the one you can understand, maintain, update, and recover.

### Mobile operating system

On supported hardware, GrapheneOS has become my preferred Android setup. One reason is its ability to run Google Play as ordinary sandboxed applications rather than as privileged OS components, which gives me a pragmatic middle ground between app compatibility and reduced Google integration.<sup>[7](#note-7)</sup>

That does not mean everyone needs to buy a Pixel and flash GrapheneOS tomorrow. You can get surprisingly far on a conventional phone by reviewing application permissions, disabling unnecessary background access, removing apps you do not need, turning off history features you do not use, and replacing data-hungry applications one at a time.

Again, the point is not the brand of operating system. It is whether the device behaves in ways you understand and can meaningfully control.

---

## Open Source Helps, But It Is Not a Religion

My second post already touched on the fact that I increasingly prefer open-source software where it makes sense. I want to emphasize the *where it makes sense* part.

Open source does not magically guarantee privacy, security, maintainability, or good product design. A neglected open-source application can be a much worse choice than a well-maintained proprietary service. What open source gives you is the possibility of inspection, modification, independent packaging, community maintenance, and—in many cases—a much easier exit path.

Privacy Guides is one of the resources I use when I want a curated starting point rather than searching for "private alternative to X" and trusting whichever affiliate-marketing page has the best SEO.<sup>[8](#note-8)</sup> F-Droid is similarly useful on Android as a repository and ecosystem centered on free and open-source applications.<sup>[9](#note-9)</sup> The Awesome Privacy lists are useful when you want to explore a much wider set of alternatives, although—as with any community list—I would still evaluate individual projects rather than treating inclusion as an endorsement.<sup>[10](#note-10)</sup>

A rough map of the kinds of tools I look at is:

| Need | Starting points I would investigate |
| --- | --- |
| Browser | Firefox |
| Search | DuckDuckGo, SearXNG |
| Android app discovery | F-Droid |
| Basic Android utilities | Fossify |
| Messaging | Signal |
| Password management | Bitwarden, KeePassXC |
| 2FA | Aegis |
| Email aliases | SimpleLogin, addy.io |
| Maps/navigation | Organic Maps, OsmAnd |
| Notes | Joplin, Notesnook, Standard Notes |
| File synchronization | Syncthing |
| Cloud collaboration | Nextcloud |
| Photos | Immich |
| Media | Jellyfin |
| Network-wide filtering | Pi-hole, AdGuard Home |
| Private metasearch | SearXNG |

This is deliberately a list of **starting points**, not commandments. Tools change, projects get acquired, maintenance stops, threat models differ, and the "best" application today may be a poor recommendation two years from now.

The habit I want to develop is not memorizing the right list. It is learning how to evaluate the next tool.

---

## Self-Hosting Comes Later

Self-hosting is one of the most satisfying parts of this journey because it makes ownership tangible. Your files are on your hardware. Your service runs because you run it. You decide when it updates and, at least in principle, who gets access.

It is also very easy to romanticize.

When you self-host something, you are not removing responsibility; you are moving responsibility from a company onto yourself. Security updates, backups, authentication, storage failures, TLS certificates, remote access, monitoring, and disaster recovery are now your problem.

That is why I would **not** begin this journey by self-hosting email, moving every password into a server you configured yesterday, and exposing twenty Docker containers directly to the internet.

Start with services where failure is educational rather than catastrophic. A media server, RSS reader, local DNS blocker, test SearXNG instance, or other replaceable service is a much more forgiving introduction. Add proper backups. Learn how updates work. Learn what you are exposing to the network. Only then move more important data.

A useful rule of thumb:

> **If losing the service on a Sunday night would ruin your week, it probably should not be your first self-hosted container.**

Self-hosting should reduce dependencies without creating a new dependency on your own ability to be an unpaid systems administrator at 3 AM.

---

## From the Audit to Actually Deleting Things

Once the audit starts producing a list of accounts, the next question is what to do with them. For services I still use, the answer might be to secure the account, change the authentication method, reduce permissions, or simply leave it alone. For everything else, I start trying to remove it.

The easy cases are genuinely easy. Some services have a visible **Delete account** button, ask you to confirm once, and the whole thing is finished in a few minutes. I usually check [JustDeleteMe](https://justdeleteme.xyz/) first because it provides direct links to deletion pages for a large number of services and gives you a rough idea of how painful the process is likely to be.<sup>[11](#note-11)</sup> For companies where the self-service process does not exist or does not work, [YourDigitalRights.org](https://yourdigitalrights.org/) is an excellent starting point for generating a formal data-erasure request.<sup>[12](#note-12)</sup>

For me, the workflow has gradually settled into something like this:

1. **Try the normal deletion mechanism first.** If there is a working account-deletion button, use it.
2. **Check whether the company has a documented deletion process.** JustDeleteMe is useful for finding links that companies sometimes bury several layers deep in account settings.
3. **Find the privacy contact.** Look through the Privacy Policy for a privacy team, Data Protection Officer, EU representative, or other data-subject contact.
4. **Submit a formal erasure request.** In the EU, this is where Article 17 GDPR becomes particularly useful.<sup>[13](#note-13)</sup>
5. **Keep the entire correspondence.** Record when the original request was sent, which addresses you contacted, what the company requested from you, and whether they actually confirmed deletion.
6. **Escalate when necessary.** If support starts sending you in circles, ask for the privacy team or DPO. If a valid request remains unanswered beyond the applicable GDPR timeframe, the supervisory authority exists for exactly this reason.<sup>[14](#note-14)</sup>

I also use LLMs heavily during this stage—not to decide what my legal rights are, but to reduce the administrative burden. After the fifteenth variation of *"please delete my account, your deletion form is broken"*, there is little value in manually drafting every email from scratch. I give the model the relevant correspondence, the company's response, and the outcome I want, then use it to draft a concise reply, translate it when necessary, or help identify which GDPR provisions are relevant.

I still read and edit everything before sending it.

That combination—automation for repetitive writing and human judgment for the actual decisions—has made the process considerably more manageable.

---

## And Yes, Expect Pain

This is the part I underestimated when I began.

The GDPR itself was rarely difficult to understand. The organizational machinery surrounding it was.

I encountered companies that deleted everything within hours and others that took weeks merely to acknowledge a request. Some were refreshingly clear about what they could erase, what they were legally required to retain, why they had to retain it, and for how long. Others sent me between support departments, pointed repeatedly to broken forms, asked me to complete the same privacy request several times, or required access to an account whose own authentication system no longer worked.

One deletion request turned into more than thirty emails. Another sent me to the same form four times. Several required escalation to a Data Protection Officer before anything meaningful happened.

The strange part is that creating these accounts originally took seconds.

<mark>Our systems are extraordinarily well optimized for acquiring users and remarkably inconsistent at letting them leave.</mark>

Some of this is technical debt, some is organizational complexity, and some involves genuine regulatory retention requirements. Whatever the reason, my advice is to approach the deletion phase as a process rather than a weekend cleanup. Track it, expect some requests to take time, and do not interpret every retained piece of data as non-compliance. If a company has a legitimate obligation to retain something, what I want from them is a clear explanation of **what**, **why**, and **for how long**.

The painful cases are also why the inventory matters. Without one, I would have lost track of which companies had replied, which requests were approaching their deadlines, and which account had somehow generated email number thirty-seven. 😅

---

## The Order I Would Follow If I Started Again

If I had to compress the entire process into one sequence, it would look something like this:

1. **Back up first.** Export anything you might regret losing before changing accounts or identity providers.
2. **Secure your primary identities.** Email, password manager, MFA, recovery methods, and unique passwords come before cleanup.
3. **Collect your identifiers.** Current and historical emails, usernames, phone numbers, and aliases.
4. **Run the footprint audit.** Sherlock, breach history, mailbox analysis, password-manager/browser domains, OAuth connections, and manual memory.
5. **Build the inventory.** One row per service with evidence, access, sensitivity, dependency, and status.
6. **Fix security problems before deletion.** Reused passwords and breached credentials take priority.
7. **Delete low-value dormant accounts.** These are usually the easiest wins.
8. **Work through inaccessible accounts.** Recovery, support, privacy contacts, DPOs, and formal erasure requests where applicable.
9. **Audit the large ecosystems.** Reduce unnecessary Meta, Microsoft, Amazon, Google, and Apple dependencies.
10. **Replace defaults deliberately.** Browser, search, messaging, maps, notes, cloud storage, and other daily tools.
11. **Move to more controllable operating systems if it makes sense for you.**
12. **Self-host selectively and only after you understand the operational cost.**
13. **Repeat the audit.** This is maintenance, not a one-time purification ritual.

That final point is important. You will create new accounts. New tools will appear. Companies will be acquired. Privacy policies will change. You will make compromises because a service is useful enough to justify them.

The goal is not to reach a mythical state where no company has any information about you. The goal is to stop accumulating those relationships unconsciously.

---

## A Note About the Audit Repository

The repository I am building is intended to make the inventory stage less manual, not to replace judgment.

The basic idea is to combine public OSINT signals with evidence from data you already own. Sherlock can search known usernames. Have I Been Pwned can provide breach history. Email-account discovery can produce leads. Google Takeout can reveal years of account-related messages. A browser password export can reveal forgotten login domains. Google's own third-party connection list can show OAuth relationships.

The output I want is not a dramatic "privacy score." I want a boring table.

Boring is good.

Something that says:

```text
service        evidence            identifier        access   decision      status
example.com    gmail_registration  old@email.test    yes      delete        pending
forum.test     sherlock_username   old_handle        unknown  investigate   open
shop.test      firefox_login       alias@email.test  yes      delete        done
critical.test  hibp+password_mgr   main@email.test   yes      keep+secure   mfa-added
```

That is actionable. It can be reviewed, corrected, exported, and gradually worked through.

Most importantly, the sensitive parts should remain local. The tool should not need your plaintext passwords, and it should never upload a Firefox password CSV or raw mailbox archive to some external service just to tell you that you once had a Dropbox account.

The entire point of the project would be somewhat undermined by that design decision. 🙃

---

## Things I Would *Not* Do

There are a few mistakes I would actively avoid.

I would not delete accounts before making sure I had exported the data I wanted to keep. I would not revoke an OAuth provider before establishing another login method for an account I wanted to retain. I would not upload mailbox archives or password exports to online "audit" services. I would not switch every tool simultaneously and then spend two weeks unable to work because my calendar, contacts, maps, notes, and passwords had all changed at once.

I also would not try to eliminate every indirect Big Tech dependency. Discovering that a privacy-respecting service happens to use AWS does not automatically make migrating away from it worthwhile. There is an enormous difference between Amazon operating the infrastructure underneath a service and Amazon directly owning your identity, purchase history, voice recordings, photos, and behavioral profile.

Focus on the relationships where your decisions actually change something.

That keeps this practical.

---

## The Goal Is Optionality

After going through this for a while, I think optionality is a better measure of digital sovereignty than purity.

Can I leave this service without losing years of data? Can I export in a useful format? Can I authenticate without one company being the gatekeeper for everything else? Can I replace the application without rebuilding my entire workflow? Can I understand what my operating system is doing? Can I delete an account without thirty-seven emails? Can I choose convenience today without making that choice irreversible tomorrow?

Those questions are much more useful to me than asking whether a product is simply "private" or "not private."

The first post in this series was about realizing how difficult it can be to reclaim data once it has spread across dozens or hundreds of services. The second was about the curiosity that made me question the defaults underneath those relationships. This third part is the practical consequence of both: **build the map, secure the foundations, reduce the dependencies that no longer make sense, and keep an exit path open for the ones you choose to keep.**

That is probably the closest thing I have to a "privacy pack."

Not a perfect stack. Not a purity test. Just a process for making the defaults a little less default.

---

## Notes & References

Below is a list of references so you can scan everything in one place.

<ol>
  <li id="note-1">
    <strong>The Rabbit Hole Starts With One Question</strong><br />
    Velitchko Filipov<br />
    <a href="https://velitchko.github.io/blog/rabbit-hole-2026" target="_blank" rel="noopener noreferrer">https://velitchko.github.io/blog/rabbit-hole-2026</a><br />
    The second post in this series, covering the questions around Windows, Linux, GrapheneOS, defaults, inspectability, and digital sovereignty that led into this practical workflow.
  </li>

  <li id="note-2">
    <strong>Sherlock Project</strong><br />
    Sherlock Project contributors<br />
    <a href="https://github.com/sherlock-project/sherlock" target="_blank" rel="noopener noreferrer">https://github.com/sherlock-project/sherlock</a><br />
    An open-source username-search tool that checks for matching public profiles across many online services. Useful for discovery, but matches should always be verified manually.
  </li>

  <li id="note-3">
    <strong>Have I Been Pwned</strong><br />
    Troy Hunt<br />
    <a href="https://haveibeenpwned.com/" target="_blank" rel="noopener noreferrer">https://haveibeenpwned.com/</a><br />
    A breach-notification and lookup service that can reveal whether an email address appears in known data breaches.
  </li>

  <li id="note-4">
    <strong>Google Takeout</strong><br />
    Google<br />
    <a href="https://takeout.google.com/" target="_blank" rel="noopener noreferrer">https://takeout.google.com/</a><br />
    Google's export mechanism for downloading data from a Google Account. Gmail exports can be used locally as a historical source for discovering account registrations and service relationships.
  </li>

  <li id="note-5">
    <strong>Export login data from Firefox</strong><br />
    Mozilla Support<br />
    <a href="https://support.mozilla.org/" target="_blank" rel="noopener noreferrer">https://support.mozilla.org/</a><br />
    Firefox can export saved logins to CSV. The export contains readable passwords and should therefore be treated as highly sensitive and deleted securely after use.
  </li>

  <li id="note-6">
    <strong>Google Account – Third-party connections</strong><br />
    Google<br />
    <a href="https://myaccount.google.com/connections" target="_blank" rel="noopener noreferrer">https://myaccount.google.com/connections</a><br />
    Shows applications and services connected to a Google Account, including Sign in with Google relationships and third-party access.
  </li>

  <li id="note-7">
    <strong>GrapheneOS</strong><br />
    GrapheneOS Project<br />
    <a href="https://grapheneos.org/" target="_blank" rel="noopener noreferrer">https://grapheneos.org/</a><br />
    A security- and privacy-focused Android-based operating system with a strong sandboxing model and support for installing Google Play as ordinary sandboxed applications.
  </li>

  <li id="note-8">
    <strong>Privacy Guides</strong><br />
    Privacy Guides<br />
    <a href="https://www.privacyguides.org/" target="_blank" rel="noopener noreferrer">https://www.privacyguides.org/</a><br />
    A curated collection of privacy-oriented recommendations for browsers, operating systems, communication, DNS, authentication, storage, and other parts of a modern software stack.
  </li>

  <li id="note-9">
    <strong>F-Droid</strong><br />
    F-Droid Project<br />
    <a href="https://f-droid.org/" target="_blank" rel="noopener noreferrer">https://f-droid.org/</a><br />
    A repository and distribution ecosystem for free and open-source Android applications.
  </li>

  <li id="note-10">
    <strong>Awesome Privacy</strong><br />
    Community-maintained resource<br />
    <a href="https://github.com/pluja/awesome-privacy" target="_blank" rel="noopener noreferrer">https://github.com/pluja/awesome-privacy</a><br />
    A broad community-curated collection of privacy-respecting alternatives and self-hostable tools. Individual projects should still be evaluated on their own merits.
  </li>

  <li id="note-11">
    <strong>JustDeleteMe</strong><br />
    Community project<br />
    <a href="https://justdeleteme.xyz/" target="_blank" rel="noopener noreferrer">https://justdeleteme.xyz/</a><br />
    A directory of direct account-deletion links and information about how difficult different services make account deletion.
  </li>

  <li id="note-12">
    <strong>Your Digital Rights</strong><br />
    noyb – European Center for Digital Rights<br />
    <a href="https://yourdigitalrights.org/" target="_blank" rel="noopener noreferrer">https://yourdigitalrights.org/</a><br />
    A practical service for generating privacy and data-erasure requests to companies, including GDPR requests for European users.
  </li>

  <li id="note-13">
    <strong>Article 17 GDPR – Right to Erasure</strong><br />
    European Union / GDPR.eu<br />
    <a href="https://gdpr.eu/article-17-right-to-be-forgotten/" target="_blank" rel="noopener noreferrer">https://gdpr.eu/article-17-right-to-be-forgotten/</a><br />
    The legal basis behind many of the deletion requests described in this workflow. Article 17 gives data subjects a right to request erasure in applicable circumstances, subject to a number of exceptions.
  </li>

  <li id="note-14">
    <strong>Article 12 GDPR – Transparent Information and Exercise of Data-Subject Rights</strong><br />
    European Union / GDPR.eu<br />
    <a href="https://gdpr.eu/article-12-how-to-exercise-the-rights-of-the-data-subject/" target="_blank" rel="noopener noreferrer">https://gdpr.eu/article-12-how-to-exercise-the-rights-of-the-data-subject/</a><br />
    Covers how controllers must facilitate data-subject rights and the general one-month timeframe for responding to requests.
  </li>
</ol>

---

## How to Use This Post

### Share Your Experience

Feel free to:

- **Quote sections** that resonate with you.
- **Share your own audit workflow** or tools that helped you rediscover forgotten accounts.
- **Recommend privacy-preserving software** that has worked well for you.
- **Share on social media** with `#Privacy #DigitalSovereignty #OSINT #OpenSource #GrapheneOS #SelfHosting`.
- **Write your own response**—I would genuinely like to see how other people approach the same problem.

### Talk About It!

**Discussion**  
If you have gone through a similar process, I am particularly interested in the parts that turned out to be unexpectedly difficult.

- How many accounts did you discover that you had completely forgotten about?
- Which identity provider turned out to be the biggest dependency in your setup?
- Have you ever exported your mailbox or password-manager history to reconstruct your digital footprint?
- Which account was the most painful to delete?
- Where do you draw the line between privacy, convenience, and the operational cost of self-hosting?
- Which large ecosystem would be hardest for you to reduce your dependence on?
- What would your own "privacy pack" contain?
