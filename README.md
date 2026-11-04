# Pocket Utilities

Nineteen small Node.js tools for everyday text and number tasks. No dependencies, installation step, network requests, or background jobs. Requires Node.js 22 or newer.

Run a tool with `node FILE.js ARGUMENTS`. Quote text containing spaces. Every tool accepts `--help`; invalid input prints an error and exits with status 1. Outputs are plain text or JSON.

| Tool | Example | Purpose |
| --- | --- | --- |
| slugify | `node slugify.js "Creme & Tea"` | ASCII URL slug with accent removal |
| title-case | `node title-case.js "a small title"` | Capitalize each word; no editorial title rules |
| word-frequency | `node word-frequency.js "tea tea coffee"` | Case-insensitive Unicode word counts |
| unique-lines | `node unique-lines.js "TEXT"` | Remove repeated lines, keeping first occurrences |
| sort-lines | `node sort-lines.js "TEXT"` | Sort lines by case-sensitive UTF-16 order |
| reverse-text | `node reverse-text.js "hello"` | Reverse graphemes, preserving combined emoji |
| palindrome | `node palindrome.js "Never odd or even"` | Ignore punctuation, spacing, and case |
| caesar | `node caesar.js "Hello" 13` | Shift ASCII letters; a toy cipher, not encryption |
| format-duration | `node format-duration.js 90061` | Format whole seconds as days/hours/minutes/seconds |
| format-bytes | `node format-bytes.js 1536` | Format binary units (KiB, MiB, etc.) |
| temperature | `node temperature.js 32 F C` | Convert Celsius, Fahrenheit, and Kelvin |
| percent-change | `node percent-change.js 100 125` | Percentage change using absolute starting value |
| gcd-lcm | `node gcd-lcm.js 12 18` | Exact greatest common divisor and least common multiple |
| primes | `node primes.js 100` | List primes up to a limit of one million |
| fibonacci | `node fibonacci.js 10` | Up to 1,000 exact Fibonacci numbers as decimal strings |
| roll-dice | `node roll-dice.js 2d6` | Roll up to 100 dice, returning each roll and total |
| rgb-to-hex | `node rgb-to-hex.js 255 128 0` | Convert three RGB channels to a hex color |
| base-convert | `node base-convert.js ff 16 10` | Exact integer conversion between bases 2 and 36 |
| clamp | `node clamp.js 20 0 10` | Restrict a number to a closed interval |

Text tools accept a single argument, including multiline strings. Line tools normalize CR, LF, and CRLF to LF and preserve distinct empty lines according to the operation. Slugs keep ASCII letters and digits; non-Latin scripts may produce empty slugs. Word counting is a simple token rule, not linguistic segmentation. Numeric tools use JavaScript numbers unless exact integer output is explicitly documented above.

Functions can also be imported: `import { slugify } from './slugify.js'`. Importing a module produces no output. Run the included checks with `npm test` or `node --test`. Tools do not modify files.

An additional PowerShell tool, `./system-summary.ps1`, prints a JSON report with operating system, CPU architecture, logical processor count, and PowerShell version. It works in PowerShell 7 and makes no network requests. It does not report machine names or user identifiers. Run it in PowerShell with `./system-summary.ps1`.

MIT license. Copyright (c) 2026 Nalkyrrr.
