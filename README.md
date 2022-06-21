<p align="center">
<img src="https://raw.githubusercontent.com/yaakov123/hagana/master/assets/hagana.svg">
<h1 align="center">Hagana</h1>
</p>

Hagana provides runtime protection for your NodeJS applications from malicious packages.

## **Installation**

In order to get started with Hagana all you need to do is run:

```console
npm i hagana
```

Then, at the entrypoint of your application import the Hagana library

```javascript
import hagana from "hagana";
```

Behind the scenes, this will enable:

- File system protection
- Network protection
- Command execution protection

Let's dig a bit deeper into what each one of those options means.

The first thing that needs to be explained is the difference between 1st and 3rd party code.

_1st party code_ - is the code that **you** write. This code has privileged access and is not affected by Hagana's protection.

_3rd party code_ - is the code that is added by way of `npm i` and is located generally located in the `node_modules` folder.

> 💭 If your 3rd party code is **not** located in `node_modules` then you can tell Hagana where it is by running:

```js
import hagana from "hagana";
hagana.setModulesFolder("libs");
```

---

**1. File system protection.**

Hagana's file system protection works by creating a sandbox around your project folder. It tries to determine what the root directory is automatically in order to create the sandbox correctly.

The sandbox essentially prevents 3rd party code from reading/writing to/from the file system that's outside of the project root.

## **The problem**

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

## **The solution**

Hagana takes a novel approach to securing your application. At the moment it protects against the following issues.

### **Unauthorized file system access**

The approach I've taken in Hagana is to create a file system sandbox which **only** allows access to files **within your project.**

As seen in a recent attack discovered by [JFrog](https://jfrog.com/blog/npm-supply-chain-attack-targets-german-based-companies/) the first step is to read information from `['package.json', '/etc/hosts', '/etc/resolv.conf']`.
This is a classic example of unauthorized file system access. Why should a package that you installed have access to files located in `/etc/*`?

**Hagana would have blocked this outright!**

But let's say that for whatever reason, you decided to globally allow file system access to all packages...

### **Unauthorized network access**

Essentially Hagana shuts down all outbound network communication (currently only over `http/https`, `dns/websocket` are coming soon). It's then up to you to whitelist the hosts which you would like allow outbound traffic.

You can decide to only allow outbound traffic to `["myservices.com", "allowedservices.com"]`

To continue to the next step in the aforementioned JFrog attack.

The next step in the attack is to take the data that was read from your file system and send it to the attacker's server (`malicious-server.com/pii`).

**Once again, Hagana would have blocked this outright!**

But let's say that for whatever reason you decided to globally allow **all** network

### **Malcious use of spawn/exec**

In most NodeJS applications, the use of `child_process.spawn/exec` and similar functions is rarely necessary. Therefore, Hagana blocks all commands to start off with.
It's then up to you to decide which commands are allowed. For example, you can allow all node commands (`["node"]`), or only specific commands (`node --version`).

To continue to the next step in the JFrog attack.

The next step is to execute a malicious file that was retrieved using `spawnSync(path.join(process.cwd(), 'mac.dec.js')`.

**Once again, Hagana would have blocked this part of the attack outright!**
