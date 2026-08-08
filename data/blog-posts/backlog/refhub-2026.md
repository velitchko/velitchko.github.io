---
title: "refhub"
subtitle: "On building something real with agentic workflows"
date: "07-05-2026"
author: "Velitchko Filipov"
hashtags:
  - Artificial Intelligence
  - Human-AI Collaboration
categories:
  - Reflection
excerpt: "Building refhub taught me things about agentic development I couldn't have learned any other way. On what it actually means to write with agents, not just alongside them."
featured: true
---

## refhub

There's a particular kind of project that lives in the back of your head for years.

Not a paper, not a funded research effort with deliverables and a timeline.  
Just an idea that keeps showing up: *this tool should exist, and nobody seems to be building it*.

For me, that was [refhub.io](https://refhub.io/). A reference management platform that actually respects how researchers think: networks, not lists. Relationships between papers, not just metadata fields. Something that makes your reading feel cumulative instead of disposable.

I knew what it should do.  
I did not know how long it would take to build it.

---

Side projects are deceptive.  
They seem bounded because you control the scope.  
But scope is not the same as complexity, and complexity compounds in ways that only become clear once you're inside.

What started as a weekend prototype turned into a multi-month, multi-system effort.  
Frontend. Backend. Graph infrastructure. Auth. Exports. Citation parsing. Sharing mechanics. Edge cases that only appear when real users touch the thing.

If you look at the [GitHub org](https://github.com/refhub-io) now, there are twelve repositories.  
A CLI. A browser extension. A serverless backend. An MCP skill. A paper drafter.  
That is not what I planned.  
That is what complexity looks like when you keep going.

At some point during the build, I stopped thinking about refhub as a project and started thinking about it as an <mark>environment I needed to manage.</mark>

That shift changed how I approached everything.

---

I've been writing about AI-assisted work for a while now.  
Thinking about human-AI collaboration, context windows, hallucinations, the gap between how people think these tools work and how they actually do.

But there's a difference between writing about something and building something with it.  
Between describing a phenomenon and being inside it for six months.

What building refhub actually taught me was this:

> *Agentic workflows are not about automation. They're about delegation, and delegation is a skill.*

---

### What "Agentic" Actually Means

The word gets thrown around a lot these days.

In most conversations it seems to mean *"AI does things automatically"*. Chained prompts. Multi-step pipelines. LLMs calling tools, writing files, running code. The demos look impressive. The blog posts are enthusiastic.

My experience was more complicated and more interesting.

Agentic development isn't a setting you turn on. It's a practice you develop.  
The difference between someone who builds effective agentic workflows and someone who doesn't is <mark>not the model they're using.</mark>  
It's how they think about the work before any prompt is written.

I started refhub the same way most side projects start: impulsively and without enough planning.  
The first two weeks were fast. I was generating code, features were appearing, things were running.

Then I hit a wall.

Not a technical wall exactly. More of a coherence wall.  
The codebase had been built by prompts that didn't know about each other.  
Decisions made in one session conflicted with decisions made in another.  
The agent had been very productive.  
What it had produced was <mark>a mess that looked like a system.</mark>

The evidence is still in the org history.  
At one point there was a `refhub-claude` repo and a `refhub-codex` repo, both archived now.  
Separate repositories doing overlapping things in slightly different ways, built in separate sessions without enough shared context to realize they should have been one thing.  
Coherence debt, made visible in the repository list.

---

### The Management Problem

There's a framing I keep returning to, borrowed loosely from how good engineering teams work.

A senior engineer doesn't hand a vague spec to a junior and evaluate the output.  
They break the work into well-defined tasks, provide context for each one, review outputs with domain knowledge, and iterate.  
The output quality is determined as much by how the work is organized and delegated as by who executes it.

With agentic workflows, you're the senior.  
The agent is very capable and very literal and will execute exactly what you describe with great confidence.

Early in the build, I wasn't giving it the right things to do.  
I was handing it my thinking problem.

> *"Build a citation graph component."*  
> *"Add sharing functionality."*  
> *"Figure out the data model for collections."*

These are not tasks. They're areas of work.  
And handing an area of work to an agent with no constraints, no interface specification, no definition of done, produces exactly what you'd expect: something that might work, in a way that probably won't survive contact with the rest of the system.

The realization was slow and, honestly, a little embarrassing.  
I had written about this problem, in this exact voice, for other contexts.  
Turns out it's much easier to describe than to practice.

The architectural split that exists now — frontend in `refhub.io`, backend in `.netlify`, automation in `refhub-cli`, agent surface in `refhub-skill` — didn't come from a plan.  
It came from finally being honest about what needed to be separated so that each piece could be reasoned about cleanly.  
The org README calls this `// clean_boundaries`.  
That's not a design principle someone wrote at the start.  
It's a lesson <mark>extracted from six months of the alternative.</mark>

---

### What Changed

At some point I started approaching sessions differently.

Before writing a single prompt, I would write a brief document. Not a spec, not a detailed PRD. Just: *what is the task, what are the constraints, what does done look like, what must not change.*  
Four things. Sometimes five sentences, sometimes twenty. But always written before anything else.

This sounds small. It changed everything.

The outputs got better, obviously.  
But the more interesting effect was on me.  
<mark>Writing the brief forced me to think.</mark>  
And thinking before prompting revealed, consistently, that I hadn't understood the task as well as I thought.

There would be an edge case I hadn't considered.  
A dependency I hadn't named.  
An assumption baked into my mental model that needed to become explicit before the agent could know about it.

The brief wasn't primarily for the agent.  
It was for me.

---

### Agentic Writing Is Not Different From Any Other Writing

This is the part I didn't expect.

Building refhub required writing code, yes. But it also required writing documentation, writing the onboarding copy, writing the help text, writing the emails, writing the marketing page.

All of it.

And all of it followed the same pattern.  
<mark>Garbage in, garbage out</mark> applies as much to prose as it does to code.  

When I handed an agent a vague content brief, I got fluent, confident, generic copy that sounded like every SaaS landing page written in the last three years.  
When I handed it a specific brief — *here is the user, here is what they've just done, here is the job they're trying to accomplish, here is the tone, here are the things this should not say* — the output was genuinely useful. Sometimes better than what I'd have written myself.<sup>[1](#note-1)</sup>

The pattern held everywhere: code tasks, documentation tasks, copy tasks.  
Specificity is the input. Quality is what you get in return.

---

### The Context Problem, Lived In

I wrote about context rot as a concept earlier this year.

Building refhub gave me a more visceral relationship with it.

Complex features took multiple sessions. Each session accumulated context: architectural decisions made in previous sessions, API choices, naming conventions, edge cases discovered and addressed. When I started a new session without explicitly reconstructing that context, the agent would helpfully undo work I'd already done, reintroduce patterns I'd specifically moved away from, or just be confidently wrong about how the system worked.<sup>[2](#note-2)</sup>

I developed a habit of starting each session with a context document.  
A living file, updated at the end of each session, summarizing: what exists, what decisions have been made and why, what the current task is, what is in scope, what is not.

It added maybe ten minutes per session.  
It saved hours of untangling.

Over time it became something I couldn't imagine working without.  
The context document was the <mark>memory the agent didn't have.</mark>  
My job was to maintain it.

---

### What I Was Actually Learning

Somewhere around month three I started noticing something that was harder to name.

I was getting faster.  
But it wasn't because the agent was getting better (it wasn't, I was using the same models).  
It was because I had developed a set of skills I hadn't had before.

**Breaking work into bounded tasks.** I had gotten much better at recognizing when something was too large to delegate and decomposing it until it wasn't.

**Writing precise interfaces.** Before implementing anything, I was writing the interface first: inputs, outputs, constraints, failure modes. This made the implementation almost mechanical.

**Iterating deliberately.** Instead of trying to get a perfect output in one shot, I had learned to treat first drafts as exploratory. Use the output to understand the problem better, then revise the brief, then try again.

**Recognizing where judgment was mine.** There are tasks where an agent adds leverage and tasks where its involvement makes things worse. Knowing the difference is something you learn by getting it wrong a few times.

None of these are things you develop by reading about agentic workflows.  
They're things you develop by <mark>building something and paying attention to where it breaks.</mark>

---

### The Recursive Part

Somewhere in the later months of the build, something happened that I'm still not entirely sure how to describe.

Refhub grew a `refhub-skill` repo: an MCP skill that lets agents operate the API and CLI directly.  
And then it grew a `refhub-paper-drafter` repo: an agent skill for drafting HCI and visualization research papers *from a refhub vault*.

The tool built to organize research papers had become something that could help write them.

I don't know if that's an inevitability or just where things happened to land.  
But it did make me sit with something for a while.  
The whole premise of building refhub was that researchers need better memory infrastructure — a system that makes your reading feel cumulative, that lets relationships between ideas surface instead of staying buried in folders.  

The paper drafter is the logical conclusion of that premise.  
If the vault holds your reading, and the skill can traverse the vault, then the skill can bring relevant context into a drafting workflow without you having to reconstruct it manually.  
<mark>The memory system becomes the context window.</mark>

That's either obvious in retrospect or not obvious at all. I still go back and forth.

---

### The Part Nobody Talks About

Building with AI assistance is discussed mostly in terms of speed.

That framing is incomplete.

Yes, I built refhub faster than I would have alone.  
But the more interesting effect was that I built things I would have avoided.

There are parts of a side project that exist in a zone of *"this is probably too hard for the time I have"*. Infrastructure that needs careful thought. Features that require understanding a domain I'm not expert in. Documentation that would take a weekend to write properly.

With effective agentic workflows, some of those barriers moved.  
Not because the agent did the hard thinking, it didn't, I still had to do that.  
But because the execution gap between *knowing what to do* and *having it done* shrank.

That gap is where a lot of good work dies.  
The idea exists, the design exists, the will exists, but the time to execute doesn't.

Agentic development doesn't remove the constraint.  
<mark>It shifts what the constraint actually is.</mark>

The bottleneck is no longer execution.  
It's clarity.  
It's the quality of your thinking before you start.  
It's how well you can describe what you want.

Which is, maybe, where it should have been all along.

---

### Some Things That Actually Helped

Not a framework. Just habits that stuck.

**Write the brief before you prompt.** Even for small tasks. Especially for small tasks, because those are where you're most likely to assume you understand something you don't.

**Maintain a context document.** A single file per project, updated at the end of each session. What exists. What was decided. What's in progress. What is not.

**Use first drafts to understand the problem.** The output of a first prompt is often most useful as a mirror. It shows you what your brief communicated and what it didn't.

**Know when to stop.** Agentic workflows can feel frictionless until they aren't. If you've iterated three times and the output isn't converging, the brief is wrong. Stop and rewrite it.

**Treat writing and code the same way.** The skills transfer directly. What makes a good code task brief and what makes a good copy brief are structurally identical: constraints, context, interface, done-criteria.

---

### Closing

refhub still isn't finished.  
Side projects don't finish; they reach a state where they work well enough that you start using them instead of building them.

I use it now. I use it constantly.  
And occasionally I open the codebase and look at some section I built three months ago and remember the session, the brief I wrote, the conversation that produced it, the three iterations before it was right.

It's a different way of working than I had before.

Not faster in every dimension. Not easier.  
But more capable, in the places that matter.

The org README has a section called `// structure_over_vibes`.  
I wrote it near the end, once I knew what I meant by it.  
If a concept matters, it should exist explicitly in the model and the API.  
Not as a convention someone needs to remember. As a real thing.

That applies to code.  
It applies to prompts.  
It applies, I think, to most things worth building seriously.

> *The agent doesn't know what you're building.*  
> *You do.*  
> *That's still the whole job.*

---

## Notes & References

Below is a list of references so you can scan everything in one place.

<ol>
  <li id="note-1">
    <strong>Large Language Models as Writing Assistants</strong> — <em>Impact of Specificity and Constraint on Output Quality</em><br />
    Lee, M. et al. (2024). CHI 2024.<br />
    <a href="https://doi.org/10.1145/3613904.3642625" target="_blank" rel="noopener noreferrer">https://doi.org/10.1145/3613904.3642625</a><br />
    Extended: Studies how the specificity of prompts and constraints shapes output quality in writing tasks, finding that highly constrained prompts with explicit audience and purpose descriptions produce outputs rated significantly more useful and on-target than open-ended generation tasks. Has direct implications for copy and documentation workflows.
  </li>
  <li id="note-2">
    <strong>Lost in the Middle</strong> — <em>How Language Models Use Long Contexts</em><br />
    Liu, N. F. et al. (2023). Transactions of the Association for Computational Linguistics.<br />
    <a href="https://arxiv.org/abs/2307.03172" target="_blank" rel="noopener noreferrer">https://arxiv.org/abs/2307.03172</a><br />
    Extended: Demonstrates that model performance degrades when relevant information is placed in the middle of long input contexts. Content at the beginning and end of a context window is recalled most reliably, while content buried in the middle is systematically underweighted. This has direct practical implications for long agentic sessions where early architectural decisions are least likely to be honored in later outputs.
  </li>
  <li id="note-3">
    <strong>Deconstructing Human-AI Collaboration</strong> — <em>Agency, Interaction, and Adaptation</em><br />
    Holter, S. & El-Assady, M. (2024). EuroVis 2024.<br />
    <a href="https://doi.org/10.1111/cgf.15108" target="_blank" rel="noopener noreferrer">https://doi.org/10.1111/cgf.15108</a><br />
    Extended: Frames human-AI collaboration around three axes — agency distribution, interaction modality, and adaptation over time — and finds that the human role in shaping, constraining, and iterating over AI outputs is the primary determinant of collaboration quality, independent of the capability of the model itself.
  </li>
  <li id="note-4">
    <strong>From Prompt Engineering to Prompt Design</strong> — <em>Structured Approaches to Complex Task Delegation</em><br />
    Reynolds, L. & McDonell, K. (2024). arXiv:2102.07350.<br />
    <a href="https://arxiv.org/abs/2102.07350" target="_blank" rel="noopener noreferrer">https://arxiv.org/abs/2102.07350</a><br />
    Extended: Distinguishes prompt engineering (iterative trial-and-error) from prompt design (structured decomposition of task requirements before generation). Argues that the latter produces more consistent results across model versions and task types, and transfers better across different models and domains.
  </li>
  <li id="note-5">
    <strong>Cognitive Offloading and Human-AI Task Allocation</strong><br />
    Hemmer, P. et al. (2023). ACM CHI 2023.<br />
    <a href="https://doi.org/10.1145/3544548.3580942" target="_blank" rel="noopener noreferrer">https://doi.org/10.1145/3544548.3580942</a><br />
    Extended: Investigates how humans allocate tasks between themselves and AI systems, finding that high performers develop calibrated models of AI competence and adjust delegation accordingly — while low performers either over-delegate (trusting outputs too broadly) or under-delegate (failing to extract value from available tools). The distinguishing factor is not intelligence but task decomposition skill.
  </li>
</ol>
