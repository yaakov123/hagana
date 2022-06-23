<p align="center">
<img src="https://raw.githubusercontent.com/yaakov123/hagana/master/assets/hagana.svg">
<h1 align="center">Hagana</h1>
</p>

Hagana provides runtime protection for your NodeJS applications from malicious packages.

<p align="center">
<img src="https://raw.githubusercontent.com/yaakov123/hagana/master/assets/hagana.gif">
</p>

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

_3rd party code_ - is the code that is added by way of `npm i` and is generally located in the `node_modules` folder.

> 💭 If your 3rd party code is **not** located in `node_modules` then you can tell Hagana where it is by running:

```js
import hagana from "hagana";
hagana.setModulesFolder("libs");
```

---

**1. File system protection.**

Hagana's file system protection works by creating a sandbox around your project folder. It tries to determine what the root directory is automatically in order to create the sandbox correctly.

The sandbox prevents 3rd party code from reading/writing to/from the file system that's outside of the project root.

As mentioned previously, Hagana does a best effort attempt at finding the project root automatically, but if you'd like to tell it explicitly, you can do the following:

```js
import hagana from "hagana";

// Or whatever absolute path you'd like
hagana.setRoot(__dirname);
```

**2. Network protection.**

Hagana takes a zero-trust approach when it comes to outbound network activity. By default, no outbound traffic is allowed. You can allow outbound traffic by creating a whitelist of hosts as follows:

```js
import hagana from "hagana";

hagana.setAllowedHosts(["yourserver.com", "yourservices.com"]);
```

> ⚠️ So far, Hagana only blocks outbound traffic from packages that are using the `http` or `https` modules. Support for other modules (e.g. `net, dgram, dns`) is coming soon.

**3. Command execution protection.**

Hagana also takes a zero-trust approach when it commands to using functions like `child_process.spawn() or exec()` since these funcions have the potential to wreak havoc on your machine.

In most cases, you'll never actually need to run a command using one of these methods, but in case you do, Hagana allows you to create a whitelist of _safe_ commands.

```js
import hagana from "hagana";

// This will allow ALL commands that start with "node"
hagana.setAllowedCommands(["node"]);

// This will ONLY allow commands starting with "node --version" to be run
hagana.setAllowedCommands(["node --version"]);
```

As a general rule, it's always better to add specific commands to the whitelist.

> ⚠️ Something that I still need to think about is the fact that using the "commands startsWith" approach is it opens a hole that allows an attacker to run `node --version && cat ~/.ssh/id_rsa` which is clearly a problem.

---

> To see a complete list of which functions Hagana protects see [Coverage](#coverage)

---

> #### Before you get too excited, there are a few limitations that still need to be solved before this is a 100% complete solution to supply chain attacks.

> #### A large amount of supply chain attacks occur in the `preinstall/postinstall` scripts inside the package.json file. I do have a solution for this, but I wanted to get a minimum viable solution out for runtime protection out first.

> #### Once I have the solution for this ready, it will be released as a different package (most likely as a cli) which will allow for the safe execution of `npm i`

---

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

- Snyk/Dependabot - Look up packages to see if any vulnerabilities have been reported to public CVE databases. This is clearly not enough to stop an active supply chain attack.

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

As mentioned before, Hagana uses a zero-trust approach to locking down network access so you need to whitelist the allowed hosts.

To continue to the next step in the aforementioned JFrog attack.

The next step in the attack is to take the data that was read from your file system and send it to the attacker's server (`malicious-server.com/pii`).

**Once again, Hagana would have blocked this outright!**

But let's say that for whatever reason you decided to globally allow **all** network

### **Malcious use of spawn/exec**

In most NodeJS applications, the use of `child_process.spawn/exec` and similar functions is rarely necessary. Therefore, Hagana blocks all commands to start off with and allows you to whitelist specific commands that you need.

To continue to the next step in the JFrog attack.

The next step is to execute a malicious file that was retrieved using `spawnSync(path.join(process.cwd(), 'mac.dec.js')`.

**Once again, Hagana would have blocked this part of the attack outright!**

### Coverage

#### File system

- `fs.readFile`
- `fs.readFileSync`
- `fs.promises.readFile`
- `require`
- `fs.writeFile`
- `fs.writeFileSync`
- `fs.promises.writeFile`
- `fs.open`
- `fs.openSync`
- `fs.promises.open`

#### Network

- `http.request`
- `https.request`

#### Commands

- `child_process.exec`
- `child_process.execSync`
- `child_process.execFile`
- `child_process.execFileSync`
- `child_process.spawn`
- `child_process.spawnSync`
