# IndexNow — permitdrills.com

- Key: `7ca51962dfb845a2a5af587c80ea0a72`
- Key file: `site/public/7ca51962dfb845a2a5af587c80ea0a72.txt` (content = the key; served at `https://permitdrills.com/7ca51962dfb845a2a5af587c80ea0a72.txt` once DNS is live)
- Submission endpoint: `POST https://api.indexnow.org/indexnow` with `{host, key, keyLocation, urlList}` — **submit only after Spaceship DNS is set and HTTPS is live** (main agent's step).

## Starter URL list (submit on launch day)

```
https://permitdrills.com/
https://permitdrills.com/methodology/
https://permitdrills.com/premium/
https://permitdrills.com/about/
https://permitdrills.com/terms/
https://permitdrills.com/new-jersey/
https://permitdrills.com/new-jersey/practice/
https://permitdrills.com/new-jersey/exam/
https://permitdrills.com/massachusetts/
https://permitdrills.com/massachusetts/practice/
https://permitdrills.com/massachusetts/exam/
https://permitdrills.com/washington/
https://permitdrills.com/washington/practice/
https://permitdrills.com/washington/exam/
https://permitdrills.com/hawaii/
https://permitdrills.com/hawaii/practice/
https://permitdrills.com/hawaii/exam/
https://permitdrills.com/maryland/
https://permitdrills.com/maryland/practice/
https://permitdrills.com/maryland/exam/
```

Plus every `/<state>/topics/<topic>/` study page (30 URLs) once built — regenerate from `dist/sitemap-0.xml` at submission time and submit the full sitemap URL set in batches of ≤10,000.
