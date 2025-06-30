---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-sep-16-shipping-from-github-to-maven-central-and-s3-using-travis-ci'
headline: 'Shipping from GitHub to Maven Central and S3, using Travis-CI'
date: '2014-09-16'
authors: [John Duffell]
standfirst: 'If you use GitHub and SBT and want to ship your artifacts to Maven Central, you want it to be simple to set up and manage. We’ve compiled some instructions on how our SBT plugin can help'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/9/15/1410798357474/15055624290_a85030730f_o-2060x1236.jpeg'
  alt: 'Shipping is complex and requires lots of organisation'
  credit: 'Photograph: Steven Straiton/flickr'
tags: [Computing, Git, Programming, Scala]
---

Introduction
------------

As part of open sourcing our scala-automation framework, we wanted to open the build and artifacts and put them in the cloud. Our requirements were simple. Firstly, we wanted to run our automated tests on every commit to scala-automation. Secondly, to make things simple for users, we wanted to be able to kick off a release by simply tagging the master branch with the version number we wanted to release. For us, a release consists of both sending signed binaries to Maven Central and publishing a useful changelog on the web. Finally, we wanted to avoid making commits back to our GitHub repo during the release process, as is done by the sbt-release plugin.

Our plugin relies on sbt-git, sbt-sonatype, sbt-pgp and sbt-s3, so you must fulfil their requirements to use it.

Follow the steps below to use our plugin on your own SBT project.

Step 1: Setting up your PGP key and Sonatype account
----------------------------------------------------

