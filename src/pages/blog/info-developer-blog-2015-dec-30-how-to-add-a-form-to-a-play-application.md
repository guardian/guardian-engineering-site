---
layout: ../../layouts/blog.astro
slug: 'info-developer-blog-2015-dec-30-how-to-add-a-form-to-a-play-application'
headline: 'How to add a form to a Play application'
date: '2015-12-30'
authors: [Chris Birchall]
standfirst: 'A step-by-step explanation of how to create a form in a Scala Play application, including explanations of some of the pitfalls you may encounter along the way'
image:
  url: 'http://media.guim.co.uk/2069e5c07399aca28e2a487fb99df1d0d43758d0/0_177_4854_2912/4854.jpg'
  alt: 'Filling in a form'
  credit: 'Photograph: Alamy'
tags: [Programming, Scala]
---

At the Guardian we build a lot of our software using the [Play](https://www.playframework.com/) web framework. For example, we use it for the [frontend](https://github.com/guardian/frontend) that powers the Guardian website. Because of this, I spend a lot of time helping new Guardian developers learn how to use Play, and one thing that often seems to stump people is adding forms to an application.

Forms are a fundamental part of many web applications, so you would think Play would make it as easy as possible to build them. But learning how to add a form often involves a perfect storm of advanced Play and Scala concepts, confusing compiler errors and scarce documentation, all of which can leave a beginner reeling.

I don’t like it when tutorials and official documentation only show things going smoothly. So in this post I’ll deliberately make a few mistakes, bump into compiler errors, explain what they mean and show you how to solve them.

I’ve made a [sample project](https://github.com/cb372/play-forms-tutorial) so you can refer to the source code and run the application while you read through the rest of the post. It’s available [on GitHub](https://github.com/cb372/play-forms-tutorial). I recommend you read it one commit at a time, starting at the oldest.

Our sample Play application has only one page. It shows a list of widgets, with names and prices. Our goal is to add a form to the bottom of the page, allowing users to type in a name and a price and create a new widget. Without further ado, let’s get started!

Add an action to handle the form post
-------------------------------------

First let’s add a new action to our Application controller to handle the data that is posted via the form.

```scala
class Application extends Controller {

  // ...

  def createWidget = TODO

}
```

This action will parse the form data and create the new widget, but we’ll leave it as a “TODO” for now. TODO is a handy Play feature that lets you quickly create a placeholder for an action that you will implement later.

Create a form definition and pass it to the template
----------------------------------------------------

Next we’ll create a definition of our form. This specifies the form fields and their types, as well as how to construct a Widget from form data and vice versa. You can also specify extra constraints on the values of fields, for example you could restrict the minimum and maximum length of values that you will accept for a given field.

The reasons for defining forms like this are twofold:

*   to let Play take care of validing user input for you
    
*   to allow auto-generation of HTML for form fields using form helpers, which we will see in a second

You can put the form definition wherever you like, but I chose to put mine in the controller’s companion object.

```scala
object Application {

  val createWidgetForm = Form(
    mapping(
      "name" -> text,
      "price" -> number
    )(Widget.apply)(Widget.unapply)
  )

}
```

We’ll also add a new parameter to the template:

```text
@(widgets: Seq[Widget], form: Form[Widget])
```

And pass a blank form from the controller to the template:

```scala
class Application extends Controller {

  // ...

  def listWidgets = Action {
    // Pass an unpopulated form to the template
    Ok(views.html.listWidgets(widgets.toSeq, Application.createWidgetForm))
  }

}
```

Create a form using plain HTML
------------------------------

We’ve passed the form from the controller to the template, but we won’t use it for anything just yet. Let’s keep things simple for now, writing our form in HTML in the template.

```html
<form method="POST" action="/widgets">
  <h2>TODO form fields</h2>
  <button type="submit">Create widget</button>
</form>
```

If you start the Play application and open http://localhost:9000/widgets in your browser, you should see a (very ugly) form.

Introduce a form helper and reverse routing
-------------------------------------------

When we wrote our form in plain HTML, we hardcoded the form’s action to “/widgets”. But we can do better than this. If we use Play’s so-called ‘reverse routing’ functionality, we can avoid hardcoding the URL and thus make our code more resilient to refactoring.

Reverse routing is possible because Play parses the application’s routes file and compiles a Scala object called the reverse router. This allows us to use a controller action (e.g. routes.Application.createWidget) as a key to lookup the corresponding URL. Because the reverse router is automatically generated from the routes file, it gets updated whenever you change any routes, so it is guaranteed not to go stale like a hardcoded URL.

We can use reverse routing if we replace our plain HTML <form> tag with a form helper.

```scala
@helper.form(routes.Application.createWidget) {
  <h2>TODO form fields</h2>
  <button type="submit">Create widget</button>
}
```

Now if we refresh the page in the browser, we get ... our first compiler error!


   <figure>
   <img alt="Play compilation error caused by a missing route" src="https://i.guim.co.uk/img/media/5e828320c2f852b5707745ce3e54938e85553086/0_0_628_377/master/628.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=b388075101fb1c47de1d590116e60358" loading="lazy" />
   <figcaption>
     Play compilation error caused by a missing route
    <i>Photograph: Chris Birchall</i>
    </figcaption>
    </figure>

Add the missing route
---------------------

Whoops! The compiler is telling us, in a slightly cryptic way, that we forgot to add our new route to the routes file. Let’s do so now.

```text
POST    /widgets     controllers.Application.createWidget
```

After adding this line to the routes file, the application should compile again.

Add fields to the form
----------------------

So far we have an empty form with only a submit button. Let’s add some fields so the user can type in the name and price of the new widget. We’ll use the form that we passed in from the controller earlier.

```text
@helper.form(routes.Application.createWidget) {
  <input type="text" id="@{form("name").id}" name="@{form("name").label}" value="@{form("name").value}">
  <input type="text" id="@{form("price").id}" name="@{form("price").label}" value="@{form("price").value}">
  <button type="submit">Create widget</button>
}
```

Introduce form field helpers
----------------------------

Writing each of our form fields in HTML works fine, but it is rather cumbersome. Luckily, Play provides helpers to generate the HTML for us. Let’s use those instead.

```scala
@helper.form(routes.Application.createWidget) {
  @helper.inputText(form("name"))
  @helper.inputText(form("price"))
  <button type="submit">Create widget</button>
}
```

That’s much nicer. Now if we refresh the browser, we encounter our next compiler error.


   <figure>
   <img alt="Play compilation error caused by implicit resolution failure" src="https://i.guim.co.uk/img/media/094591cd120d0805e02b062b35e1f8afbd0aba9e/0_0_659_395/master/659.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=4d14e53f82582ffa63117db5fac332f6" loading="lazy" />
   <figcaption>
     Play compilation error caused by implicit resolution failure
    <i>Photograph: Chris Birchall</i>
    </figcaption>
    </figure>

Wow! What happened there? And what on earth is a play.api.i18n.Messages? This needs a little explanation.

The form field helpers that we introduced come with built-in support for internationalisation (i18n) so that you can, for example, display the label for the name field as “nom” to French users and 名前 to Japanese ones. (Play works out the user’s preferred language based on their browser’s locale settings.) In order to do this, you can provide the necessary translations by writing them in properties files. Play will pick up those translations and pass them to the form helpers, which is where the play.api.i18n.Messages comes in.

Unfortunately, there is no way to disable this feature, even if you don’t care about i18n. This is probably by design, as the Play designers want you to be aware of the need for i18n right from the start so you don’t sprinkle English strings all over your application and later find that you needed i18n after all. So, even if you don’t provide any actual translations, you still need to help Play construct a Messages object and pass it to the form helpers.

Add an implicit parameter to the template
-----------------------------------------

The form helpers are looking for a Messages object in implicit scope, but it seems unlikely that we could create the object inside the template. Let’s add it as an implicit parameter to the template, so we can sort this stuff out inside the controller and then pass it to the template from there.

The first line of the template now looks like this.

```scala
@(widgets: Seq[Widget], form: Form[Widget])(implicit messages: play.api.i18n.Messages)
```

If we refresh the browser, we see that the implicit resolution error has now moved from the template to the controller.


   <figure>
   <img alt="Play compilation error showing an implicit resolution failure in the controller" src="https://i.guim.co.uk/img/media/852dfb35e7a1e1acdf0e5eb7627d3af05795d124/0_0_645_387/master/645.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=7d128e5f1fe0ea7c0f80e4c5db4c2485" loading="lazy" />
   <figcaption>
     Play compilation error showing an implicit resolution failure in the controller
    <i>Photograph: Chris Birchall</i>
    </figcaption>
    </figure>

Now we need to work out how to create the Messages object in the controller.

Try passing the request implicitly
----------------------------------

Come to think of it, in a lot of Play examples people pass the request implicitly in their controller actions, don’t they? And we’re trying to help the compiler find an implicit, so maybe that will help. It seems worth a shot.

```text
def listWidgets = Action { implicit request =>
  // Pass an unpopulated form to the template
  Ok(views.html.listWidgets(widgets.toSeq, Application.createWidgetForm))
}
```

Nice try, but it doesn’t fix our compiler error.


   <figure>
   <img alt="Play compilation error showing that passing the request implicitly does not help in this case" src="https://i.guim.co.uk/img/media/58418ef5c37d6f4aa084cf9a80ec3ee883b5e460/0_0_648_389/master/648.jpg?width=620&quality=45&auto=format&fit=max&dpr=2&s=f522fffafe1ee9329f609aa560a10492" loading="lazy" />
   <figcaption>
     Play compilation error showing that passing the request implicitly does not help in this case
    <i>Photograph: Chris Birchall</i>
    </figcaption>
    </figure>

But we’re on the right track ...

I18nSupport to the rescue
-------------------------

The problem is that the compiler wants a Messages but we are supplying a RequestHeader. We need some code that will take that RequestHeader and produce a Messages from it.

Luckily there is a bit of Play magic (also known as implicit conversion) to do just that. It’s in a trait called [I18nSupport](https://github.com/playframework/playframework/blob/2.4.6/framework/src/play/src/main/scala/play/api/i18n/I18nSupport.scala), so we can appease the compiler by mixing that trait into our controller.

```scala
class Application extends Controller with I18nSupport {

  // ...

}
```

Unfortunately, the compiler tells us:

> class Application needs to be abstract, since method messagesApi in trait I18nSupport of type => play.api.i18n.MessagesApi is not defined

This means that I18nSupport requires anyone who extends it to provide a play.api.i18n.MessagesApi. Let’s use dependency injection to pass one into the controller, saving it as a val in order to satisfy I18nSupport’s demands.

```scala
class Application(val messagesApi: MessagesApi) extends Controller with I18nSupport {

  // ...

}
```

Note that the naming is important here: we have to call it “messagesApi” because that is the name of the abstract method that I18nSupport wants us to implement.

If you use Play’s runtime dependency injection, I think you will need to annotate the parameter with @Inject, but I’ve never used it so I can’t be sure. We are using compile-time dependency injection, so we will manually construct an instance of play.api.i18n.MessagesApi and pass it to the controller in our AppComponents class.

```scala
class AppComponents(context: Context) extends BuiltInComponentsFromContext(context) {
  val messagesApi: MessagesApi = new DefaultMessagesApi(environment, configuration, new DefaultLangs(configuration))
  val appController = new Application(messagesApi)
  val assets = new controllers.Assets(httpErrorHandler)
  val router: Router = new Routes(httpErrorHandler, appController, assets)
}
```

With that, our application finally compiles again!

Implement the action to handle the form post
--------------------------------------------

The only thing left to do is to implement the controller action that handles form posts. It should parse the form data to create a Widget, add it to the widget data store (which in our simple example is just a mutable list), then redirect the client back to the “list widgets” page.

```scala
def createWidget = Action(parse.form(Application.createWidgetForm)) { request =>
  val widget = request.body
  widgets.append(widget)
  Redirect(routes.Application.listWidgets)
}
```

We reuse the form definition that we wrote earlier to tell Play how to parse the request body as a Widget. Then we append that widget to the mutable list of widgets, and respond to the client with a redirect. Again we are making use of Play’s reverse routing feature to specify the destination of the redirect.

This code is very concise, but it is quite unfriendly in its form parsing. If the form data is invalid in any way, it will reply with a blank 400 Bad Request response. If you want to be a bit more friendly, you can do the form validation inside the action, allowing you to handle the “invalid input” case more gracefully. For example, you may want to show the form to the user again, with the invalid fields highlighted.

If we were to do the form validation inside the action, it would look like this.

```scala
def createWidget = Action { implicit request =>
  val formValidationResult = Application.createWidgetForm.bindFromRequest
  formValidationResult.fold({ formWithErrors =>
    // This is the bad case, where the form had validation errors.
    // Let's show the user the form again, with the errors highlighted.
    // Note how we pass the form with errors to the template.
    BadRequest(views.html.listWidgets(widgets.toSeq, formWithErrors))
  }, { widget =>
    // This is the good case, where the form was successfully parsed as a Widget.
    widgets.append(widget)
    Redirect(routes.Application.listWidgets)
  })
}
```

First we validate the form using the bindFromRequest method. Then we fold over the result, passing in two functions to handle the bad and good cases respectively. Note how we are now passing the request implicitly so that the bindFromRequest method can find it in implicit scope.

Conclusion
----------

Play has a lot of useful infrastructure in place to support forms, but sometimes it is difficult to understand, or even to find it in the first place. I hope it all makes a little more sense after reading this.

Update: Security!
-----------------

As our esteemed security architect [Adam](https://twitter.com/adamnfish) pointed out, it was remiss of me to write a post about forms without mentioning security. Play gives you some protection against common attacks such as [CSRF](https://www.owasp.org/index.php/Cross-Site_Request_Forgery_\(CSRF\)) and [XSS](https://www.owasp.org/index.php/Cross-site_Scripting_\(XSS\)). XSS protection is enabled out-of-the-box, although you should still test your application for XSS vulnerabilities.

Play also provides support for CSRF prevention, but you need to specifically add it to your application. I won’t go into the details here, but I’ve added a couple of commits to the [sample code](https://github.com/cb372/play-forms-tutorial) to show how it’s done.
