---
title: "Nobody Acts Unprompted"
subtitle: "Agency, prompts, and the strange habit of treating human action as if it comes from nowhere."
date: "2026-08-11"
author: "Velitchko Filipov"
hashtags:
  - Artificial Intelligence
  - Human-AI Collaboration
  - Agency
categories:
  - Reflection
  - Artificial Intelligence
  - HCI
excerpt: "LLMs are often said to lack agency because they wait for prompts. But humans also act in response to internal states, external events, habits, obligations, and environments. The interesting question is not whether action is prompted, but what kinds of prompts a system can perceive, carry forward, and act on."
featured: false
---

# Nobody Acts Unprompted

![Nobody Acts Unprompted](/blog/agency.png)


There is a familiar objection to calling LLM systems agentic.

They do not act unless prompted.

Fair enough. Most models sit there until something asks them to continue, answer, summarize, plan, classify, write, inspect, or call a tool. Left alone, they do not wake up in the morning, remember an unfinished argument, check whether the coffee machine is lying again, and decide to revise a paper.

That seems like a clean distinction.

Until you look at people.

---

Picture an agentic coding tool, something like Claude Code or GitHub Copilot's coding agent, sitting in a terminal tab, doing nothing in particular.

No restless cursor, no little "thinking" spinner running on its own time. It will sit there for hours if you let it, and nothing about that looks like agency to anyone watching.

Then a dependency bump breaks a build three repositories over, a CI job fails, a webhook fires, and ninety seconds later the agent has opened a draft pull request: a proposed fix, a short explanation of what broke, and a note asking a human to review before merging.

Nobody typed a sentence into a chat box to start that. Nobody was even awake. The "prompt," in the loose sense that actually matters here, was a webhook payload and a line in a config file somebody wrote two months earlier and probably forgot about.

Was that unprompted? Almost nobody would call it agentic in the philosophically loaded sense, and I wouldn't either.

But it's not nothing. Something happened out in the world, the system registered it, and it acted on it in a way its designer could anticipate in general but not script for the specific case.

Hold onto that scene. We'll come back to it.

---

## The Prompt Is Not Always a Text Box

Humans also act in response to things.

Hunger. A deadline. A notification. A memory. A half-formed worry. Someone looking confused in a meeting. A sentence that suddenly sounds wrong. The physical irritation of a room being too warm. A calendar reminder. A reviewer comment. The recurring guilt of an unfinished task sitting in the same corner of your mind for three weeks.

None of this feels like being prompted, because the prompt does not arrive as a clean instruction in a chat box.

But functionally, something happens inside or around us, and action follows.

We have more input formats. That is the obvious difference. We receive language, images, sound, bodily signals, social cues, habits, emotional states, environmental friction, and long-running commitments. We also maintain some continuity across them. We can be annoyed by an email, remember a promise from yesterday, notice a loose thread in an argument, and decide that now is the moment to deal with it.

That does not make human action unprompted.

It makes the prompting system richer, noisier, more continuous, and much harder to inspect.

---

## Agency Is Not the Absence of Triggers

If agency means acting without any cause, then almost nothing has agency.

