#!/usr/bin/env bash
# Refreshes src/data/contributions.json from GitHub's contribution calendar.
# Needs the GitHub CLI, logged in (gh auth login). Run: npm run contributions
set -euo pipefail
USER_LOGIN="${1:-priyanshu14077}"
OUT="$(dirname "$0")/../src/data/contributions.json"
gh api graphql -F login="$USER_LOGIN" -f query='
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks { contributionDays { date contributionCount } }
        }
      }
    }
  }' --jq '.data.user.contributionsCollection.contributionCalendar
    | { total: .totalContributions,
        days: [.weeks[].contributionDays[] | { date, count: .contributionCount }] }' > "$OUT"
echo "Wrote $(jq '.days | length' "$OUT") days ($(jq .total "$OUT") contributions) to $OUT"
