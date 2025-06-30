---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2015-mar-06-android-subtle-prompt-library'
headline: 'Android Subtle Prompt library'
date: '2015-03-06'
authors: [Jesús Gumiel]
standfirst: 'How to create a Guardian style subtle prompt to highlight your new features'
image:
  url: 'http://static.guim.co.uk/sys-images/Guardian/Pix/pictures/2015/2/23/1424705087655/ff7d5932-c444-4b53-a7d8-936fb287fa0d-bestSizeAvailable.png'
  alt: 'Subtle prompt on the Guardian’s Android app.'
  credit: 'Photograph: Android app screenshot'
tags: [Android, Software]
---

Sometimes the difference between a brilliant feature and one that nobody will use is a simple detail. Not an algorithm, not the quality of the code, nor how easy it can make the life of users. You can develop the best feature in the world, but if nobody knows about it, you’ve got nothing.

That thought was at the top of our minds a few months ago, when we faced the challenge of showing the users what’s new on the Guardian mobile app. And believe me, something so simple (in theory), can be quite tricky if you want to do it well.

There are some common patterns to achieve this target:

*   **Classic dialogs** (small ones). Everybody hates them, they interrupt you while you’re interacting with the app, and oblige you to focus on something which you’re probably not interested in. As result, the majority of users just dismiss them without paying any attention to the content, and probably feel irritated with the developer for the interruption.  
    
*   **Full screen dialogs**. These have been quite popular recently. The user experience is better using a full screen display, and an attractive experience is always better received. The negatives, however, are the same as in the case of its smaller brother.  
    
*   **Third party libraries** like [ShowcaseView](http:). This library was quite popular at one point, but it’s starting to be forgotten by developers. The main advantage was the feeling of being something native, like part of the operating system, and the way it focuses the attention on important UI elements. However it is also disruptive to the user’s flow and therefore feels intrusive.

These were the criteria we had when we started the work: It should be clear but non-intrusive, beautiful and effective. And this was the idea our wonderful UX team proposed. They called it **subtle prompts**.

<figure>
                <iframe class="video" src="https://www.youtube-nocookie.com/embed/Rg3h42OxepE?wmode=opaque&feature=oembed" title="Subtle prompt on The Guardian App" allow="accelerometer; autoplay; encrypted-media; picture-in-picture; web-share" allowfullscreen></iframe>
            </figure>

The idea is to show an inline prompt at the top of the page pointing to the action bar button that allows you to access the new feature. The prompt contains a simple explanation of the feature, and can be dismissed either explicitly through clicking, or implicitly by scrolling down the page. The prompt itself slides into view smoothly, while an additional animation makes the button it is pointing to ‘pop’ to attract the attention of the user. Simple, clean and effective.

When we were developing the subtle prompt code, we felt it would be useful enough to create a library with it. In our app we have different kinds of subtle prompts: one for expandable lists and another for webviews. Sometimes they are attached to an action button, at other times they simply notify the user about a feature without being directly attached to a UI element. Different UX, with images, without them... this certainly seemed like a good candidate for a standard library, easy to reuse and extend, to cover all our requirements.

Of course, at the Guardian, ‘be open’ is one of our guiding principles, so we made the library public so any Android developer can use it. [Here is the GitHub project.](https://github.com/guardian/android-subtle-prompts)

Let’s look at how to implement our save for later articles subtle prompt. This example shows a subtle prompt with an image, that appears attached to an animated action button.

In this case, the subtle prompt appears on an ExpandableList. This is probably the more difficult case, as we have to add the prompt as a header, and manage the scrolling.

We use our Helper class to create the type of subtle prompt we need. In this case, on a ExpandableList:

```
BaseSubtlePrompt baseSubtlePrompt = SubtlePromptHelper.getPromptOnExpandableList(context);
```

Now we assign some custom values: The view to animate, a listener to be notified when the prompt collapses, the text on the prompt and the different states of the animated button.

```
baseSubtlePrompt.setAnimation(animatedView, listener);
baseSubtlePrompt.setPromptTitle(promptTitle);
baseSubtlePrompt.setPoppingIcon(poppingIconDrawable);
baseSubtlePrompt.setStandardIcon(standardIconDrawable);
```

Our prompt includes some body text and an image, as well as the title, so we add them.

```
baseSubtlePrompt.setBodyText(bodyString;
baseSubtlePrompt.setPromptImage(promptDrawable);
```

We use a custom drawable for the ‘close’ button of our subtle prompt.

```
baseSubtlePrompt.setPromptCloseButton(closeDrawable);
```

And this would be an example of the listener we assigned on the first step. The listener allows us to control what happens when the subtle prompt is collapsed. For example, we could save some data to preferences.

```
new BaseSubtlePrompt.Listener() {
    @Override
    public void onCollapseStart() {
        // Do something when the subtlePrompt starts to collapse
    }
    @Override
    public void onCollapseEnd() {
        // Do something when the subtlePrompt finishes to collapse
    }
});
```

It is possible to programatically dismiss a prompt by calling collapsePrompt – for instance, when the user scrolls, we could call it from within a scroll listener.

```
@Override
public void onScroll(AbsListView view, int firstVisibleItem, int visibleItemCount, int totalItemCount) {
    if (lastScrollState == SCROLL_STATE_FLING || lastScrollState == SCROLL_STATE_TOUCH_SCROLL) {
        PromptHelper.collapsePrompt(baseSubtlePrompt);
    }
}
```

There are lots of options to customise your subtle prompt: typeface, padding, margins, etc. Visit our public repo on [GitHub](https://github.com/guardian/android-subtle-prompts) and give it a try.
