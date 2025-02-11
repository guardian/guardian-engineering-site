---
layout: ../../layouts/blog.astro
slug: 'info-2019-dec-20-securing-and-centrally-monitoring-accounts-in-amazon-web-services'
headline: 'Securing and centrally monitoring accounts in Amazon Web Services'
date: '2019-12-20'
authors: [Kate Whalen]
standfirst: 'An introduction to AWS Trusted Advisor, AWS StackSets and how they can support cloud security checks.'
image:
  url: 'https://media.guim.co.uk/59adfdd160d970207bd58a17c0e8990e54ab1001/0_2908_3419_2050/3419.jpg'
  alt: 'cctv cameras attached to an observation pole, with the sky and clouds in the background'
  credit: 'Photograph: John Rensten/Alamy'
tags: [AWS, Security]
---

Good feedback is specific, timely and actionable, therefore the Guardian’s Digital team decided to distill and centralise the information coming from Amazon Web Services. Whilst we have now started using AWS StackSets for other purposes, one of our first applications was aggregating the security reports from [Trusted Advisor](https://aws.amazon.com/premiumsupport/trustedadvisor/).

**What is Trusted Advisor and why is it awesome?**

Trusted Advisor is an optimisation tool for AWS, with an entire section dedicated to security. It is a good place to get started and we use it to check all our S3 bucket configurations.

Trusted Advisor will also flag open or overly permissive [security groups](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html). Security groups are the virtual firewalls of AWS and you can use them to control the traffic to your instances.

> a system should only be able to access the information and resources that are necessary for its legitimate purpose

If you think you have locked down your Security Groups and Trusted Advisor is findings false positives, be aware that if a security group has more than one rule for a specific port, then it is the **most permissive rule** that will be applied. Trusted Advisor helped us uncover and remove some duplicated rules. You may also find it necessary to delete overly permissive rules after creating rules that are more restrictive.

Trusted Advisor can help developers adhere to the principle of least-privilege. This means a system should only be able to access the information and resources that are necessary for its legitimate purpose.

**Why did we need to aggregate reports?**

Most of our infrastructure is held in AWS, divided across many accounts that are owned and managed by different development teams. Reviewing the Trusted Advisor reports for each account by logging into the console would be a long and repetitive task for anyone to be attempting on a regular basis.

Centrally monitoring accounts simplifies the task of checking, and can also widen access to the reports and findings, which hopefully empowers more developers to raise questions or take corrective actions.

**Getting started with AWS StackSets**

AWS StackSets are not a security tool directly, but they are a tool that can help you on your quest towards improving AWS security, or at least your AWS monitoring. In the context of AWS, a stack is a collection of resources that can be managed as a single unit. StackSets are a [CloudFormation](https://aws.amazon.com/cloudformation/) tool that extends the functionality of stacks by allowing the creation, update, or deletion of stacks across multiple accounts.

The [initial setup](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-prereqs.html) of a StackSet is quite manual, however if you think you will use more than one StackSet it is definitely worth doing.

You will need to select one of your accounts to become the StackSet Administrator and give it a _stackset-admin_ role. The other accounts will require a _stackset-target_ role. The _stackset-admin_ can also be a _stackset-target_ for itself, which is fun.


   <figure>
   <img alt="diagrams of AWS accounts and the stacks required to establish a trusted relationship and then resources being created using a StackSet" src="https://i.guim.co.uk/img/media/f62f69ad78e62dc342c16d790c9c54f78cde5dc0/0_0_2808_1140/master/2808.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=38a9f3f7830f701bf673489ccb9358a9" loading="lazy" />
   <figcaption>
     Adding roles to AWS accounts that establish a trusted relationship, then create resources using a StackSet
    <i>Photograph: Kate Whalen</i>
    </figcaption>
    </figure>

Be aware that whichever account you have made the _stackset-admin_ now holds incredible power over every _stackset-target_, so choose it wisely and consider how to minimise the risks.

Creating a trusted relationship between accounts may weaken or break some of the [security controls](https://www.theguardian.com/technology/2016/dec/16/real-world-software-security-lessons) that are currently in place, so consider where in the [sandboxing lifecycle](https://xkcd.com/2044/) you are and what trade-offs you are willing to make.

A dedicated account that is only used for StackSet administration is one mitigation we have in place. Developers can request access to the account as needed and relinquish permissions when they are done.

Working with StackSets is also a good opportunity to pair on deployment with someone. Talking someone through each step as you do it is a great opportunity to share knowledge, along with letting them double-check your work.

**StackSets in practice**

We used StackSets to create a role in each of our accounts that our centralised tool (Security HQ) can assume. The role has the required permissions for the services we want to request information from with API calls.

If we want to expand the permissions so we can integrate more services with Security HQ we can use the StackSet to update all of the roles at once with a single CloudFormation change.

**Challenges**

StackSets can open you up to a new form of CloudFormation drift, as nothing prevents a stack that is part of a StackSet from being modified or deleted from within the account. However, is possible to perform [drift detection](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-drift.html) on a StackSet so you can at least identify which stacks have been modified.

Since we were creating stacks in accounts that may have other teams managing them, we found it helpful to add an ‘Owner’ tag to resources created by the StackSet. This gives teams some guidance on who to ask about strange roles and resources suddenly appearing in their accounts.

**Conclusion**

If you are using one or more cloud platforms, it is worth investigating ways to centrally audit and monitor your environment. StackSets and Trusted Advisor, along with some internal tooling for aggregating and enriching reports, has helped standardise security checks across our AWS accounts and make them accessible in a single location, rather than requiring someone to check each account.

Finally, if we are giving developers [ownership of building and deploying](https://www.theguardian.com/info/developer-blog/2015/jan/05/delivering-continuous-delivery-continuously) our infrastructure we should be giving them ownership of securing it. We should aim for a culture where we share security expertise and responsibility the same ways we share operations expertise and responsibility.
