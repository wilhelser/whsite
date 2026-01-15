#!/usr/bin/env zsh
eval "$(rbenv init - zsh)"
rbenv local 3.3.6
bundle exec jekyll serve --livereload

