---
title: "Nobody Acts Unprompted"
subtitle: "Agency, prompts, and the strange habit of treating human action as if it comes from nowhere."
date: "2026-10-02"
author: "Velitchko Filipov"
hashtags:
  - Artificial Intelligence
  - Human-AI Collaboration
  - Agency
categories:
  - Reflection
  - Artificial Intelligence
  - HCI
excerpt: "People increasingly call AI systems 'agents' and mean something close to autonomous and self-directed, able to solve anything, nearly AGI, without ever pinning down what 'agent' or 'agency' actually means. But humans aren't unconditioned sources of action either. The interesting question isn't whether something is truly autonomous, but what kinds of prompts a system can perceive, carry forward, and act on."
featured: false
---

# Nobody Acts Unprompted

![Nobody Acts Unprompted](/blog/agency.png)


People keep telling me these agents are autonomous — that they'll figure anything out, solve any problem, that we've basically built AGI. So I ask them: what do you actually mean by "agent" or "agency"? <mark>The definition gets fuzzy fast.</mark>

Here's the simplest problem with it: most models sit there until something asks them to continue, answer, summarize, plan, classify, write, inspect, or call a tool. Left alone, they do not wake up in the morning, remember an unfinished argument, wonder if they left the stove on, and decide to revise a paper.

That might look like a clean rebuttal to the autonomy claim — no spontaneous initiative, no AGI, case closed — right up until you look at people.

---

Picture an agentic coding tool, something like Claude Code or GitHub Copilot's coding agent, sitting in a terminal tab, doing nothing in particular.

No restless cursor, no little "thinking" spinner running on its own time. It will sit there for hours if you let it, and nothing about that looks like agency to anyone watching.

Then, somewhere else entirely, a routine dependency bump — some point release of a logging library nobody remembers choosing — breaks a build three repositories downstream. The next CI run fails. That failure fires a webhook. Ninety seconds later, the agent has read the failing log, traced it back to the breaking change, and opened a draft pull request: a proposed fix, a short explanation of what broke and why, and a note asking a human to review before merging.

Nobody typed a sentence into a chat box to start that. Nobody was even awake. The "prompt" here was a webhook payload, arriving because of a line in a config file somebody wrote two months earlier and probably forgot about.

Was that unprompted? Almost nobody would call it agentic in the philosophically loaded sense, and neither would I. But it's not nothing: something happened out in the world, the system registered it, and it acted on it in a way its designer could anticipate in general but never script for the specific case.

---

## The Prompt Is Not Always a Text Box

Humans also act in response to things.

Hunger. A deadline. A notification. A memory. A half-formed worry. Someone looking confused in a meeting. A sentence that suddenly sounds wrong. The physical irritation of a room being too warm. A calendar reminder. A reviewer comment. The recurring guilt of an unfinished task sitting in the same corner of your mind for three weeks.

None of this feels like being prompted, because the prompt does not arrive as a clean instruction in a chat box.

But functionally, something happens inside or around us, and action follows.

We have more input formats. That is the obvious difference. We receive language, images, sound, bodily signals, social cues, habits, emotional states, environmental friction, and long-running commitments. We also maintain some continuity across them. We can be annoyed by an email, remember a promise from yesterday, notice a loose thread in an argument, and decide that now is the moment to deal with it.

That does not make human action unprompted — it just makes what prompts us richer, noisier, more continuous, and much harder to inspect.

---

## Agency Is Not the Absence of Triggers

If agency means acting without any cause, then almost nothing has agency.

