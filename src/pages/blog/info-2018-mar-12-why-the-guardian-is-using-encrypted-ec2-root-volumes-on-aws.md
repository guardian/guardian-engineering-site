---
layout: ../../layouts/blog.astro
slug: 'info-2018-mar-12-why-the-guardian-is-using-encrypted-ec2-root-volumes-on-aws'
headline: 'Why the Guardian is using encrypted EC2 root volumes on AWS'
date: '2018-05-18'
authors: [Simon Hildrew]
standfirst: 'In an ongoing effort to adhere to security best practices the Guardian is starting to use encrypted root volumes by default on servers in AWS.'
tags: [AWS, Security]
---

The Guardian uses Amazon Web Services (AWS) for the majority of the services behind the website and content management systems. We’re constantly striving to improve our security practices and so we’ve decided to adopt a policy of encrypting everything that we can by default. AWS services make this easy when using S3 buckets, Dynamo tables, RDS instances or EBS volumes. One notable exception is that encrypting the root volume of EC2 instances is non trivial.

Switching to encrypt our root volumes meant changing how we create and distribute the Amazon Machine Images (AMIs) that we create. Our previous approach was to bake all of our AMIs in a single AWS account (using our in house baking tool [AMIgo](https://github.com/guardian/amigo)) and then [grant permission](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/sharingamis-explicit.html) for all of our other accounts to use them. However, encrypted AMIs can only be used in the account where they were created (as that is where the encryption key is) so we now need to create individual encrypted AMIs in each account that wants to use it.

We chose to create a lambda function (called Image Copier) in each account that fired whenever a new AMI was created by AMIgo. The lambda is simple: it makes an encrypted copy of the AMI in the local AWS account and then add tags to the new AMI to indicate the AMI from which it was copied.


   <figure>
   <img alt="Diagram showing how events from from AMIgo to an SNS topic and then Lambda to trigger the creation of encrypted copies of AMIs." src="https://i.guim.co.uk/img/media/0acfabe50d5f4605ed64c282f3e0976951e77e0b/0_0_775_537/master/775.png?width=620&quality=45&auto=format&fit=max&dpr=2&s=f7365fe9c41aa5b1f0fd0f4c1d7a8065" loading="lazy" />
   <figcaption>
     Diagram showing how AMIgo and Image Copier create encrypted AMIs.
    <i>Illustration: Simon Hildrew/The Guardian</i>
    </figcaption>
    </figure>

This simple description omits a number of details that are needed to make this work.

First of all, in order to copy an AMI the other AWS account must be given permission to both launch the AMI and also access the EBS snapshot associated with the AMI. We use [Hashicorp’s Packer](https://www.packer.io/) to bake AMIs and we needed to upgrade the version we were using to a more recent version that has support for snapshot permissions (see [this PR](https://github.com/hashicorp/packer/pull/4243)).

Secondly, tags associated with an AMI are not visible from other accounts and so they are not copied with the AMI. We need the tags to keep track of the identity of each image. To keep them we included the set of tags on the SNS topic that was used to trigger the Lambda. In addition to the existing tags we also appended two new tags: Encrypted and CopiedFromAMI. These indicate that the AMI has an encrypted root volume and the ID of the original AMI it was copied from.

Thirdly, we don’t want to make an encrypted copy of every image that AMIgo bakes in every account that contains the Image Copier lambda. To solve this, each recipe in AMIgo has a list of target accounts and these are also sent in the message on the topic. When an Image Copier lambda receives a message it looks to see if it is in an account that is listed in the message. If so it will create an encrypted copy, otherwise it will ignore the message.

Finally, it’s worth saying that we used AWS CloudFormation StackSets to deploy this Lambda function to all of our accounts so that we didn’t need to do it by hand and can easily update it in the future.

You can find the source code for AMIgo and Image Copier in our [GitHub repository](https://github.com/guardian/amigo).
