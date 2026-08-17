# tc-scanner

tc-scanner is a lightweight Chrome extension that parses Terms of Service and Privacy Policy pages to detect concerning clauses in real time.

## Features

- Instant Risk Score: Calculates a visual risk rating based on detected clause severity.
- Red-Flag Detection: Categorizes terms involving data selling, account termination, liability waivers, and automatic renewals.
- Direct Evidence: Pulls verbatim quotes from the page directly into the popup interface.
- Privacy First: 100% client-side execution using local JavaScript regex matching. No external server requests, tracking, or API dependencies.

## Project Structure

`text
tc-scanner/
├── manifest.json
├── content.js
├── popup.html
├── popup.js
├── styles.css
└── README.md