That is not how we usually use the word. We do not think a person lacks agency because they responded to pain, curiosity, obligation, or a question. We do not think a researcher lacks agency because a deadline made them finish the abstract. Dennett made roughly this point about free will in general: the worry that being caused to act undermines freedom mostly rests on confused imagery, not a real argument.<sup>[1](#note-1)</sup> Having a cause is not the opposite of being an agent. It's closer to the precondition for being one.

The trigger matters, but it does not exhaust the action.

Agency lives somewhere else.

It lives in how a system interprets a situation, which signals it can perceive, what it can remember, what alternatives it can compare, which goals it can maintain, which actions it can take, and how accountable those actions are to the surrounding world. Floridi and Sanders tried to make something like this precise for artificial agents specifically, proposing that a system counts as an agent to the degree it is interactive (it responds to its environment), autonomous (it can change its own state without a dedicated external trigger for every single change), and adaptive (its behavior can improve based on what happened before).<sup>[2](#note-2)</sup> Notice what's missing from that list: "acts without being prompted." Their criteria ask for something closer to *does something non-trivial with what it receives*.

That is also where the current confusion around AI agents becomes more interesting.

The weak version of the argument is: "LLMs are not agents because they need prompts."

The stronger version is: "Current LLM systems have narrow, externally managed channels for receiving prompts, maintaining goals, sensing the world, and acting back on it."

That second version is harder to fit into a tweet, unfortunately. A recurring tragedy.

---

## The HCI Question

From an HCI perspective, this matters because agency is distributed across more than the model.

It is distributed across the interface, the runtime, the user, the task, and the environment in which the system can act. A model inside a chat box has one kind of agency. A model connected to a calendar, codebase, browser, robot arm, visual analytics workspace, or email account has another. The difference is not that the model suddenly developed a soul between API calls. The difference is that the system now has more ways to perceive state, maintain context, and perform actions.

This isn't a new observation outside of AI, either. Hollan, Hutchins, and Kirsh argued that cognition itself is routinely distributed across people, artifacts, and the environment rather than sitting neatly inside one head, which is most of the reason HCI exists as a field in the first place.<sup>[3](#note-3)</sup> Treat agency the same way, and "does the model have agency" starts to look like the wrong grain of analysis. The more useful question is where in the system the deciding, remembering, and initiating are actually happening, and whether that distribution is visible to the people who have to live with the outcome.

Horvitz's older work on mixed-initiative interfaces is the closest thing HCI has to a design vocabulary for this.<sup>[4](#note-4)</sup> His framing was never "should the system or the human be in control." It was about when the system should take initiative, how confident it should be before doing so, and how to make that handoff legible rather than jarring. Swap "dialog box" for "autonomous coding agent" and the questions barely change.

You can see the same model behave like two different kinds of agent depending entirely on what it's wired to. A chat-only assistant can tell you your calendar looks overloaded on Thursday and suggest moving a meeting. That's advice; you still have to go do it. The same model wired directly to the calendar API, with permission to act and a rule about what needs confirmation first, can just move the meeting and tell you afterward. Nothing changed about the model's weights between those two cases. What changed is how much of the loop — perceiving the conflict, deciding what to do about it, and acting on the world — got handed to it versus kept with the interface, the permissions layer, and the person who configured both.

This is why the word "agent" often feels slippery.

Sometimes it refers to the model.
Sometimes it refers to the software wrapper.
Sometimes it refers to the whole sociotechnical arrangement: model, tools, permissions, memory, triggers, logs, policies, user expectations, and failure modes.

Those distinctions matter.

If we say "the agent decided," we may be hiding a lot of design work: who configured the trigger, what state was visible, which tools were available, what permissions were granted, which memories were retained, which actions were reversible, and who remained accountable.

In other words, agency is partly an interface design problem.

Very annoying for everyone hoping it would be solved by naming a class `Agent`.

---

## Humans Are Also Configured

There is another uncomfortable symmetry here.

Humans do not arrive as pure sources of intention either. We are configured by routines, institutions, incentives, habits, interfaces, norms, deadlines, and other people. Academic work makes this painfully visible. A conference deadline changes what gets written. A template changes what gets emphasized. A review form changes what reviewers notice. A grant call changes what becomes legible as a research contribution.

Suchman spent a career arguing more or less this point about human-machine interaction: people don't execute plans the way a program executes instructions, they improvise moment to moment against a concrete situation, using plans as a resource rather than a script.<sup>[5](#note-5)</sup> The plan looks like the cause of the action from a distance. Up close, it's one input among several, filtered through a situation nobody fully specified in advance.

We still treat researchers as agents.

Not because they act outside all structure, but because they can interpret those structures, resist some of them, work around others, and remain responsible for choices made within them.

This is where the human comparison is useful, but also where it should stop.

The point is not that LLMs are secretly just like us. They are not. They do not have bodies, lived histories, social obligations, self-preservation, embarrassment, boredom, or the particular horror of realizing you agreed to review something during a weak moment.

The point is that "being prompted" is not the decisive difference.

The decisive questions are about the prompt ecology: what kinds of signals exist, how they are interpreted, what persists across time, what actions are possible, and how those actions can be questioned afterward.

---

## Prompted Systems Can Still Initiate

A system can be prompted and still initiate action.

This is already true in boring software. A calendar reminder prompts a notification. A test failure prompts a CI system to block a merge. A temperature sensor prompts a thermostat. These are not rich forms of agency, but they show that "reactive" and "passive" are not the same thing.

Remember the coding agent from the start of this post. Nobody sat there supervising it in real time. The chain that actually produced the pull request was: a human wrote a webhook config weeks earlier, a dependency maintainer pushed a breaking change somewhere else entirely, a CI job failed on schedule, and the agent picked up the failure, diagnosed it against a repository it already had read access to, and acted. Every individual link in that chain is boring and well understood. The thing that's new is that one of the links is a model deciding, within some bounded scope, what the fix should look like and whether it was confident enough to propose one.

With LLM systems, the question becomes more subtle than "it was triggered."

An agent might act after a user request, after a timer, after a file changes, after a metric crosses a threshold, after another agent reports uncertainty, or after a workspace event suggests that the user is stuck. Each of these is a prompt in the broad sense. But each also changes the design problem.

Who asked for the action?
Was the trigger visible?
Could the system explain why it acted?
Was the action reversible?
Could the user interrupt it?
Did the system have enough context to act responsibly?

This is where agency becomes less metaphysical and more practical.

It becomes a question of invocation, permission, visibility, memory, and accountability. Andreas has made a version of this argument from the language side: LLMs are trained on text produced by agents pursuing goals, which means a lot of what looks like "the model deciding something" is really the model inferring what an agent in this situation would plausibly do or say next.<sup>[6](#note-6)</sup> That's not nothing, and it's also not the same as the model having its own standing goals the way a person or an institution does. It's agency borrowed from the text, applied to a live situation, through a scaffold a human built.

---

## A Better Question

So I do not think the interesting question is:

> Do AI systems act unprompted?

Almost nothing interesting acts unprompted.

The better question is:

> What counts as a prompt, who gets to configure it, and what can happen after it fires?

That question moves the discussion from vague claims about agency into things we can actually study and design.

Which signals should an agent observe?
Which actions should require confirmation?
Which state should remain visible to the user?
Which memories should persist?
Which interventions should be logged?
Which failures should stop the system immediately?
Which forms of initiative are helpful, and which are just interruption with a nicer name?

This is where HCI has something useful to say. Not because it can resolve agency as a philosophical category, but because it can study the conditions under which agency is assigned, experienced, constrained, trusted, rejected, or repaired in actual interaction.

There's also a sharper, less comfortable question underneath all of this, and it's close to the one Matthias raised about autonomous systems more generally: once a system's behavior is genuinely hard to predict from its own design, which is true of learning systems almost by definition, who is actually responsible when it does something wrong?<sup>[7](#note-7)</sup> Not "was it prompted," but "who configured the conditions under which it could act, and did they have enough visibility to be answerable for that." That gap doesn't close just because we can point to the webhook that started the chain.

The model does not act from nowhere.

Neither do we.

The difference is not whether there is a prompt. The difference is what the system can do with one.

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
