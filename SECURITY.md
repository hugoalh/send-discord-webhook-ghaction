# Security Policy

## Supported Versions

> | **Legend** | **Description** |
> |:-:|:--|
> | L | **LTS:** Long term supported. |
> | ✔ | **Active / Current:** Currently supported. |
> | 👎{🐛} | **Partially (Issue):** Partially supported due to confirmed contains bugs and/or issues. |
> | 👎{🧓} | **Partially (Old):** Partially supported due to deprecated by newer versions. |
> | ❌{🐛} | **No (Issue):** Not supported due to confirmed contains bugs and/or issues. |
> | ❌{🧓} | **No (Old):** Not supported due to too old. |

| **Releases / Tags / Versions** | **Status** | **Target - GitHub Actions Runner** | **Target - Docker** | **Target - NodeJS** | **Target - NPM** |
|:-:|:-:|:-:|:-:|:-:|:-:|
| v5.0.X | L | >= v2.297.0 | *N/A* | ^ v16.13.0 | *N/A* |
| v4.2.X | 👎{🧓} | *N/A* | Latest Release | >= v14.15.0 | >= v6.14.8 |
| v4.1.X | ❌{🧓} | *N/A* | Latest Release | >= v14.15.0 | >= v6.14.8 |
| v4.0.X | ❌{🧓} | *N/A* | Latest Release | >= v14.15.0 | >= v6.14.8 |
| < v4.0.0 | ❌{🐛🧓} | *N/A* | *N/A* | <= v12.13.0 | <= v6.12.0 |

## Report Vulnerability

If you believe you have found any security vulnerability, please do not report it publicly! Instead, please report it via [the repository Security Advisories system](https://github.com/hugoalh/send-discord-webhook-ghaction/security/advisories/new), [fill this form (legacy)](https://forms.gle/iYjv8jGqkBzjy9yW9), or send an e-mail (legacy).

All new reports may need up to `~48 hours (~2 days)` to begin the process.

> **📢 Security Vulnerability Report for GitHub repositories should report to their Security Advisories system:**
>
> GitHub now introduced private vulnerability reporting, a dedicated communications channel where the community can disclose security issues directly on GitHub, and allow security researchers to report vulnerabilities securely in the repository.
>
> For the instruction on how to submit a security vulnerability report via the new Security Advisories system, please visit "[Creating a repository security advisory](https://docs.github.com/en/code-security/security-advisories/repository-security-advisories/creating-a-repository-security-advisory)".

> **⚠ Important:**
>
> All legacy reports will only proceed to further process while:
>
> - with the correct personal information of the reporter, and
> - with the correct project's ID or repository URI.
>
> Otherwise the report will mark as invalid immediately, not proceed, and without any notification.

### Via Send An E-mail

Send an e-mail to either one who listed in here (e-mail address is listed in the profile):

- [hugoalh](https://github.com/hugoalh)

#### Suggested Content List

Please provide as much as you can to help the security vulnerability report supervisors for better understand the nature, scope of the possible issues, and triage your report more quickly.

- Your account's platform (e.g.: GitHub, GitLab, ...).
- Your account's username (e.g.: `@octocat`).
- Project's ID or repository URI.
  - Project's ID is displayed at the top part of the Readme (file: `README.md`), below the project display name (i.e.: header), inside a code block.
- Affected branches, commits, releases, tags, and/or versions.
  - Versions must be listed as supported.
  - For multiple versions, you can use version range instead.
- Affected files.
  - Files which related to the manifestation of this security vulnerability.
  - Relative files' paths based on repository root.
- Issues to cause this security vulnerability (e.g.: buffer overflow, cross-site scripting, SQL injection, ...).
- Any special/specific configuration required to reproduce this security vulnerability?
- Steps' instructions to reproduce this security vulnerability.
- Proof of concept and/or exploit code.
  - How an attacker might exploit this security vulnerability?
- References of this security vulnerability.
  - Common Vulnerabilities and Exposures (CVE) IDs.
  - Common Weakness Enumerator (CWE) IDs.
