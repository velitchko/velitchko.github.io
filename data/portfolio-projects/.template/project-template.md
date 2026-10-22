---
title: "Project title"
date: "2026"
blurb: "A short, plain-language summary for the project list."
abstract: "Optional one-paragraph case-study abstract."
role: "Optional role or contribution"
collaborators:
  # - "Name or organization"
tags:
  - "Topic"
status: "ongoing" # ongoing | completed | research
outcomes:
  # - "Optional outcome, publication, award, or deployment"
links:
  - label: "Project site"
    url: "https://example.com"
    kind: "project" # project | publication | repository | demo | documentation | external
# One leading image. `src` must be a local public path and `alt` must concisely
# describe what is visibly shown (not the filename or repeated project title).
# `caption` is optional visible context: use it only when it explains why the
# view matters without restating the alt text. A missing asset or alt text
# becomes a labelled placeholder, so it is safe to prepare the entry first.
hero:
  src: "/portfolio/my-project/hero.jpg"
  alt: "Describe the project interface or result shown in the hero image"
  caption: "Optional visible context explaining why this view matters"
  type: "image" # image | gif
# Ordered supporting figures. Add at least three when they are ready.
gallery:
  - src: "/portfolio/my-project/01.jpg"
    alt: "Concise description of the visible interface or result"
    caption: "Optional context that adds meaning beyond the alt text"
    type: "image"
  - src: "/portfolio/my-project/02.jpg"
    alt: "Describe the second supporting image"
  - src: "/portfolio/my-project/03.jpg"
    alt: "Describe the third supporting image"
featured: false
order: 99
---

## Overview

Write the richer case-study narrative here in Markdown. Standard Markdown and GFM are supported (headings, lists, links, emphasis, and tables). Raw HTML is deliberately not rendered.

## Process

Describe the question, approach, or interaction. Add local images/GIFs under `data/portfolio-projects/images/`, then list them in `hero` and `gallery` above with useful alt text and only meaningful captions.

## What changed

Add outcomes, lessons, or links to further material when they are ready.
