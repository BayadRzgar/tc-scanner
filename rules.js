const RULES = [
  {
    category: "Data Selling / Sharing",
    severity: 3,
    patterns: [
      /sell(?:s|ing)? your (?:personal )?(?:data|information)/i,
      /share.*third[- ]part(?:y|ies).*(?:advertis|marketing)/i,
      /disclose.*(?:personal )?(?:data|information).*third[- ]part(?:y|ies)/i,
      /may share your (?:data|information) with/i,
      /transfer.*(?:data|information).*to our (?:partners|affiliates)/i,
      /rent or sell/i
    ]
  },
  {
    category: "Arbitration / Waives Right to Sue",
    severity: 3,
    patterns: [
      /binding arbitration/i,
      /class action waiver/i,
      /waive.*right to (?:a )?(?:jury|trial)/i,
      /agree to resolve.*dispute.*arbitration/i,
      /you and .*company.* each waive/i,
      /individual capacity.*not.*class/i
    ]
  },
  {
    category: "Auto-Renewal",
    severity: 2,
    patterns: [
      /automatically renew/i,
      /auto-renewal/i,
      /unless (?:you )?cancel/i,
      /will continue.*until.*cancel/i,
      /recurring (?:billing|charge|payment)/i,
      /renews? for (?:successive|additional)/i
    ]
  },
  {
    category: "Broad Content License",
    severity: 2,
    patterns: [
      /perpetual.*irrevocable.*license/i,
      /royalty-free.*worldwide.*license/i,
      /grant.*(?:us|company).*license to use/i,
      /sublicensable/i,
      /right to use.*content.*any purpose/i
    ]
  },
  {
    category: "No Refunds",
    severity: 1,
    patterns: [
      /no refunds/i,
      /non-refundable/i,
      /all sales are final/i,
      /not eligible for a refund/i
    ]
  },
  {
    category: "Tracking / Third-Party Cookies",
    severity: 2,
    patterns: [
      /third-party cookies/i,
      /tracking pixels?/i,
      /advertising partners/i,
      /web beacons?/i,
      /device fingerprint/i,
      /cross-site tracking/i,
      /behavioral advertising/i
    ]
  },
  {
    category: "Unilateral Changes",
    severity: 1,
    patterns: [
      /at any time without notice/i,
      /we may modify.*at our sole discretion/i,
      /reserve the right to change.*at any time/i,
      /update.*terms.*without notifying/i,
      /continued use.*constitutes acceptance/i
    ]
  },
  {
    category: "Data Retention Forever",
    severity: 2,
    patterns: [
      /retain.*indefinitely/i,
      /no obligation to delete/i,
      /keep.*data.*as long as.*necessary/i,
      /retain.*even after.*(?:account|deletion|closure)/i
    ]
  },
  {
    category: "Liability Limitation",
    severity: 2,
    patterns: [
      /not liable for any (?:direct|indirect|incidental|consequential)/i,
      /disclaim(?:s|er)? all warranties/i,
      /provided "as is"/i,
      /no warranty of any kind/i,
      /limit.*liability.*maximum extent/i
    ]
  },
  {
    category: "Account Termination Without Notice",
    severity: 2,
    patterns: [
      /terminate.*account.*(?:at any time|without notice|sole discretion)/i,
      /suspend.*access.*without (?:prior )?notice/i,
      /right to refuse service to anyone/i
    ]
  },
  {
    category: "Location / Precise Tracking",
    severity: 2,
    patterns: [
      /collect.*precise location/i,
      /gps (?:data|coordinates)/i,
      /geolocation data/i
    ]
  },
  {
    category: "Data Shared with Government / Law Enforcement",
    severity: 1,
    patterns: [
      /comply with.*legal (?:process|request)/i,
      /disclose.*information.*law enforcement/i,
      /respond to.*subpoena/i
    ]
  },
  {
    category: "Minors / Age Data",
    severity: 1,
    patterns: [
      /not intended for children/i,
      /collect.*information from.*minors?/i,
      /parental consent/i
    ]
  },
  {
    category: "Cross-Border Data Transfer",
    severity: 1,
    patterns: [
      /transfer.*data.*(?:outside|to other) countr(?:y|ies)/i,
      /processed.*servers? located in/i,
      /data may be transferred internationally/i
    ]
  },
  {
    category: "Mandatory Data Collection",
    severity: 1,
    patterns: [
      /required to (?:provide|share).*(?:personal )?(?:data|information)/i,
      /cannot use.*service without.*(?:data|information)/i
    ]
  }
];

function analyzeText(text) {
  const results = [];
  for (const rule of RULES) {
    for (const pattern of rule.patterns) {
      const match = text.match(pattern);
      if (match) {
        results.push({
          category: rule.category,
          severity: rule.severity,
          excerpt: text.substring(
            Math.max(0, match.index - 60),
            match.index + match[0].length + 60
          ).trim()
        });
        break;
      }
    }
  }
  const score = results.reduce((sum, r) => sum + r.severity, 0);
  return { score, results };
}