That is not how we usually use the word. We do not think a person lacks agency because they responded to pain, curiosity, obligation, or a question. We do not think a researcher lacks agency because a deadline made them finish the abstract. Dennett<sup>[1](#note-1)</sup> made roughly this point about free will in general: the worry that being caused to act undermines freedom mostly rests on confused imagery, not a real argument. <mark>Having a cause is not the opposite of being an agent.</mark> It's closer to the precondition for being one.

The trigger matters, but it's not the whole story. Agency is in how a system interprets a situation, which signals it can perceive, what it can remember, what alternatives it can compare, which goals it can maintain, which actions it can take, and how accountable those actions are to the surrounding world. Floridi and Sanders<sup>[2](#note-2)</sup> tried to make something like this precise for artificial agents specifically, proposing that a system counts as an agent to the degree it is **interactive** (it responds to its environment), **autonomous** (it can change its own state without a dedicated external trigger for every single change), and **adaptive** (its behavior can improve based on what happened before). Nowhere on that list is "acts without being prompted." Their criteria ask for something closer to *does something non-trivial with what it receives*.

That gap between the loose, hype-driven definition and a criteria-based one is the real disagreement. **The hype version** is: "these are agents, meaning autonomous, self-directed systems that can basically solve anything — we've built AGI." **The more careful version** is: "current LLM systems have narrow, externally managed channels for receiving prompts, maintaining goals, sensing the world, and acting back on it."

---

## The HCI Question

From an HCI perspective, agency is distributed across more than the model — across the interface, the runtime, the user, the task, and the environment in which the system can act. A model inside a chat box has one kind of agency. A model connected to a calendar, codebase, browser, robot arm, visual analytics workspace, or email account has another. The difference is not that the model suddenly developed a soul, but that it now has more ways to perceive state, maintain context, and perform actions.

This isn't a new observation outside of AI, either. Hollan, Hutchins, and Kirsh<sup>[3](#note-3)</sup> argued that cognition itself is routinely distributed across people, artifacts, and the environment rather than sitting neatly inside one head, which is most of the reason HCI exists as a field in the first place. Treat agency the same way, and "does the model have agency" starts to look like the wrong grain of analysis. The more useful question is where in the system the deciding, remembering, and initiating are actually happening, and whether that distribution is visible to the people who have to live with the outcome.

Horvitz's<sup>[4](#note-4)</sup> older work on mixed-initiative interfaces is the closest thing HCI has to a design vocabulary for this. His framing was never "should the system or the human be in control." It was about when the system should take initiative, how confident it should be before doing so, and how to make that handoff feel natural, not abrupt. The same questions apply just as well to an autonomous coding agent today as they did to a dialog box back then.

You can see the same model behave like two different kinds of agent depending entirely on what it's wired to. A chat-only assistant can tell you your calendar looks overloaded on Thursday and suggest moving a meeting. That's advice; you still have to go do it. The same model wired directly to the calendar API, with permission to act and a rule about what needs confirmation first, can just move the meeting and tell you afterward. Nothing changed about the model's weights between those two cases. What changed is how much of the loop — perceiving the conflict, deciding what to do about it, and acting on the world — got handed to it versus kept with the interface, the permissions layer, and the person who configured both.

That's part of why the word "agent" feels slippery: sometimes it refers to the model, sometimes to the software wrapper, and sometimes to the whole sociotechnical arrangement — model, tools, permissions, memory, triggers, logs, policies, user expectations, and failure modes, none of which gets any tidier just because someone named a class `Agent`. If we say "the agent decided," we may be hiding a lot of design work: who configured the trigger, what state was visible, which tools were available, what permissions were granted, which memories were retained, which actions were reversible, and who remained accountable. <mark>Agency, it turns out, is partly an interface design problem.</mark>

---

## Humans Are Also Configured

On the other side of things, humans don't arrive as pure sources of intention either. We're configured by routines, institutions, incentives, habits, interfaces, norms, deadlines, and other people. In academic life this shows up constantly — a grant call quietly decides what even counts as a real research contribution.

Suchman<sup>[5](#note-5)</sup> spent a career arguing more or less this point about human-machine interaction: people don't execute plans the way a program executes instructions, they improvise moment to moment against a concrete situation, using plans as a resource rather than a script. The plan looks like the cause of the action from a distance. Up close, it's just one input among several.

We still treat researchers as agents, not because they act outside all structure, but because they can interpret those structures, resist some of them, work around others, and remain responsible for choices made within them.

LLMs aren't secretly just like us, and the comparison only stretches so far: they don't have bodies, lived histories, social obligations, self-preservation, embarrassment, boredom, or the particular horror of realizing you agreed to review something during a weak moment. "Being prompted" isn't the decisive difference between us. What actually matters is simpler: what signals exist, how they're interpreted, what persists over time, what actions are possible, and how those actions can be questioned afterward.

---

## Prompted Systems Can Still Initiate

A system can be prompted and still initiate action.

Plenty of everyday software already works this way — a failing test can prompt a CI pipeline to block a merge without anyone watching it happen. That's not a rich form of agency, but it shows that "reactive" and "passive" aren't the same thing.

Remember the coding agent from the start of this post. Nobody sat there supervising it in real time. What actually produced that pull request was a longer, genuinely non-trivial chain: a human had set up a webhook weeks earlier, a dependency maintainer pushed a breaking change in an unrelated repository, a CI job failed on schedule, and the agent picked up that failure, read the diff, worked out which change caused it, and judged itself confident enough to propose a fix. <mark>What's new isn't the chain — it's that one of the links in it is a model making that last call.</mark>

With LLM systems, the question becomes more subtle than "it was triggered."

An agent might act after a user request, after a timer, after a file changes, after a metric crosses a threshold, after another agent reports uncertainty, or after a workspace event suggests that the user is stuck. Each of these is a prompt in the broad sense. But each also changes the design problem.

Who asked for the action?
Was the trigger visible?
Could the system explain why it acted?
Was the action reversible?
Could the user interrupt it?
Did the system have enough context to act responsibly?

That's where agency stops being metaphysical and turns into a question of **invocation, permission, visibility, memory, and accountability**. Andreas<sup>[6](#note-6)</sup> has made a version of this argument from the language side: LLMs are trained on text produced by agents pursuing goals, which means a lot of what looks like "the model deciding something" is really the model inferring what an agent in this situation would plausibly do or say next. That's a real effect, but it is not the same as the model having its own standing goals the way a person or an institution does. It's closer to pattern-matching on what an agent in this position would plausibly do next, running inside permissions and tools that a human configured and can still inspect.

---

## A Better Question

So I do not think the interesting question is:

> Do AI systems act unprompted?

Almost nothing interesting acts unprompted.

The better question is:

> What counts as a prompt, who gets to configure it, and what can happen after it fires?

Unlike vague claims about agency, that's something we can actually study and design for.

Which signals should an agent observe?
Which actions should require confirmation?
Which state should remain visible to the user?
Which memories should persist?
Which interventions should be logged?
Which failures should stop the system immediately?
Which forms of initiative are helpful, and which are just interruption with a nicer name?

HCI has something useful to say here, not because it can resolve agency as a philosophical category, but because it can study the conditions under which agency is assigned, experienced, constrained, trusted, rejected, or repaired in actual interaction.

There's a sharper, less comfortable question here too — one the philosopher Andreas Matthias raised about autonomous systems in general<sup>[7](#note-7)</sup>: once a system's behavior is genuinely hard to predict from its own design, which is true of learning systems almost by definition, who is actually responsible when it does something wrong? Not "was it prompted," but "who configured the conditions under which it could act, and did they have enough visibility to be answerable for that."

<mark>Neither the model nor we act from nowhere.</mark> The difference was never whether something prompted the action — it's what the system can do once it has one: what it can perceive, remember, decide on, and reach back out and touch.

---

That coding agent is still sitting in its terminal tab somewhere, waiting for the next CI failure. Whoever configured its triggers and its permissions made a hundred small design decisions nobody will ever see on the resulting pull request: what it's allowed to touch, what it has to ask about first, what gets logged, what gets reverted if it's wrong.

I'd be curious what that looks like on your end. If you're running anything with standing triggers right now — agentic coding tools, scheduled research assistants, whatever — what's the thing you had to think hardest about before you let it act without you watching?

---

## Notes & References

Below is a list of references so you can scan everything in one place.

<ol>
  <li id="note-1">
    <strong>Elbow Room</strong> — <em>The Varieties of Free Will Worth Wanting</em><br />
    Dennett, D. C. (1984). MIT Press.<br />
    <a href="https://mitpress.mit.edu/9780262540421/elbow-room/" target="_blank" rel="noopener noreferrer">https://mitpress.mit.edu/9780262540421/elbow-room/</a><br />
    Extended: Argues that the intuition "being caused to act undermines freedom" rests on confused imagery rather than a sound argument, and that having a cause is compatible with, rather than opposed to, being a responsible agent.
  </li>
  <li id="note-2">
    <strong>On the Morality of Artificial Agents</strong><br />
    Floridi, L. & Sanders, J. W. (2004). Minds and Machines, 14(3), 349–379.<br />
    <a href="https://doi.org/10.1023/B:MIND.0000035461.63578.9d" target="_blank" rel="noopener noreferrer">https://doi.org/10.1023/B:MIND.0000035461.63578.9d</a><br />
    Extended: Proposes a criteria-based account of agency for artificial systems, built on interactivity, autonomy, and adaptability, rather than on whether the system was triggered by an external input.
  </li>
  <li id="note-3">
    <strong>Distributed Cognition</strong> — <em>Toward a New Foundation for Human-Computer Interaction Research</em><br />
    Hollan, J., Hutchins, E. & Kirsh, D. (2000). ACM Transactions on Computer-Human Interaction, 7(2), 174–196.<br />
    <a href="https://doi.org/10.1145/353485.353487" target="_blank" rel="noopener noreferrer">https://doi.org/10.1145/353485.353487</a><br />
    Extended: Argues that cognitive processes are routinely distributed across people, artifacts, and the environment rather than contained within a single mind — a framing this post borrows to talk about distributed agency instead.
  </li>
  <li id="note-4">
    <strong>Principles of Mixed-Initiative User Interfaces</strong><br />
    Horvitz, E. (1999). Proceedings of CHI 1999, 159–166.<br />
    <a href="https://doi.org/10.1145/302979.303030" target="_blank" rel="noopener noreferrer">https://doi.org/10.1145/302979.303030</a><br />
    Extended: Lays out design principles for interfaces where control over initiating an action is shared and negotiated between a human and a system, rather than fixed to one side.
  </li>
  <li id="note-5">
    <strong>Plans and Situated Actions</strong> — <em>The Problem of Human-Machine Communication</em><br />
    Suchman, L. (1987). Cambridge University Press.<br />
    <a href="https://books.google.com/books/about/Plans_and_Situated_Actions.html?id=AJ_eBJtHxmsC" target="_blank" rel="noopener noreferrer">https://books.google.com/books/about/Plans_and_Situated_Actions.html?id=AJ_eBJtHxmsC</a><br />
    Extended: Argues that human action is improvised against a concrete situation using plans as a loose resource, not executed the way a program executes a script — challenging the assumption that a plan or instruction fully determines what happens next.
  </li>
  <li id="note-6">
    <strong>Language Models as Agent Models</strong><br />
    Andreas, J. (2022). Findings of the Association for Computational Linguistics: EMNLP 2022, 5769–5779.<br />
    <a href="https://doi.org/10.18653/v1/2022.findings-emnlp.423" target="_blank" rel="noopener noreferrer">https://doi.org/10.18653/v1/2022.findings-emnlp.423</a><br />
    Extended: Argues that language models trained on text produced by goal-directed agents end up representing something about the communicative intentions and beliefs behind that text, which shapes what look like the model's own decisions.
  </li>
  <li id="note-7">
    <strong>The Responsibility Gap</strong> — <em>Ascribing Responsibility for the Actions of Learning Automata</em><br />
    Matthias, A. (2004). Ethics and Information Technology, 6(3), 175–183.<br />
    <a href="https://doi.org/10.1007/s10676-004-3422-1" target="_blank" rel="noopener noreferrer">https://doi.org/10.1007/s10676-004-3422-1</a><br />
    Extended: Identifies a gap between who is causally responsible for a learning system's behavior and who can fairly be held accountable for it, once that behavior is no longer fully predictable from its original design.
  </li>
</ol>
