---
title: "MARS — My Anime Recommendation System"
featured: true
date: "2026-02"
links:
  demo: "https://myanimerecommendationsystem-x6rqm6vqjmbr2ij8i8yk3b.streamlit.app"
  repo: "https://github.com/daedwards06/MyAnimeRecommendationSystem"
tags:
  - Recommendations
  - NLP
  - Streamlit
  - Python
---

A hybrid recommendation engine combining collaborative filtering, content-based similarity, and neural embeddings to recommend anime across a 13,000+ title catalog.

![MARS demo — anime recommendation interface showing title search, hybrid score breakdown, and ranked results](/mars-demo.png)

## Why it stands out

- Three-stage scoring pipeline: candidate generation → shortlist → reranking
- Hybrid CF: FunkSVD matrix factorization + item-kNN blending
- Multi-modal content signals: TF-IDF/SVD + neural sentence embeddings
- Explainability and diversity controls in the UI

## Results

| Metric | Value | Notes |
|--------|-------|-------|
| NDCG@10 | **0.438** | Full-catalog ranking over 13K items (300-user temporal split); +43% lift over popularity baseline |
| Catalog coverage | **0.18%** | Fraction of the 13K+ catalog surfaced in top-10 recommendations across evaluation users |
| Diversity (Gini@10) | **0.50** | Gini index of item recommendation frequency; hybrid moderates the concentration seen in popularity-only models |
| Cold-start NDCG@10 | **0.025** | Content-only (TF-IDF) scoring for users with no rating history; falls back to genre/popularity signals |

## Tech Stack

- **Python** — core language
- **pandas / NumPy** — data wrangling and numerical computation
- **scikit-learn** — matrix factorization (FunkSVD), kNN, TF-IDF/SVD
- **sentence-transformers** — neural sentence embeddings for content similarity
- **Streamlit** — interactive web UI and deployment
- **Jikan API** — MyAnimeList data sourcing

## Links

- Demo: https://myanimerecommendationsystem-x6rqm6vqjmbr2ij8i8yk3b.streamlit.app
- Repository: https://github.com/daedwards06/MyAnimeRecommendationSystem
