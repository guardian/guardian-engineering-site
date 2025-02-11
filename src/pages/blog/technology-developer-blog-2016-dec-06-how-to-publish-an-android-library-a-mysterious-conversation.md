---
layout: ../../layouts/blog.astro
slug: 'technology-developer-blog-2016-dec-06-how-to-publish-an-android-library-a-mysterious-conversation'
headline: 'How to publish an Android library: a mysterious conversation'
date: '2016-12-06'
authors: [Max Spencer]
standfirst: 'I recently met a rather mysterious Android developer called Nick and helped him to publish his first library on Bintray.'
image:
  url: 'https://media.guim.co.uk/8378140cb91b0f2612af3a658a65002d20b34712/0_0_2425_1864/2425.jpg'
  alt: 'John Payne, Maureen O’Hara, Edmund Gwenn and Natalie Wood in Miracle On 34th Street (1947)'
  credit: 'Photograph: Allstar/20 Century Fox'
tags: [Android]
---

I recently met a rather mysterious chap called Nick. Nick was a hobbyist [Android](https://www.theguardian.com/technology/android) developer and he wanted to know how he could publish some of his code as a library for other developers to use. Having done the same thing earlier this year, I did my best to help.

**Nick:** Ho ho ho, hullo Max!

**Max:** Err, hi... I’m not sure I know you?

**Nick:** Oh... no, I don’t know you either... But hello anyway, I’m Nick and it’s jolly good to meet you!

**Max:** Nice to meet you too Nick.

**Nick:** I’ll get right to the point, I was hoping you might be able to help me with a little Android project of mine? I’ve been dabbling in Android development and now I’ve got some code which I think other developers might find useful. I want to publish it as a library, but I’m not sure where to start.

**Max:** Okay, well one of the easiest ways to do that is to use a website called [Bintray](https://bintray.com).

**Nick:** I think I’ve heard of that...

**Max:** Yeah, a lot of libraries are hosted there. The default source for dependencies in all new Android Studio projects is a Bintray _respository_ called [JCenter](https://bintray.com/bintray/jcenter).

To publish your code as a library on Bintray there are three steps:

1.  Get all the library code into its own _library module_ in Android Studio.
    
2.  Set up an account on Bintray along with a repository and a _package_ for your library.
    
3.  Add some code your to the build.gradle file.

**Nick:** Alright, how long will all that take? Do you mind going through it together now?

**Max:** Sure, it shouldn’t take too long.

A library module
----------------

**Nick:** The code I want to share, at the moment it’s just part of an actual Android app I’ve been working on.

**Max:** That’s fine, we can create a new module within that existing project and publish only that.

**Nick:** OK, so I go to “File” > “New” > “New Module...”, then is it this one, “Android Library”?

**Max:** Yep, that’s it. Now you need a name and make sure the package name of the new module is different to that of the app or it won’t build.

**Nick:** Okay well the app is called the Electronic List Facility (ELF), but I can call the library “Naughty or Nice” and then the module name will be “naughtyornice” and the package name “northpole.nick.naughtyornice”.

**Max:** ... What does this code do Nick?

**Nick:** Ho ho ho, well you see it’s for checking whether someone is on the naughty list or the nice list.

**Max:** Wait, who are...

**Nick:** Er... right anyway. I’ve made my new library module and I’ve moved all the code I want to publish into it.

**Max:** That was quick! Just for future reference, in case you want to write a library from scratch: When you start a new project in Android Studio it will normally make you a single “Phone & Tablet Application” module called “app”. Don’t write your library code in this app module, even if there’s nothing else in there. You still need to make a new _library_ module.

**Nick:** I’ll keep that in mind, thanks. What’s next?

Bintray
-------

**Max:** Now we’ve got to set everything up on Bintray. Start by going to [bintray.com](https://bintray.com) and creating an account. Bintray have two premium tiers which you have to pay for, but you can sign up for [the free “Open Source Plan”](https://bintray.com/signup/oss).

**Nick:** Okay, username: “northpolecoder”.

**Max:** Hmmm... Anyway, once you’re signed in you need to make a Maven respository.

**Nick:** Here we go, “Add New Repository”. Now the type is “Maven”. What shall I name it?

**Max:** How about “android”?

**Nick:** Done, it says “Repo created successfully”.

**Max:** Now inside that respository create a new package for your library.

**Nick:** OK, so “Add New Package” and now I just have to fill in a few details here. I’ll name the package “naughtyornice” too.

**Max:** Good. If you’re not sure which license to use there’s a website, [choosealicense.com](https://choosealicense.com) to help you.

**Nick:** Thanks, but I’m good with MIT. That’s done, we’ve got [the Maven repository](https://bintray.com/northpolecoder/android) and [the package](https://bintray.com/northpolecoder/android/naughtyornice) inside it.

**Max:** There’s one last thing to do on Bintray. Click on your username at the top there, on the right, then click “Edit Profile”. And now “API Key” on the left hand side.

**Nick:** OK.

**Max:** Now go to Android Studio and create a new file in the root of your project called “bintray.properties” and then put in there:

```text
user=northpolecoder
key=
```

and then copy the API key from Bintray and paste it after “key=”. Oh and add bintray.properties to your .gitignore!

Gradle
------

**Max:** The final step is configuring gradle so it can upload the library to your Bintray repository, that’s why we needed that API key. Open up your project-level build.gradle.

**Nick:** Okay, the build.gradle in the project’s root folder, not the one inside the module?

**Max:** Yes. Add these two new plugins as buildscript dependencies:

```text
classpath 'com.github.dcendents:android-maven-gradle-plugin:1.5'
classpath 'com.jfrog.bintray.gradle:gradle-bintray-plugin:1.7'
```

**Nick:** So that’s inside “buildscript { dependencies { ...”?

**Max:** Yeah. Now close your project-level build.gradle and open the build.gradle of your new library module.

**Nick:** OK.

**Max:** Near the top of that file add in these two lines to apply the new plugins:

```text
apply plugin: 'com.github.dcendents.android-maven'
apply plugin: 'com.jfrog.bintray'
```

Then at the bottom of that file you need to add... Well, hold on, just copy and paste this and change the values as required.

**Nick:** OK, let’s see... Right, here’s what my build.gradle looks like now:

```
apply plugin: 'com.android.library'
apply plugin: 'com.github.dcendents.android-maven'
apply plugin: 'com.jfrog.bintray'

android {
    compileSdkVersion 24
    buildToolsVersion "24.0.1"

    defaultConfig {
        minSdkVersion 9
        targetSdkVersion 24
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "android.support.test.runner.AndroidJUnitRunner"

    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    compile fileTree(dir: 'libs', include: ['*.jar'])
    androidTestCompile('com.android.support.test.espresso:espresso-core:2.2.2', {
        exclude group: 'com.android.support', module: 'support-annotations'
    })
    compile 'com.android.support:appcompat-v7:24.2.1'
    testCompile 'junit:junit:4.12'
}

task sourcesJar(type: Jar) {
    from android.sourceSets.main.java.srcDirs
    classifier = 'sources'
}

task javadoc(type: Javadoc) {
    source = android.sourceSets.main.java.srcDirs
    classpath += project.files(android.getBootClasspath().join(File.pathSeparator))
}

task javadocJar(type: Jar, dependsOn: javadoc) {
    classifier = 'javadoc'
    from javadoc.destinationDir
}

artifacts {
    archives javadocJar
    archives sourcesJar
}

group = 'northpole.nick.android'
version = '0.1.1'

install {
    repositories.mavenInstaller {
        pom.project {
            name 'Naughty or Nice'
            description 'A library for finding out whether someone is on the naughty list or the nice list'
            url 'https://github.com/northpolecoder/elf'
            inceptionYear '2016'

            packaging 'aar'
            groupId 'northpole.nick.android'
            artifactId 'naughtyornice'
            version '0.1.1'

            licenses {
                license {
                    name 'The MIT License (MIT)'
                    url 'https://opensource.org/licenses/MIT'
                }
            }
            scm {
                connection 'https://github.com/northpolecoder/elf.git'
                url 'https://github.com/northpolecoder/elf'

            }
            developers {
                developer {
                    id = 'northpolecoder'
                    name 'Nick'
                }
            }
        }
    }
}

Properties bintrayProperties = new Properties()
bintrayProperties.load(project.rootProject.file('bintray.properties').newDataInputStream())

bintray {
    user = bintrayProperties.getProperty('user')
    key = bintrayProperties.get('key')
    configurations = ['archives']
    pkg {
        repo = 'android'
        name = 'naughtyornice'
        userOrg = 'northpolecoder'
        licenses = ['MIT']
        vcsUrl = 'https://github.com/guardian/piper.git'
        publish = true
        version {
            name = '0.1.1'
            desc = 'Naughty or Nice 0.1.1'
            released = new Date()
            vcsTag = 'v0.1.1'
        }
    }
}

```

**Max:** Looks great.

**Nick:** What next?

**Max:** That’s it, you’re ready to publish. All you have to do is run:

```text
./gradlew install bintrayUpload
```

As a dependency
---------------

**Nick:** Ho ho ho! Brilliant! If only distributing presents were this easy!

**Max:** Hmmm...

**Nick:** Now how does another developer add this as a dependency?

**Max:** First they need to reference your Bintray repository in their project-level build.gradle:

```text
allprojects {
  repositories {
    // ...
    maven { url 'https://dl.bintray.com/northpolecoder/android' }
  }
}
```

Then they reference the library itself in their module-level build.gradle:

```text
dependencies {
  // ...
  compile 'northpole.nick.android:naughtyornice:0.1.1'
}
```

But it can be even easier. If you can add your package to the default JCenter repo, which we mentioned earlier, then most developers will only need this second change to their module-level build.gradle. There are [instructions about how to add your package to JCenter](https://bintray.com/docs/usermanual/uploads/uploads_promotingyourmaterial.html#_including_your_package_in_jcenter) on the Bintray website.

**Nick:** I’ll have a look at that later. Also, I think I’ll put [the whole ELF project on GitHub](https://github.com/northpolecoder/elf), it might be helpful as an example for other developers who want to publish a library of their own.

**Max:** Good idea Nick.

**Nick:** Ho, look at the time, I’m afraid I’ve got to be getting home. I don’t suppose you have a mince pie for the road?

**Max:** Afraid not, I’ve eaten them all.

**Nick:** Oh well, it’s probably for the best with Christmas Eve coming up. Anyway thanks a lot for your help Max, it was good to see you again. Goodbye! And Merry Christmas!
