<img src="https://raw.githubusercontent.com/yaakov123/hagana/master/assets/hagana.svg">

# Hagana

Hagana provides runtime protection for your NodeJS applications from malicious packages.

### The problem

Every time you add a new npm package to your project you're opening a Pandora's box.

With one simple command (`npm i`) you're adding potentially hundreds of
transitive dependencies that have the same access to your computer as your application.

Any one of those newly installed modules can

- Read/write to arbitrary locations in your file system
- Send network requests with potentially sensitive data
- Install malware/protestware/crypto-mining software
- And much more...

These are what's known as supply chain attacks and they've been rising in frequency over the
past few years and the ramifications have been massive. With these supply chain attacks, hackers
have been able to compromise large companies and exfiltrate personal information.

A quick google search "npm supply chain attacks" is enough to show that this is a serious issue.

---

There have been a few attempts to solve this, but in my opnion the existing solutions are not enough.

- Snyk/Dependabot - Look up packages to see if any vulnerabilities have been reported to public CVE databases

- Socket.dev - Which actually does deep inspection into what each package in your supply chain does and gives you deep insights (e.g. package uses network, etc.). I actually really like what Socket is doing, but it's still not enough.

In my opinion, in order to make sure that our Node applications are actually safe, we need runtime protection. This is where Hagana comes in.

### The solution
