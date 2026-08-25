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

There is a familiar objection to calling LLM systems agentic.

They do not act unless prompted.

Fair enough. Most models sit there until something asks them to continue, answer, summarize, plan, classify, write, inspect, or call a tool. Left alone, they do not wake up in the morning, remember an unfinished argument, check whether the coffee machine is lying again, and decide to revise a paper.

That seems like a clean distinction.

Until you look at people.

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

That is not how we usually use the word. We do not think a person lacks agency because they responded to pain, curiosity, obligation, or a question. We do not think a researcher lacks agency because a deadline made them finish the abstract. The trigger matters, but it does not exhaust the action.

Agency lives somewhere else.

It lives in how a system interprets a situation, which signals it can perceive, what it can remember, what alternatives it can compare, which goals it can maintain, which actions it can take, and how accountable those actions are to the surrounding world.

That is also where the current confusion around AI agents becomes more interesting.

The weak version of the argument is: "LLMs are not agents because they need prompts."

The stronger version is: "Current LLM systems have narrow, externally managed channels for receiving prompts, maintaining goals, sensing the world, and acting back on it."

That second version is harder to fit into a tweet, unfortunately. A recurring tragedy.

---

## The HCI Question

From an HCI perspective, this matters because agency is distributed across more than the model.

It is distributed across the interface, the runtime, the user, the task, and the environment in which the system can act. A model inside a chat box has one kind of agency. A model connected to a calendar, codebase, browser, robot arm, visual analytics workspace, or email account has another. The difference is not that the model suddenly developed a soul between API calls. The difference is that the system now has more ways to perceive state, maintain context, and perform actions.

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

With LLM systems, the question becomes more subtle.

An agent might act after a user request, after a timer, after a file changes, after a metric crosses a threshold, after another agent reports uncertainty, or after a workspace event suggests that the user is stuck. Each of these is a prompt in the broad sense. But each also changes the design problem.

Who asked for the action?
Was the trigger visible?
Could the system explain why it acted?
Was the action reversible?
Could the user interrupt it?
Did the system have enough context to act responsibly?

This is where agency becomes less metaphysical and more practical.

It becomes a question of invocation, permission, visibility, memory, and accountability.

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

The model does not act from nowhere.

Neither do we.

The difference is not whether there is a prompt. The difference is what the system can do with one.
