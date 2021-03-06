import os
import json

import webapp2
import jinja2

import requests

# set up environments
template_dir = os.path.join(os.path.dirname(__file__), 'templates')
jinja_env = jinja2.Environment(loader = jinja2.FileSystemLoader(template_dir),
                                autoescape = True)

# helper functions
def request_data(limit=None):
    return

# The base class for handling requests
class Handler(webapp2.RequestHandler):
    # write templates to the web browser
    def write(self, *a, **kw):
        self.response.out.write(*a, **kw)

    # take a template filename with some keywords
    # and returns the rendered template as string
    def render_str(self, template, **params):
        t = jinja_env.get_template(template)
        return t.render(params)

    # take a template filename with some keywords
    # and writes the rendered template to the web browser
    def render(self, template, **params):
        self.write(self.render_str(template, **params))

    def initialize(self, *a, **kw):
        webapp2.RequestHandler.initialize(self, *a, **kw)

# Handle requests in main page
class MainPage(Handler):
    def get(self):
        self.render("index.html")

    def post(self):
        return;

ROUTES = [('/', MainPage),]

app = webapp2.WSGIApplication(ROUTES, debug=True)