Set up the sbt-sonatype plugin as per the SBT documentation: [http://www.scala-sbt.org/0.13/docs/Using-Sonatype.html](http://www.scala-sbt.org/0.13/docs/Using-Sonatype.html)

Test that you can run _sbt publish-signed_ and _sbt sonatypeReleaseAll_ using [http://www.scala-sbt.org/sbt-pgp/](http://www.scala-sbt.org/sbt-pgp/) and [https://github.com/xerial/sbt-sonatype](https://github.com/xerial/sbt-sonatype)

Step 2: Preparing your Secrets
------------------------------

Firstly, add the following line to your _.gitignore_

```text
local.*
```

Secondly, copy your _pubring.gpg_ and _secring.gpg_ to the project directory as _local.pubring.gpg_ and _local.secring.gpg_.

Finally, move your secrets to a new file _local.credentials.sbt_ as follows:

```scala
import com.typesafe.sbt.SbtPgp._

// this has to go in an sbt file because if we use an external
// credentials properties file it ignores it
credentials += Credentials(
  “Sonatype Nexus Repository Manager”,
  “oss.sonatype.org”,
  “<SONATYPE_USERNAME>”,
  “<SONATYPE_PASSWORD>”
)

pgpPassphrase := Some(“<PGP_PASSPHRASE>”.toCharArray)

credentials += Credentials(
  “Amazon S3”,
  “<YOUR_S3_BUCKET>.s3.amazonaws.com”,
  “<AMAZON_API_USER_KEY>”,
  “<AMAZON_API_PASSWORD_KEY>”
)
```

Background: Why use Travis CI?
------------------------------

[Travis](https://travis-ci.org/) is an established cloud-based build system, free for open source projects. It takes your source and a special .travis.yml build definition from your public repo, runs the build on a build engine, and reports the high level result. Other features include automatically emailing you when your builds finish, and updating the widget on GitHub pull requests with the build status.

There are several things I like about Travis - you don’t have to manage or pay for the servers, it’s tried and tested, and it’s very simple. Unfortunately, unlike many other build systems, Travis doesn’t include an integrated file store for your build output – only the console output is retained and it’s up to you to save artifacts somewhere else. Since Amazon S3 provides storage and web access, and has an sbt-s3 plugin, it’s a good place to store any necessary files.

Shipping from a build engine is repeatable and secure, and access can be controlled through the repository.

Step 3: Encrypting your secret files
------------------------------------

It’s easy to encrypt variables using the travis command – see [http://docs.travis-ci.com/user/encryption-keys/](http://docs.travis-ci.com/user/encryption-keys/)

Choose a strong encryption password. It is important that it is strong because people can download your encrypted files and brute force attack them locally. You won’t have to type this password regularly.

Firstly, run these commands to let Travis CI know your password.

```text
gem install travis
cd <YOUR_LOCAL_MIRROR>
travis encrypt ENCRYPTION_PASSWORD=<YOUR_ENCRYPTION_PASSWORD> --add
```

Secondly, encrypt your secret files with your password.

```text
openssl aes-256-cbc -in local.secring.gpg -out secring.gpg.enc -pass pass:<YOUR_ENCRYPTION_PASSWORD>
openssl aes-256-cbc -in local.pubring.gpg -out pubring.gpg.enc -pass pass:<YOUR_ENCRYPTION_PASSWORD>
openssl aes-256-cbc -in local.credentials.sbt -out credentials.sbt.enc -pass pass:<YOUR_ENCRYPTION_PASSWORD>
```

Finally, edit _.travis.yml_ to add these lines. This tells travis to decrypt your files during the build.

It it important to use $ENCRYPTION\_PASSWORD as shown and **not** substitute your real password here as this file will be unencrypted in your repository.

```yaml
before_install:
- openssl aes-256-cbc -pass pass:$ENCRYPTION_PASSWORD -in secring.gpg.enc -out local.secring.gpg -d
- openssl aes-256-cbc -pass pass:$ENCRYPTION_PASSWORD -in pubring.gpg.enc -out local.pubring.gpg -d
- openssl aes-256-cbc -pass pass:$ENCRYPTION_PASSWORD -in credentials.sbt.enc -out local.credentials.sbt -d
```

Now when the Travis build runs, the files should be decrypted automatically.

Background: Generating a Change Log
-----------------------------------

Usually, users want a decent changelog so they know whether or not to take a new version. I liked the idea, but didn’t like extra hassle of writing it. I decided to share the hassle by pulling the changelog from the git history, thereby making it everyone’s job. I decided that most of the commits were too low level to include, but pull requests usually provide useful information, and with the default comment that github includes, I could link back to the pull request from a changelog.

For implementation, I decided that it would be simplest to parse the output of git log with parser combinators, and transform it to HTML. You can [see my implementation here](https://github.com/guardian/sbt-sonatype-release/blob/master/src/main/scala/com/gu/release/ChangeLogBuild.scala).

Generating the changelog was fine, but I needed to upload it somewhere. I decided AWS S3 would do, as you can store static files there cheaply and serve them over HTTP.

I found a sbt-s3 plugin at [https://github.com/sbt/sbt-s3](https://github.com/sbt/sbt-s3) and decided to use that for my plugin.

Step 4: Configuring the sbt-sonatype-release plugin
---------------------------------------------------

Firstly, edit your _project/plugins.sbt_ and add this line:

```scala
addSbtPlugin(“com.gu” % “sbt-sonatype-release” % “1.0”)
```

Next edit your _build.sbt_ to configure the plugin:

```scala
lazy val root = (project in file(“.”)).enablePlugins(ShipAutoPlugin)

pgpSecretRing := file(“local.secring.gpg”)

pgpPublicRing := file(“local.pubring.gpg”)

mappings in upload ++= Seq((new java.io.File(“docs/changelog.css”),”changelog.css”))

host in upload := “YOUR_S3_BUCKET.s3.amazonaws.com”
```

Finally, make sure your _.travis.yml_ runs the sbt-sonatype-release target:

```yaml
script: sbt testAndOptionallyShip
```

Step 5: Kicking off a Release
-----------------------------

Since Travis is driven from GitHub, we need to indicate in the repo when we want a new release to take place. The cleanest workflow is to tag master with the version number we want to release, then the build can do some extra steps to do the release.

To kick off a release – in this example v1.0 – just run the following two commands:

```text
git tag -a v1.0 -m "new version shipped"
git push origin v1.0
```

Check Travis CI to monitor your build. Once it has completed, your artifacts should be available.

Summary
-------

We have set up an SBT project to ship to Maven Central and save a changelog to AWS using the sbt-sonatype-release plugin. Now, every time the master branch is tagged vN.NN a new version will automatically ship.

sbt-sonatype-release source is at [https://github.com/guardian/sbt-sonatype-release](https://github.com/guardian/sbt-sonatype-release) I’d love to see your comments and pull requests.

Links and Examples
------------------

To see examples in use, look at our scala-automation project:

*   [https://github.com/guardian/scala-automation/blob/master/project/plugins.sbt](https://github.com/guardian/scala-automation/blob/master/project/plugins.sbt)  
    
*   [https://github.com/guardian/scala-automation/blob/master/build.sbt](https://github.com/guardian/scala-automation/blob/master/build.sbt)  
    
*   [https://github.com/guardian/scala-automation/blob/master/.travis.yml](https://github.com/guardian/scala-automation/blob/master/.travis.yml)

You can see the resultant artefacts at:

*   [http://repo1.maven.org/maven2/com/gu/scala-automation\_2.10/](http://repo1.maven.org/maven2/com/gu/scala-automation_2.10/)

The generated Change Log is public at:

*   [http://scala-automation.s3-website-eu-west-1.amazonaws.com/scala-automation-changelog.html](http://scala-automation.s3-website-eu-west-1.amazonaws.com/scala-automation-changelog.html)
