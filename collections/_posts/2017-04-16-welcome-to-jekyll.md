---
layout: post
title:  "Welcome to Jekyll!"
date:   2017-04-16 21:01:25 +0200
categories:
  - programming
tags: ['jekyll']
description: "How do I create this blog with Jekyll. Including functionalities like disqus comments and google analytics"
image:
  path: /assets/img/welcome-jekyll/main-4x3.jpg
  height: 1050
  width: 1400
thumb:
  path: /assets/img/welcome-jekyll/main-thumb.jpg
  height: 200
  width: 300

---

This is my first post using jekyll.  I started to use it because I really like
the idea of writing my own website in [markdown
language](https://daringfireball.net/projects/markdown/), with [my favorite
text editor](https://github.com/vim/vim) and using [git](https://git-scm.com/)
to control the version of my files.  The result is a simple and fast static
(though javascript-powered) website on a free server.  In addition, I don't have
to log in to a (comparatively) slower, web browser based interface like
Wordpress. 

I started playing up with jekyll in local using the
[minima](https://github.com/jekyll/minima) theme with the following commands:

>gem install jekyll bundler
>jekyll new my-awesome-site

I can build the site by running `jekyll serve` inside my site directory. This
command launches a web server and auto-generate the site when a file is updated.
I can easily add a new post by putting a file in the `_posts` directory,
following the date convention (`YYYY-MM-DD-name-of-post.ext`). 

To customize the default structure and style, I copied the files that define the theme.
They can by found with the command `bundle show minima`. 
Then, I can modify the footer of my page with the file `_includes/footer.html`,
add new icons and accounts.

## Google analytics

I can also use [Google
analytics](https://www.google.com/analytics/#?modal_active=none) to track the
traffic of my website (_They are watching us!_).  Login to Google Analytics and
create a new property to receive a *Tracking ID* for your website. You will
find your Universal Analytics tracking code under _Admin > Property > Tracking
Info > Tracking Code_.

Now you need to reference your *Tracking ID* in your `_config.yml` file.
Replace UA—XXXXXXXX-X with your own unique *Tracking ID*:

```yaml
# Google services
google_analytics: UA—XXXXXXXX-X
```

## Disqus commments

Finally I can add comments inside the blog using [disqus comment
system](https://disqus.com/features/).  I create an account at
[disqus](https://disqus.com/) and then I can obtain a
[disqus_shorname](https://disqus.com/admin/universalcode/).  Remember to add
your site to the trusted domains feature in your
[settings](https://help.disqus.com/customer/portal/articles/1261429).

Then I open `config.yml` and add the following code. Remember to change
`my_disqus_shortname` to your own Disqus shortname.

Comments and analytics are not enable by default in local because it is a
development environment. They are only available in production environment.
To run Jekyll in production environment use the following command to view your
site.

Check out the [Jekyll docs][jekyll-docs] for more info on how to get the most
out of Jekyll. File all bugs/feature requests at [Jekyll’s GitHub
repo][jekyll-gh]. If you have questions, you can ask them on [Jekyll
Talk][jekyll-talk].

## Update

I started using [Emping theme](https://github.com/rmsubekti/emping). It offers
a more aesthetic design and also includes [_Amp
Page_](https://www.ampproject.org) implementation to improve charging time,
_Pagination_ for the blog, a nice _404 Error Page_, _SEO Gems_ and the _Share
Button_ with different social networks.

[jekyll-docs]: https://jekyllrb.com/docs/home
[jekyll-gh]:   https://github.com/jekyll/jekyll
[jekyll-talk]: https://talk.jekyllrb.com/
