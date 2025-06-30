---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-may-13-improving-sass-code-quality-on-theguardiancom'
headline: 'Improving Sass code quality on theguardian.com'
date: '2014-05-13'
authors: [Kaelig Deloumeau-Prigent]
standfirst: 'Automating code quality control is an old trick that we''ve been using with JavaScript for a long time. Here is how we apply the same rigorous process to Sass code (the CSS pre-processor we use) in our workflow.'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/5/13/1399980610692/aeb06fca-26f3-4982-be90-a54004e8a8dc-2060x1236.jpeg'
  alt: 'Sass linting on a Guardian developer''s laptop'
  credit: 'Photograph: Kaelig Deloumeau-Prigent'
tags: [CSS, JavaScript, Software]
---

On the Guardian beta website, about 25 people contribute to our CSS/Sass codebase, accounting for around 16K lines of code. Since so many people edit code on a daily basis, things can go wrong pretty fast if we don’t pay attention to every line of code submitted to the codebase. Thankfully, we can automate _some_ of that process with a _linter_.

A linter is a program that parses your code and logs potential issues, whitespace irregularities and violations of coding conventions.

We automate this process to promote readable and consistent coding styles. The ultimate goal is to have our whole codebase look like the same person wrote it. [Coding style matters](http://www.smashingmagazine.com/2012/10/25/why-coding-style-matters/) because code is a communication tool between developers, with its grammar and set of rules as in any written language. If not enforced, the code is difficult to read, and developers might not understand the intent behind the code, leading to bad refactoring and more [code smells](http://csswizardry.com/2012/11/code-smells-in-css/). It may result into a snowball effect, rushing towards doom and destruction.

Linting our JavaScript codebase has become [a banal practice](http://blog.teamtreehouse.com/improving-code-quality-jshint), but when it comes to CSS, it’s rarely been a casual thing to put in place. [CSSLint](https://github.com/CSSLint/csslint) can be a great tool for code quality control, but it does not play well with codebases using a CSS pre-processor.

Recently I’ve discovered [scss-lint](https://github.com/causes/scss-lint), a linter for [Sass](http://www.sass-lang.com/), the CSS pre-processor we are using at the Guardian. scss-lint is a ruby gem that you can install by typing in a terminal:

```text
$ gem install scss-lint
```

Then you can lint your codebase by typing:

```text
$ scss-lint path/to/your/sass/files
```

scss-lint then parses all your files looking for issues. Note that you can configure what types of issues it should warn you of (explained further down).

Here is the type of output you can expect:

```text
filename:line [Severity: W for warning, E for Error] Reason
```

For example if you ran scss-lint in our codebase you’d find these warnings:


   <figure>
   <img alt="Warnings reported by scss-lint to developers in a terminal" src="https://i.guim.co.uk/img/static/sys-images/Guardian/Pix/pictures/2014/5/13/1399981111680/c8a28a26-fb8b-4dba-9b10-573c15a0ec29-620x438.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=a30a8e55e89c99e803458b0ad2c4c3f9" loading="lazy" />
   <figcaption>
     Warnings reported by scss-lint to developers in a terminal, using a custom grunt task.
    <i>Photograph: Kaelig Deloumeau-Prigent</i>
    </figcaption>
    </figure>

Developers could get this feedback every time they commit code, helping them fixing problems along the way.

Lint your Sass codebase with your own coding conventions
--------------------------------------------------------

Each team has its own conventions, and you should adapt your configuration to match them. scss-lint supports many “linters”: simple instructions that verify one coding convention at a time. A list of all available linters is [documented in their GitHub repository](https://github.com/causes/scss-lint/blob/master/lib/scss_lint/linter/README.md).

To choose which linters to run on your codebase, specify them in a YAML file. By default, this configuration file is .scss-lint.yml, located at the root of your project. You can have a look at all the [default settings](https://github.com/causes/scss-lint/blob/master/config/default.yml), and copy-paste them into your configuration file.

In the case of the Guardian frontend application, our .scss-lint.yml configuration file would look [something like this](https://github.com/guardian/frontend/blob/master/.scss-lint.yml). We’ll be experimenting with this for a while, and later publish an in-house coding styleguide for Sass, JavaScript and other languages that all client-side developers can refer to.

Excluding some files and directories
------------------------------------

Since our bower components (stored into components/, relative to our stylesheets) might not respect our coding conventions, we prevent them from being linted with this directive:

```yaml
exclude: 'common/app/assets/stylesheets/components/*'
```

That’s useful to focus on the warnings found in our own code, not in third party dependencies.

Sometimes you’ll also want to exclude specific files from being linted with a particular rule. For example we had two files for which a rule does not apply. Here is how we excluded them:

```yaml
# .scss-lint.yml
  DuplicateProperty:
    enabled: true
    exclude:
      - common/app/assets/stylesheets/base/_type.scss # We need to declare font-size twice
      - common/app/assets/stylesheets/_mixins.scss
```

Automation with grunt
---------------------

Yes, there is a grunt plugin for this, too. I’ve used [grunt-scss-lint](https://github.com/ahmednuaman/grunt-scss-lint). So far it has proved to be an easy way to bundle scss-lint into our build process.

Installation is seamless and only takes a couple of minutes to complete. Follow the steps in the [Getting Started](https://github.com/ahmednuaman/grunt-scss-lint#getting-started) section of the readme to get it up and running.

Once grunt-scss-lint is installed, it is time to add its task to our Gruntfile.js file.

In our case we associated the task validate:sass to the linting process:

```javascript
// Gruntfile.js — https://github.com/guardian/frontend/blob/master/Gruntfile.js
module.exports = function (grunt) {
    grunt.initConfig({
    // […]
        // Lint Sass sources
        scsslint: {
            allFiles: [
                'common/app/assets/stylesheets'
            ],
            options: {
                bundleExec: true,
                config: '.scss-lint.yml',
                reporterOutput: null
            }
        }
    // […]
    });
    grunt.registerTask('validate:sass', ['scsslint']);
};
```

Developers can lint their code using:

```text
$ grunt validate:sass
```

This validate:sass task comes in addition to other tasks, validate:css and validate:js which all help us keep our code consistent and readable.

So far I’ve used it mostly to detect errors and flag coding convention issues to the team. The next step is to enforce linting in the coding workflow, so that developers can only push Sass code that respects our coding conventions, durably ensuring the quality of code.

We spend a tremendous amount of time flagging and fixing whitespace and indentation problems during code reviews. This is one of the areas where automated linting will make us more productive in the long run.

This has a direct benefit for our readers: instead of looking for errors in the code, engineers can spend more time on building a great product together.
