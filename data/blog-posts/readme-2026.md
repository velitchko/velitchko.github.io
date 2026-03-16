---
title: "README.md"
subtitle: "An Essay On Reproducibility"
date: "03-17-2026"
author: "Velitchko Filipov"
hashtags:
  - Research & Development
categories:
  - Tips & Tricks
excerpt: "My thoughts on reproducibility in academic research, the challenges we are and will face, and some points on how to fix it."
featured: true
---

## README.md

Imagine this: a reviewer asks a follow-up question on your accepted paper.  
Straightforward stuff, re-run an experiment and confirm a number.  
You open your project folder and spend the next three hours (or more) hunting down the right version of a dependency, an intermediate dataset that got overwritten somewhere along the way, and a hardcoded path to a directory that no longer exists.

Hours maybe even days, for your own project 😬.

---

If that sounds absurd, Fekete and Freire<sup>[1](#note-1)</sup> have some even worse news: most researchers can't recreate their own results from two years ago without proper practices in place.

Not because they don't care about their work. It's more to do with the fact that nobody showed them these <mark>"proper practices"</mark> and even then finding the time to implement them is tough.

That tension is at the heart of the reproducibility crisis in visualization research.  
And it's a strange one, because reproducibility is simultaneously <mark>the last thing researchers have time for</mark> and <mark>the first thing everyone else runs into.</mark>

---

Think about what the lifecycle of a paper actually looks like from the outside.  
You spend a year building a system, running studies, writing and rewriting.  
The deadline approaches.  
Reproducibility gets pushed to: *"I'll clean it up before I submit"*, and then the deadline hits, and it becomes: *"It kinda works, that's fine."*

The method section is written that should be enough for people to reproduce this.  
The code isn't provided or is in the same state as it was at 2am the night before submission, just trying to get it to work: hardcoded paths, undocumented preprocessing, a `final_final_v3` folder that makes sense only to you.

Then the paper gets reviewed, accepted, and published. Two years later, another fellow researcher finds it.  
They're excited (*this is exactly what I need, someone already did the hard part*).  
They go to the supplemental material.

No code. No data. No repository.  
Just a PDF and the quiet realization that they gotta start from scratch.

Reviewers hit the same wall, just a bit earlier. The paper is promising. They want to verify something. *There's nothing to verify.*

This is a **problem**, the cost of not doing it falls <mark>almost entirely on other people, just a bit later</mark>.

---

There are real reasons people don't develop and publish with reproducibility in mind, and they're worth naming honestly.  

Time is the obvious one.<sup>[2](#note-2)</sup>  
Disclosure concerns are real too: sometimes you can't share data due to licensing or privacy, sometimes you can't share code before a deadline for anonymity reasons.  
And there's a subtler anxiety around messy code: the worry that someone will judge you for it, or that a competitor might use it.

These are all understandable.  
But Haroz<sup>[3](#note-3)</sup> has data on the citation benefits of open sharing, and the community's experience is consistent:

> *Any code is better than no code.*  
> *Partial reproducibility is better than none.*  
> *The judgment people fear rarely materializes.*

The harder truth is that most of these barriers dissolve if you stop thinking about reproducibility as a cleanup task and start thinking about it as <mark>infrastructure you build from the beginning.</mark>

---

Before getting precise about terms. *Because the community uses them loosely and it matters.* Here's how reproducibility and replicability differ:

**Reproducibility** means: same data + same code → same results. You're giving someone the exact inputs to verify your exact outputs.  
**Replicability** means: different data + same method → consistent findings. You're showing your approach generalizes beyond your specific dataset and conditions.<sup>[4](#note-4)</sup>

They're related but distinct.  
A paper can be fully reproducible. We can share the code and get the same results, but we can still fail to replicate if the effect doesn't hold on new and different data.  
Most papers currently achieve neither.<sup>[1](#note-1)</sup>  

We'll focus on reproducibility here, because it's the more tractable problem and the one where practical habits make the biggest difference.

---

The single most valuable shift I can recommend is this:

> **Set up your reproducible environment at the start of the project, not the end.**

This sounds like more work. BUT: It is actually <mark>dramatically less work.</mark>

Retrofitting reproducibility after submission is genuinely miserable, I say this from experience.  
You're reconstructing decisions you made nine months ago, figuring out which version of the script actually produced Figure 4, hunting down a version of a dataset you thought you still had.  
That process takes days and feels like archaeology.

Building it in from the start takes hours across the lifespan of the project. You are pretty much spending a few minutes to initialize the repo, a few minutes when to freeze your dependencies, a few minutes each time you script a new figure. Yes, it adds up. BUT: Each of those small investments is cheap precisely because you're doing it when the context is fresh.

It also quietly improves everything else: your code is cleaner because it has to run end-to-end, your figures are traceable, your analysis is auditable and reproducible.  

<mark>The paper gets better because the infrastructure forces rigor.</mark>

---

### Version Control: The Non-Negotiable

If you're not version-controlling your research, start there. Everything else builds ontop of this.

<mark>Git</mark> is the standard. Think of your commit history as your lab notebook: records what changed, when, and if you write commit messages, why. The key habit is to commit when things work, not one giant dump at the end. Commit when an experiment runs cleanly. Commit when you add a figure. Commit when you fix a bug. Each commit is a checkpoint you can return to.

```bash
# Initialize a repo at the start of every project
git init
git add .
git commit -m "initial project structure"

# Tag the version that produced paper results
git tag -a v1.0 -m "Version used for EuroVIS 2026 submission"
git push origin --tags
```

Tag your submission version. When a reviewer asks about something six months later, you want to be able to check out exactly the state of the code that produced your results and not *guestimating* at what it was.

---

### The README.md (Yes, This One)

Every repository needs a <mark>README.md</mark>. This shouldn't be a placeholder file (I've seen many of those). It shouldn't be a title and single line description either (Yes, I've also seen many of those). This should be an actual document that answers three questions: **what is this**, **how do I run it**, and **what does it produce**. The goal is that a stranger (perhaps reviewer), including future-you, can go from a fresh clone to a running system in under 10 minutes.

````markdown
# [Project Title]

Brief description of the project (1-2 sentences). 
> You can essentially copy from your abstract.

## Paper

If you use this code, please cite:
> [Your citation here]

## Requirements

- Python 3.10+
- Node.js 18+
- [Other dependencies]

## Setup

```bash
# Clone the repository
git clone https://github.com/yourname/project
cd project

# Install dependencies
pip install -r requirements.txt
```

## Usage

```bash
# Reproduce Figure 3 from the paper
python scripts/figure3.py --data data/processed/results.csv

# Run the full pipeline
bash scripts/run_all.sh
```

## Project Structure

```
project/
├── data/
│   ├── raw/          # Original, unmodified data
│   └── processed/    # Cleaned/transformed data
├── scripts/          # Analysis and figure generation
├── figures/          # Output figures
└── paper/            # LaTeX source
```

## Data

> [Describe where data comes from, how to obtain it, any licensing restrictions]

## Contact

> [Your name] — [your@email.com]
````

And anything else that might be useful, <mark>CONTRIBUTING.md</mark>: if you want people to build ontop and extend your work, <mark>LICENSE.md</mark> if you want specific license and usage terms. 

---

### Dependency Management: Lock Everything Down

The most common reproducibility failure is dependency drift. You write code against `pandas 1.5`. Someone runs it with `pandas 2.1`. It breaks, or worse, it runs and produces subtly different results with no error message to tell you anything went wrong.

The fix is to capture your exact environment at the moment your code works.<sup>[5](#note-5)</sup>

```bash
# Generate a requirements file with exact versions
pip freeze > requirements.txt

# Or use a proper environment spec with conda
conda env export > environment.yml
```

Commit that file  right after you ensure the code runs cleanly.

For JavaScript, TypeScript, and Node projects, your `package-lock.json` already contains this information. BUT: a lot of people add this to `.gitignore` I assume because they don't understand it's purpose. **Don't exclude this file**, the lockfile is <mark>what makes your dependencies reproducible.</mark>

```bash
# package-lock.json is already generated — commit it
git add package-lock.json
```

For full environment isolation, Docker is the gold standard. It's a heavier setup, but once it exists, *"it works on my machine"* stops being a sentence you can use. Because with a proper Docker container your approach works in a defined, portable environment that reviewers can run, future collaborators can run, and future-you can run. 

> And it isnt rocket surgery to setup either! (SEE BELOW)

```dockerfile
# Specify the image you need!
FROM python:3.10-slim

# Specify your working directory
WORKDIR /app

# Copy anything from your local directory that needs to be in the virtual machine
COPY requirements.txt .
# Run any dependnecy installation scripts, environment setup, or pre-processing tweaks.
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# This is your main start command.
CMD ["python", "scripts/main.py"]
```

```bash
# Build and run
docker build -t myproject .
docker run myproject

# Or for interactive use
docker run -it -v $(pwd)/output:/app/output myproject bash
```

---

### Map Figures to Commands

One practice that pays off disproportionately: make every figure in your paper producible by running a single command.  
This could be as easy to do as setting up individual python scripts for each figure.
No need to run blocks in nodebooks, to figure out which sequence to run them in, what parameters need adjustment, or how to export them manually.
Just one file, <mark>one command,</mark> one figure.

```bash
scripts/
├── figure2.py    # Generates Figure 2: accuracy comparison
├── figure3.py    # Generates Figure 3: timing results
├── figure4.py    # Generates Figure 4: user study results
└── all_figures.sh
```

```bash
#!/bin/bash
# all_figures.sh — reproduces all paper figures
set -e  # exit on error

echo "Generating Figure 2..."
python scripts/figure2.py --output figures/figure2.pdf

echo "Generating Figure 3..."
python scripts/figure3.py --output figures/figure3.pdf

echo "Generating Figure 4..."
python scripts/figure4.py --output figures/figure4.pdf

echo "Done. All figures in figures/"
```

This trick pays off constantly and in unexpected ways:

- You can't have a figure that "only works interactively".  
- You can't have hardcoded paths.  
- You can't have preprocessing steps that only live in your memory.  
- Everything has to be encoded, executable, and recoverable.
- Which means everything is reproducible.

---

### The LLM Problem

There's a newer challenge that I think the community <mark>hasn't critically figured out yet.</mark>

A noticeable trend over the last few years is research done *with* LLMs. Specifically, using LLMs to do the qualitative analysis, related work and literature search, summarization and synthesis, interpretation of results, and just generally writing up **large** portions of the paper.
I believe there are some serious ethical concerns and other discussion points to be made here, BUT: I want to talk about the reproducibility.

The problem is that things are developing rapidly.
Ask a model to classify your open-ended survey responses today. Ask it again in six months.  
The model has been updated, fine-tuned, adjusted and you just won't get the same results.  

Papers that use LLMs this way often don't report which model was used, which version, with what prompt, at what temperature.  
The result is a finding that cannot be verified and <mark>cannot be built upon.</mark><sup>[6](#note-6)</sup>
So why would anyone trust this result?

The minimum should be to treat any LMM-supported research and development like a dependency: version it, document the prompts, and archive the outputs.

```markdown
## LLM Usage

All LLM-assisted analysis was conducted using:
- Model: claude-sonnet-4-20250514
- Temperature: 0 (for reproducibility)
- Prompt version: v1.2 (see prompts/classification_prompt.md)
- Date: 2025-11-01

Note: Due to model updates, exact results may vary if reproduced
at a later date. We provide all raw outputs in data/llm_outputs/.
```

This is an emerging norm and we should help set it proactively.
The problem quickly compounds over time if you let it and rather than trying retrofit a few years from now, there are steps we can undertake today to make this better.

---

### The Minimal Checklist

For those who want something immediately actionable, here's the condensed version:

A checklist of the <mark>minimum practices that actually make a difference</mark>:

**Before writing code:**
- [ ] Create a Git repository and commit from day one
- [ ] Set up your environment with a `requirements.txt` or `environment.yml`

**While writing code:**
- [ ] Use relative paths, never hardcoded absolute paths
- [ ] Set random seeds explicitly (`np.random.seed(42)`)
- [ ] Write a script for every figure, not just interactive notebooks

**Before submission:**
- [ ] Write a README.md that lets a stranger run your code in 10 minutes
- [ ] Tag the exact commit that produced your results (`git tag v1.0`)
- [ ] Test your setup on a fresh machine or container
- [ ] Add a brief reproducibility statement to the paper itself

**For LLM-assisted work:**
- [ ] Document model name and exact version string
- [ ] Document prompt text (link or appendix)
- [ ] Archive all raw model outputs

---

### README.md Tutorial

We're organizing a tutorial at [EuroVIS 2026](https://velitchko.github.io/README.md/) about this:
*README.md: A Tutorial on Reproducible Visualization Research*: with myself, Tobias Isenberg, and Alexander Lex.<sup>[9](#note-9)</sup>  

It covers all of this in more depth, including the full [GRSI](https://www.replicabilitystamp.org/)<sup>[7](#note-7)</sup> application process and a live walkthrough of study replication using [reVISit 2](https://revisit.dev/).

All templates, checklists, and example projects will be in an openly accessible GitHub repository on the website, regardless of whether you attend.

If you're going to be there, come by. If not, the repository will be there when you need it.

---

The README.md sitting at the top of your repository is a small file.

It's also, somehow, one of the most important things you may write this year.  
Write it for the person who needs it most: the researcher who finds your paper two years from now, gets excited, follows the link, and is met with either a working system or a dead end.

That researcher might be a PhD student building on your work.  
It might be a reviewer.  
It might be you, trying to remember what you did.

Write it well. <mark>Write it first.</mark>

---

## Notes & References

Below is a list of references so you can scan everything in one place.

<ol>
  <li id="note-1">
    <strong>Fekete & Freire</strong> — <em>Exploring Reproducibility in Visualization.</em><br />
    IEEE Computer Graphics and Applications 40(5), 2020.<br />
    <a href="https://doi.org/10/ghd59m" target="_blank" rel="noopener noreferrer">https://doi.org/10/ghd59m</a><br />
    Extended: Outlines that most researchers cannot recreate their own results from two years ago without proper practices, and proposes a framework for thinking about reproducibility in visualization.
  </li>
  <li id="note-2">
    <strong>Franke, Reina & Koch</strong> — <em>Toward Reproducible Visual Analysis Results.</em><br />
    Proc. PacificVis 2023, IEEE Computer Society.<br />
    <a href="https://doi.org/10/gtw42q" target="_blank" rel="noopener noreferrer">https://doi.org/10/gtw42q</a><br />
    Extended: Estimates researchers spend 20–30% of their time attempting (and often failing) to reproduce others' work, representing massive wasted effort and slowed scientific progress.
  </li>
  <li id="note-3">
    <strong>Haroz</strong> — <em>Open Practices in Visualization Research.</em><br />
    Proc. BELIV 2018, IEEE Computer Society.<br />
    <a href="https://doi.org/10/gtw4sp" target="_blank" rel="noopener noreferrer">https://doi.org/10/gtw4sp</a><br />
    Extended: Analyzes practices for open data and material sharing, with quantified citation benefits for papers that share code and data openly.
  </li>
  <li id="note-4">
    <strong>Kosara & Haroz</strong> — <em>Skipping the Replication Crisis in Visualization: Threats to Study Validity and How to Address Them.</em><br />
    Proc. BELIV 2018, IEEE Computer Society.<br />
    <a href="https://doi.org/10/gtw4sq" target="_blank" rel="noopener noreferrer">https://doi.org/10/gtw4sq</a><br />
    Extended: Establishes clear terminology distinguishing reproducibility (same data + code → same results) from replicability (different data + same method → consistent findings), and examines threats to study validity in visualization research.
  </li>
  <li id="note-5">
    <strong>Reina</strong> — <em>Can Image Data Facilitate Reproducibility of Graphics and Visualizations?</em><br />
    IEEE Computer Graphics and Applications 43(2), 2023.<br />
    <a href="https://doi.org/10/gtw4nt" target="_blank" rel="noopener noreferrer">https://doi.org/10/gtw4nt</a><br />
    Extended: Proposes lightweight methods for embedding pipeline state in images to support reproducibility, addressing the challenge of capturing computational environments.
  </li>
  <li id="note-6">
    <strong>Quadri & Rosen</strong> — <em>You Can't Publish Replication Studies (and How To Anyways).</em><br />
    Proc. IEEE Workshop on Visualization for the People 2019. arXiv:1908.08893.<br />
    <a href="https://doi.org/10/gtxgh9" target="_blank" rel="noopener noreferrer">https://doi.org/10/gtxgh9</a><br />
    Extended: Proposes re-evaluation, expansion, and specialization strategies to make replication studies impactful and publishable within novel contributions.
  </li>
  <li id="note-7">
    <strong>Graphics Replicability Stamp Initiative (GRSI)</strong> — <em>Community-run reproducibility certification for graphics and visualization research.</em><br />
    <a href="https://www.replicabilitystamp.org/" target="_blank" rel="noopener noreferrer">https://www.replicabilitystamp.org/</a><br />
    Extended: Awards a stamp to papers that share working code and meet documentation criteria. Voluntary but increasingly visible in CVs and citation records.
  </li>
  <li id="note-8">
    <strong>Isenberg</strong> — <em>The State of Reproducibility Stamps for Visualization Research Papers.</em><br />
    Proc. BELIV 2024, IEEE Computer Society.<br />
    <a href="https://doi.org/10/nt3t" target="_blank" rel="noopener noreferrer">https://doi.org/10/nt3t</a><br />
    Extended: Quantifies how few published visualization works meet reproducibility standards, and shows that GRSI-certified papers receive more citations and wider adoption.
  </li>
  <li id="note-9">
    <strong>Cutler et al.</strong> — <em>reVISit 2: A Full Experiment Life Cycle User Study Framework.</em><br />
    IEEE Transactions on Visualization and Computer Graphics, 2026. To appear.<br />
    <a href="https://doi.org/10/hbkxwp" target="_blank" rel="noopener noreferrer">https://doi.org/10/hbkxwp</a><br />
    Extended: A comprehensive framework supporting the full experiment lifecycle from design through dissemination, enabling reproducible study workflows through domain-specific languages, provenance tracking, and participant replay. Best paper award at IEEE VIS 2025.
  </li>
</ol>

---

## How to Use This Post

### Share Your Experience

Feel free to:
- **Quote sections** that resonate with you
- **Share on social media** with `#Reproducibility` `#OpenScience` `#AcademicLife`
- **Start discussions** in your research community
- **Write your own response** — I'd love to read different perspectives

### Talk About It!

**Discussion**  
Have thoughts on this? Talk to your colleagues and other researchers in your community!  
Does your lab have reproducibility practices in place? Are there tools or workflows that have worked for you? I'm curious to hear what people are actually doing versus what gets written in the methods section.
