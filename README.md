# NameForge 🚀

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/WiiZARDD/NameForge)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-orange.svg)](https://github.com/WiiZARDD/WiiZARDD/releases)

---

## Table of Contents

1. [Introduction](#introduction)  
2. [Why NameForge?](#why-nameforge)  
3. [Features](#features)  
4. [Demo](#demo)  
5. [Tech Stack](#tech-stack)  
6. [Installation](#installation)  
   - [Prerequisites](#prerequisites)  
   - [Local Setup](#local-setup)  
7. [Usage](#usage)  
   - [Generate a Brand Name](#generate-a-brand-name)  
   - [Check Domain Availability](#check-domain-availability)  
   - [Check Social Username Availability](#check-social-username-availability)  
8. [Configuration](#configuration)  
9. [Deploying to Production](#deploying-to-production)  
10. [Contributing](#contributing)  
11. [License](#license)  
12. [Contact & Support](#contact--support)  
13. [Acknowledgments](#acknowledgments)  

---

## Introduction

Welcome to **NameForge**, the ultimate SaaS platform that transforms the daunting task of naming your brand into an interactive, game-like experience. Whether you’re launching a startup, creating a new side project, or simply brainstorming a fresh identity, NameForge does all the heavy lifting:

- **Immediate feedback** on domain and social handle availability  
- **Gamified interface** to keep the creative juices flowing  
- **Lightning-fast checks** across hundreds of top-level domains and social platforms  
- **Built-in filters** to hone in on industry-specific keywords  

If anyone ever doubted your creativity or dismissed your hustle, NameForge is here to prove them wrong—and to make the process of “finding the perfect name” an absolute joy.

---

## Why NameForge?

> “A name can make or break your brand. Don’t leave it to chance—forge it with NameForge.”

1. **Instant Gratification**  
   - No more bouncing between domain registrars and social networks. NameForge returns real-time availability for domains and usernames in under 2 seconds.

2. **Gamified Experience**  
   - Challenge yourself to “beat the clock” and discover a winning name before time runs out. Each search feels like leveling up in a high-stakes game.

3. **Comprehensive Coverage**  
   - We check availability across `.com`, `.io`, `.co`, and dozens of relevant country-code TLDs. Plus, we scan the top 10 social networks (Twitter, Instagram, GitHub, etc.) in one fell swoop.

4. **Customizable Filters**  
   - Prioritize length, keyword relevance, industry tags, or TLD preference. Narrow down to exactly what suits your vision.

5. **Built for Scale**  
   - From solo founders to enterprise teams—NameForge handles hundreds of concurrent searches with zero lag, thanks to our serverless architecture and intelligent caching layer.

---

## Features

- 🎮 **Game-Like Interface**  
  - Real-time “score” meter that rates each name on memorability, pronounceability, and brand potential.  

- 🌐 **Domain Checks**  
  - Query dozens of TLDs at once (e.g., `.com`, `.net`, `.tech`, `.ai`, and more).  

- 🏷️ **Social Handle Availability**  
  - Scan Instagram, Twitter, Facebook, GitHub, TikTok, and other major platforms—no more manual guessing or refreshing.  

- 🔍 **Keyword Suggestions**  
  - AI-powered suggestions based on input seed words.  

- ⚙️ **Filter & Sort**  
  - Sort results by availability status, name length, keyword relevance, or TLD popularity.  

- 📊 **Analytics Dashboard**  
  - Track your past searches, “favorite” promising names, and view usage statistics over time.  

- 🔒 **Secure & Private**  
  - All queries run over HTTPS, with no logging of personal data.  

- 🔄 **Public API**  
  - Integrate NameForge into your CI/CD pipeline, website, or chatbot via a RESTful interface.  

---

## Demo

![NameForge Interface Screenshot](https://i.imgur.com/pdfBrRF.png)
![NameForge Interface Screenshot](https://i.imgur.com/0OzECuk.png)

1. **Homepage**: Clean, minimal UI with emphasis on search bar and quick filters.  
2. **Search Flow**: Type a seed keyword → Pick preferred TLDs → Click “Forge It!” → View interactive results grid.  
3. **Results Screen**:  
   - Domains marked as **AVAILABLE** or **TAKEN**  
   - Usernames marked as **OPEN** or **UNAVAILABLE**  
   - “Brand Score” meter (0–100) displayed above each suggestion  

**Live Demo:** [https://nameforge.app](https://nameforge.app)

---

## Tech Stack

- **Frontend**  
  - React (w/ TypeScript)  
  - Tailwind CSS for utility-based styling  
  - Framer Motion for UI animations  
- **Backend**  
  - Node.js + Express (TypeScript)  
  - Serverless functions on AWS Lambda (for domain/username queries)  
  - Redis caching layer (to throttle API calls and reduce latency)  
- **Database**  
  - PostgreSQL (managed by AWS RDS)  
  - Prisma ORM for schema management  
- **External APIs**  
  - Domain Registrar APIs (Namecheap, GoDaddy, etc.)  
  - Social Handle Checker APIs (Namecheckr, SocialCat, custom scrapers)  
- **Deployment**  
  - AWS (Lambda, API Gateway, RDS, S3, CloudFront)  
  - GitHub Actions for CI/CD  
- **Monitoring & Logging**  
  - Sentry (error tracking)  
  - Datadog (performance monitoring)  
- **Authentication**  
  - JWT-based sessions + OAuth2 (Google, GitHub)  

---

## Installation

> **Heads up!** If you just want to spin this up locally, you can have a working copy in less than 10 minutes.

### Prerequisites

- **Node.js** v16.x or later  
- **Yarn** (v1.22.x) or **npm** (v8.x)  
- **PostgreSQL** v13.x (locally or via Docker)  
- An **.env** file configuring your database credentials and API keys  

```bash
# Clone the repository
git clone https://github.com/WiiZARDD/NameForge.git
cd NameForge

# Install dependencies (choose Yarn or npm)
yarn install
# or
npm install
