#!/usr/bin/env zx

await $`git filter-branch -f --env-filter "
GIT_AUTHOR_NAME='bre30kra69cs'
GIT_AUTHOR_EMAIL='an.krasowsckij@gmail.com'
GIT_COMMITTER_NAME='bre30kra69cs'
GIT_COMMITTER_EMAIL='an.krasowsckij@gmail.com'
" HEAD`;
