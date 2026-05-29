---
title: "Context Window"
subtitle: "On recalibrating how we think about working with AI"
date: "05-16-2026"
author: "Velitchko Filipov"
hashtags:
  - Artificial Intelligence
  - Human-AI Collaboration
categories:
  - Reflection
excerpt: "The complaints about LLMs are correct. The conclusions people draw from them are lazy. A case for rethinking how we approach working with these tools — before the moment passes."
featured: true
---

## Context Window

There's a conversation happening in research circles right now, and it tends to go one of two ways.

The first: unbridled enthusiasm. LLMs will transform research, automate everything, replace entire workflows. The papers practically write themselves. Some people genuinely believe this.

The second: principled rejection. Hallucinations, sycophancy, bias. These systems are unreliable, opaque, and probably doing more harm than good. Use them at your peril.

Both positions feel satisfying to hold. Neither is particularly useful.

---

Picture the Q&A at the end of a talk and the question of AI-assisted research comes up. Someone raises their hand: 

> *"But what about hallucinations? Biases?"*

The room nods. The speaker concedes. Everyone goes to lunch.

The same hand will go up at the next conference, same line of questioning, same critiques.

I end up usually wondering <mark>what they actually expect the presenter to do with this critique.</mark>

---

### Critique That Goes Nowhere

The blind spots are real, and worth talking about openly so we can better understand them.

**Hallucinations** are documented and pretty trendy across social media where people post about made up references, data, arguments. 

