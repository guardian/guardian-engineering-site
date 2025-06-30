---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2014-feb-14-encrypting-sensitive-data-in-puppet'
headline: 'Encrypting sensitive data in Puppet'
date: '2014-02-14'
authors: [Simon Hildrew]
standfirst: 'Moving to DevOps ideally means sharing configuration management data with developers, without losing control of production passwords and private SSL keys. Intelligently encrypting sensitive data with hiera-eyaml makes it possible to share almost everything without the obfuscation slowing you down.'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2014/2/14/1392388020077/94674435-94ab-4f80-a50c-9bf39487ca44-1020x414.png'
  alt: 'Editing EYAML in VIM'
  credit: 'Photograph: Simon Hildrew'
tags: [DevOps]
---

These days, a configuration management system of some sort is pretty much essential in looking after any more than a handful of servers. At the Guardian, the operations team have been using [Puppet](http://puppetlabs.com/) to do this since 2007 and our Puppet manifests now describe a large portion of our servers. This inevitably includes passwords for databases as well as private SSH and SSL keys.

As we have increasingly moved towards a [DevOps](http://en.wikipedia.org/wiki/DevOps) way of working, there has been an increasing desire for the operations team to share the Puppet [manifests](http://en.wikipedia.org/wiki/Manifest_file) openly with the development teams. The benefit of this is that developers will understand how the servers are configured and be able to make simple changes themselves. The objection to this is that developers will have easy access to all of the passwords and private keys. You may well argue that in a healthy DevOps environment we should trust our developers not to abuse access to such information – and you’d be right – but it is much easier to justify giving wider access to the manifests if the risk of deliberate or accidental abuse is negligible.

For a long time I thought the solution to this was to divide the manifests into two git repos. One containing the sensitive data and another containing the remainder, with the developers only having access to the latter. The two can be merged together on the puppet masters and be deployed to individual servers as one set of files. A better alternative, however, is to encrypt the sensitive data and leave it in the repository.

The natural place for sensitive data in Puppet is [Hiera](http://projects.puppetlabs.com/projects/hiera) - a simple hierarchical database that holds values for keys, typically in [YAML](http://en.wikipedia.org/wiki/YAML) files. It follows that Hiera is the natural place to provide a mechanism for dealing with encrypted data, and this is indeed the case.

Last summer I finally got round to tackling this problem and started by trying to use the [hiera-gpg](https://github.com/crayfishx/hiera-gpg) plugin. The plugin is brutally simple. You encrypt the entire YAML file using GPG and add it to your Hiera directory as normal. When a server requires an encrypted piece of information, the puppet master uses a private key in order to decrypt and return it. Users of the repo only have access to encrypted copies of the sensitive data. It does the job remarkably well.

The major downside of using this is that the resulting encrypted files are completely opaque. It’s hard to see where a value comes without decrypting some or all of the encrypted files; editing the files turns out to be a fairly clunky experience and finally you cannot see what has been modified in the revision history of a source control repository: a diff only tells you that it has changed and nothing more.

I found that someone [had blogged](http://slashdevslashrandom.wordpress.com/2013/06/03/my-griefs-with-hiera-gpg/) about these shortcomings and proposed a solution. It turned out that a guy named Tom Poulton [had seen the blog](http://themettlemonkey.wordpress.com/2013/07/15/hiera-eyaml-per-value-encrypted-backend-for-hiera-and-puppet/) and created an alternative called [hiera-eyaml](https://github.com/TomPoulton/hiera-eyaml). In a nutshell, hiera-eyaml allows you to place blocks of encrypted text in otherwise plain text YAML files. A typical block looks like this:

```
ENC[PKCS7,Y22exl+OvjDe+drmik2XEeD3VQtl1uZJXFFF2NnrMXDWx0csyqLB/2NOWefv
    NBTZfOlPvMlAesyr4bUY4I5XeVbVk38XKxeriH69EFAD4CahIZlC8lkE/uDh
    jJGQfh052eonkungHIcuGKY/5sEbbZl/qufjAtp/ufor15VBJtsXt17tXP4y
    l5ZP119Fwq8xiREGOL0lVvFYJz2hZc1ppPCNG5lwuLnTekXN/OazNYpf4CMd
    /HjZFXwcXRtTlzewJLc+/gox2IfByQRhsI/AgogRfYQKocZgFb/DOZoXR7wm
    IZGeunzwhqfmEtGiqpvJJQ5wVRdzJVpTnANBA5qxeA==]
```

Here we see the ENC\[ marker at the start of the block and the last \] showing the end of the block. Inside we have the encryption format being used (in this case [PKCS#7](http://en.wikipedia.org/wiki/PKCS), but GPG is also supported) and then the cipher text after base 64 encoding. These blocks can – in theory – be placed anywhere, but in practice are only used in the value elements of YAML files.

I started helping out on the project, adding GPG encryption and making it really easy to make edits that make sense when using git diff to look at the history. Specifically, the bundled command line tool now has an edit mode that decrypts the encrypted blocks and then launches your editor with a plain text version. You can then edit any existing blocks and add new ones and simply quit your editor to automatically re-encrypt the changes. The edit mode is smart enough to track the decrypted blocks and re-encrypt only those that have changed. This means that you end up with a minimal and meaningful diff:

```
git diff test.eyaml
index ccf3533..74ceaa3 100644
--- a/test.eyaml
+++ b/test.eyaml
@@ -1,5 +1,5 @@ 
---
plain-property: You can see me 
encrypted-property: ENC[PKCS7,MIIBiQYJKoZIhvcNAQcDoIIBejCCAXYCAQAxggEhMIIBHQIBADAFMAACAQAwDQYJKoZIhvcNAQEBBQAEggEAxqeLyrOtMJy392yNwpNUKPIJ441SRVAMNi84wEGZVc9TIsRkWmMJGxpe+jy9edqnl552pbmD+B5ecfYQ5dehDVeos2CzFrMoCAV+qqvYml1nkbiBdPreZeUVZCLQLOw9I03z+iSEokGUy0x9702zjjK1mafqHWC/ClzdZh1UGxd+1hyGrw/dDOVsZqdLT1bWT+MT5BiyVlmeHFDMy7XFuJkgER73t1WOC0sOrWwua37yKneDA/J5sFYrRypVD+QKLoFMtgxYYBldcenn+whBEJkMNrVTJzGkzo9HPaZ/dJFvBVGPDo6MxRqMFf2Tx/3Mq7bq6Ckoa6PNQiEz4BS88TBMBgkqhkiG9w0BBwEwHQYJYIZIAWUDBAEqBBAvO3CeT6tosqRc8VuufOo3gCB5JxY9ihIbnUJJl0Iuw0qeS6UsqKJ7HSst6+qRH90t5w==]
-another-encrypted-property: ENC[PKCS7,MIIBiQYJKoZIhvcNAQcDoIIBejCCAXYCAQAxggEhMIIBHQIBADAFMAACAQAwDQYJKoZIhvcNAQEBBQAEggEAK7otMYeHetnvkQVXQkjedR/2bXSA6KlDlI7rFBsrXpwsj5A8UBo8N3t5MgKx6kMPQN6T3ILNBA/1k7HFhRAsd5biJ2g1Y4NO8iS7Jedm+zlZ6MQPK0NNtU3+hNHYUfv63jmqKMb9GWswTPaS6fTiWz/+mLl1chWBuK9BW9b6xW6ObOxmK4kYf9xOo7w+OrJy02j4zLNVqCzOrb1zge5GvYmH1n+IncBz1WyPAoWJEjnFD1X6fdO32ulN1IYLzUSXkSVAASeN5Hb00/8GRtyQE1hNeS4ea640n/yHidGH3uTGnjNU9QoIqX7Yaqnpc/4E8WWY975gICNeFO/PBN1kLzBMBgkqhkiG9w0BBwEwHQYJYIZIAWUDBAEqBBDmVUe4sJBuxBVvmPAQcIhngCBx3IP8BWsyypcX3q8rRql3/GwPHeJ5moe6Mt1KEMcWpw==]
+another-encrypted-property: ENC[PKCS7,MIIBiQYJKoZIhvcNAQcDoIIBejCCAXYCAQAxggEhMIIBHQIBADAFMAACAQAwDQYJKoZIhvcNAQEBBQAEggEAAXFnNyjpJwaAAWb2MexUVdRPoIbWZJpjqdTg/5Fwnw7C9yg2URm+NuvVNeUPXKwVOLpmd+s9B558mW6njwZJaKkPqVF71y9IAaC3YHe0v6rHd685VtpUxVgTzarc7o2y/BjgDx5xypSk753ADbXLJdOM5SgpLFXV6VVVpE3EYAQ2KJ7LIUmeb8MjGplmWFbe2EHomMmqUeIjCgQHthK2FRucnCx3VI4QWbhG1T91Jc68TxWdRUqMEzAa6jiJclG79nBIpRI2cpn+uK/GD5TKsTDn8W9Bu+6ilUW+mC6SJC2krcsURsnirLM9BSnPbfGrt1kdiSctm1we2Miwv9Yf2zBMBgkqhkiG9w0BBwEwHQYJYIZIAWUDBAEqBBCrg594V+lpI5th8O0N0VDTgCBPFPmiW0uSq39dlqqdcbox3ZFuX30XwNyHNpJjXzBLeQ==] 
yet-another-encrypted-property: ENC[PKCS7,MIIBmQYJKoZIhvcNAQcDoIIBijCCAYYCAQAxggEhMIIBHQIBADAFMAACAQAwDQYJKoZIhvcNAQEBBQAEggEAZH7BRogBON6rHr0dYOVjbFea8R3AJIOc2nKRZqe63+X8Uf4h+ASMQ4w2PtdZ0B3sW2H5A4ZtS8Rt92rjHO8/pEEsPtKI9NewN7/RAg4+frhwO2gHcyywKNskJMfDqrc2jbXnOk91zurCJvUaS5IGbH56b/rlYkojj6yyiqVbb6Gkj2C/gjw+79eOffaDdOJphI5h0tU4sU7xhVm5J8JH0EqZSgFj8a5N++7gT3ny2ebSsqRLCECsOtrV5kT3Z2dMQfYV3GMsvoH12wb+zPQA1Gbg66A6HfY1U2kL/lBDSIXez8CWQqcs8b/WHR4wS4ujJfH51/0wzU5Qet9/m0tINjBcBgkqhkiG9w0BBwEwHQYJYIZIAWUDBAEqBBAIbbvZqY0B4I9e9NfItZ45gDAo5A2c5RgZ1giSBSDTtNI0WZaYHQn7cb12V8SfMhTrPY1X86tnIzdFOudXbe/KHZY=]
```

We’ve been using hiera-eyaml at the Guardian for several months now and once we had got over the hurdle of making sure we all have the entire team’s GPG keys it has become a low friction way of making changes. One of the additions I made early on was to add specifically named files in the directory of the hiera files that contained the list of recipients to which GPG blocks should be encrypted to – making it easy to ensure that an individual member of the team or the puppet master isn’t left out when creating or editing a block.

Whilst we haven’t quite got to the point where all developers have access to our manifests, the remaining reason is no longer political. It is simply the time and effort required to complete the work of locating and moving all of the sensitive data into hiera and eyaml.