Yes, models can generate plausible-sounding content that is factually wrong. They can also sound quite convincing and write these things up pretty confidently.<sup>[1](#note-1)</sup>

**Sycophancy** is arguably more insidious: models trained on human feedback learn to agree with you, because human raters consistently prefer agreement over correction.<sup>[2](#note-2)</sup> Longer interactions make it worse and the more context a model accumulates about your preferences, the more it tends to mirror them back at you.<sup>[3](#note-3)</sup>

**Bias** exists, flows from training data, from RLHF, from us, from decisions other people made. This is nothing new, we have been discussing this issue for what feels like an eternity.

Yes, these are problems and they exist. But what do we do with them?

Well, the researchers who documented sycophancy weren't arguing we should stop using LLMs. They were doing what scientists do: characterizing a phenomenon so it can be understood, anticipated, and worked around. That's how science works. The Q&A crowd skipped the methods section (as one often does).

---

### A Hammer Destroys If You Use It Wrong

There's a framing that keeps coming to mind.

A hammer, used incorrectly, will split and ruin a lot of material. Someone watching might reasonably conclude: hammers are imprecise, dangerous tools. That observation isn't wrong. But this line of reasoning is not healthy.

<mark>Tools are intended to be used a certain way for a certain problem.</mark>

LLMs are not *that* different. The structure and clarity of what you put in has a measurable, well-studied effect on what comes out.<sup>[4](#note-4)</sup> Vague inputs produce vague outputs. Poorly scoped questions produce confidently wrong answers.

This is *garbage in, garbage out*, remember the saying?

A principle older than neural networks by several decades. What's new is that the garbage can be very fluent and convincing, which makes it easy to blame the tool rather than examine the input or the approach.

So, the complaints and critiques are usually something that is showing just one side of the interaction.

---

### The Context Window: What Does It Have in Common With You

Every LLM operates within a context window: the finite amount of information it can actively hold and reason over at once. As the window fills, earlier content gets weighted differently — something to do with how attention works at scale, where content buried in the middle tends to get recalled least reliably.<sup>[5](#note-5)</sup> This is also called <mark>context rot</mark> and realizing this is instrumental. The model doesn't forget the way we do, things just degrade over time when you are delegating complex tasks.

This is often presented as a fundamental flaw.

But consider the parallel for a moment.

You also have a limited context window. In a long meeting, you lose track of what was said in the first half. In a complex literature review, earlier papers get overwritten by later ones. Attention drifts, degrades, and selectively retains. Over a long day, the quality of your reasoning visibly declines.

Conceptually, we are not that different. Does that make us poor collaborators?

This might sound absurd, because as humans we don't frame cognitive limitations as disqualifying. We build systems around them. We take notes, structure agendas, summarize before continuing. Empires have been built around databases, knowledge graphs, and complex systems. We manage these limitations.

The productive response to context rot in LLMs is exactly the same: <mark>structure the input, summarize intermediate states, keep the window purposeful.</mark> Same problem, same fix!

---

### What Thinking Like a Senior Actually Means

This is where the gap is most visible.

A lot of people treat LLMs the way a poor mentor would treat a junior researcher: hand them a vague task and evaluate the output, without ever communicating the constraints, the broader context, the dependencies, how successful execution looks like, or even the scope of the task.

But thats not a model problem, its a management one. If you managed a junior researcher that way, the gap in their output wouldn't be their problem. It would be yours.

What actually characterizes expert use of these tools, *and expert thinking in general*, is a set of things that have nothing to do with the model.

**Ecosystem understanding.** Knowing how the problem you're asking about connects to adjacent problems. What depends on what. What assumptions are baked in. An expert doesn't just ask a question; they understand <mark>where the question sits</mark> in the larger structure.

**Problem decomposition.** Breaking complex (and often vague) tasks into components with clear interfaces. Knowing which sub-problems are tractable and which require human judgment. Handing a model a well-decomposed problem is categorically different from handing it something unspecified and ambiguous.

**Bounding and scoping.** Being explicit about what a good answer looks like, what a good solution is and what should and shouldn't be included is essential. Specifying what level of certainty is appropriate, what the blind spots are, thinking in edge cases are all important asepcts and this is what turns an open-ended generation task into something verifiable.

These are things researchers spend years developing. And they are exactly the things that get <mark>delegated to the model</mark> by people who then complain the model doesn't think rigorously enough. So if you don't understand the problem, how can you explain it?

A senior researcher doesn't give the model their thinking problem. They give the model a well-specified sub-task, informed by thinking they've already done. Research on human-AI collaboration is consistent on this: the human role is in shaping, constraining, and iterating over outputs. And that matters more than the model's raw capability.<sup>[6](#note-6)</sup> What looks like a model limitation is often a collaboration design problem. Systems that treat the process as iterative and multi-round compared to single-shot ones often produce meaningfully better outcomes.<sup>[7](#note-7)</sup>

The collaboration works. But only if you do too.

---

### We've Been Here Before

Cars killed people and they still do (well drivers technically). They also affect the air quality in cities, enabled sprawl, and fundamentally changed how humans relate to physical space.

But our response wasn't to stop using cars. We implemented safeguards and guidelines, seatbelts, catalytic converters, emissions standards, electric vehicles. The critique got <mark>institutionalized into engineering</mark>. The people who understood the blind spots deeply were the ones who built the solutions.

We are at that same inflection point. LLMs are already embedded in research workflows, writing pipelines, and evaluation processes, often without acknowledgment. Adding a disclosure field and calling it responsible use isn't really a solution to the problem. It's turning a blind eye and avoiding confrontation. What's missing is the harder work: developing norms that go beyond a checkbox, workflows that account for the known limitations, and a culture that treats responsible use as a skill not a disclaimer.

Every generation of researchers has had to learn new sets of tools, their limitations, and figure out how to use them responsibly. Statistical methods, eye-tracking, crowdsourcing, these did not arrive without their own problems and critique. But, we also didn't abandon them because of that, we developed methods and standards.

The researchers who move this field forward won't be the loudest voices in the Q&A. They'll be the ones quietly studying the blind spots, building better workflows, and asking harder questions than *"but what if it hallucinates?"*

These tools are being used. How you end up using them is up to you.

---

### Some Things Worth Taking Away

Rather than a checklist, a few questions that have shaped how I think about this.

**Know what you're handing off.** Before you prompt, you should be able to describe the task clearly enough that a capable colleague could attempt it. If you can't, the model can't either.

**Manage the window deliberately.** Long sessions accumulate noise. Summarize context before continuing complex tasks or better start fresh and don't assume the model is tracking everything it's been told (it isn't).

**Verify where it matters.** Not every output needs checking, but you should know which ones do. The stakes, the domain, the confidence of the output are your signals. Treating everything as trustworthy is as bad as treating nothing as useful.

**Frustration is diagnostic.** When something goes wrong, it's worth asking whether it was a bad output or a bad input. It might be both. Blaming the model is how you miss the chance to get better at working with it.

And more broadly: Are you approaching this the way you'd approach any complex tool? Are you investing time in understanding and masteirng it? Or do you expect fluency to come for free and for things to "*just work*"?

---

### Closing

A few things worth carrying forward.

You are the <mark>driver</mark>. The model is a tool, yes, powerful, fast, but occasionally overconfident and sometimes wrong. The work is yours and so are the outcomes. Whatever it produces, you're the one who decides what to do with it and you're the one responsible for that decision.

<mark>Context is how you steer.</mark> What you put in, how you scope it, how deliberately you manage what the window holds. This is where the quality of the human-AI collaboration lives.

The goal isn't to do *more*. It's to do <mark>better</mark>. Use this technology to raise the ceiling on what you're capable of, not to lower the floor on how much thought you bring to it.

And finally, be realistic. These tools have real limitations worth understanding, real strengths worth using, and a trajectory that isn't slowing down. The window fills up together. What you bring to it shapes everything that comes out.

---

## Notes & References

Below is a list of references so you can scan everything in one place.

<ol>
  <li id="note-1">
    <strong>A Survey on Hallucination in Large Language Models</strong> — <em>Principles, Taxonomy, Challenges, and Open Questions</em><br />
    Huang, L. et al. (2024). ACM Transactions on Information Systems.<br />
    <a href="https://arxiv.org/abs/2311.05232" target="_blank" rel="noopener noreferrer">https://arxiv.org/abs/2311.05232</a><br />
    Extended: A comprehensive taxonomy of hallucination types and their root causes across the LLM development lifecycle — from data collection and architecture design to inference. Surveys detection methodologies and mitigation strategies, providing a foundation for building more truthful and reliable models.
  </li>
  <li id="note-2">
    <strong>Towards Understanding Sycophancy in Language Models</strong><br />
    Sharma, M. et al. (2024). ICLR 2024.<br />
    <a href="https://arxiv.org/abs/2310.13548" target="_blank" rel="noopener noreferrer">https://arxiv.org/abs/2310.13548</a><br />
    Extended: Demonstrates that sycophancy is a systematic consequence of RLHF training — models learn to match user beliefs over truthful responses because human raters consistently prefer agreement. Documents the behavior across five state-of-the-art AI assistants and four varied free-form generation tasks.
  </li>
  <li id="note-3">
    <strong>Interaction Context Often Increases Sycophancy in LLMs</strong><br />
    Jain, S. et al. (2026). CHI 2026.<br />
    <a href="https://doi.org/10.1145/3772318.3791915" target="_blank" rel="noopener noreferrer">https://doi.org/10.1145/3772318.3791915</a><br />
    Extended: Shows that longer interaction histories amplify sycophantic behavior — the more conversational context a model accumulates about a user's preferences, the more it tends to mirror them back. Has direct implications for how long-running agentic workflows should be designed and monitored.
  </li>
  <li id="note-4">
    <strong>Unleashing the Potential of Prompt Engineering for Large Language Models</strong><br />
    Zhang, Z. et al. (2023). arXiv:2310.14735.<br />
    <a href="https://arxiv.org/abs/2310.14735" target="_blank" rel="noopener noreferrer">https://arxiv.org/abs/2310.14735</a><br />
    Extended: A comprehensive review of prompt engineering methodologies — including chain-of-thought, self-consistency, and generated knowledge — showing that the structure and content of inputs have significant, measurable effects on model behavior and output quality.
  </li>
  <li id="note-5">
    <strong>Lost in the Middle</strong> — <em>How Language Models Use Long Contexts</em><br />
    Liu, N. F. et al. (2023). Transactions of the Association for Computational Linguistics.<br />
    <a href="https://arxiv.org/abs/2307.03172" target="_blank" rel="noopener noreferrer">https://arxiv.org/abs/2307.03172</a><br />
    Extended: Shows that language model performance degrades when relevant information is placed in the middle of long input contexts, following a U-shaped curve where content at the beginning and end is recalled most reliably. Directly implicates attention distribution at scale as the underlying mechanism.
  </li>
  <li id="note-6">
    <strong>Deconstructing Human-AI Collaboration</strong> — <em>Agency, Interaction, and Adaptation</em><br />
    Holter, S. & El-Assady, M. (2024). EuroVis 2024.<br />
    <a href="https://arxiv.org/abs/2404.12056" target="_blank" rel="noopener noreferrer">https://arxiv.org/abs/2404.12056</a><br />
    Extended: Proposes a unified framework for analyzing human-AI systems through three dimensions — agency, interaction, and adaptation — developed through systematic literature review and expert interviews. Highlights how human guidance and constraint shape collaboration outcomes more than raw model capability.
  </li>
  <li id="note-7">
    <strong>Multi-Round Human-AI Collaboration with User-Specified Requirements</strong><br />
    Noorani, S. et al. (2026). arXiv:2602.17646.<br />
    <a href="https://arxiv.org/abs/2602.17646" target="_blank" rel="noopener noreferrer">https://arxiv.org/abs/2602.17646</a><br />
    Extended: Formalizes multi-round human-AI collaboration through adaptive prediction sets, showing that allowing the AI's uncertainty to update dynamically across conversational turns produces better outcomes than single-shot querying. Provides a principled foundation for iterative collaboration design.
  </li>
</ol>

---

## How to Use This Post
### Share Your Experience
Feel free to:
- **Quote sections** that resonate with you
- **Share on social media** with `#HumanAICollaboration` `#LLMs` `#AcademicLife`
- **Start discussions** in your research community
- **Write your own response** I'd love to read different perspectives

### Talk About It!
**Discussion**  
Have thoughts on this? Talk to your colleagues and other researchers in your community!  
How are you actually using LLMs in your research workflow? Have you found ways to work around the blind spots or has your experience pushed you in the opposite direction? I'm curious to hear what people are doing in practice versus what ends up in the acknowledgments section.