const msg = require('fs').readFileSync('.git/COMMIT_EDITMSG', 'utf-8').trim()

// console.log('msg :>> ', msg, 3333333333333)

const commitRE = /^(revert:)?(feat|fix|docs|dx|refactor|perf|test|workflow|build|ci|chore|types|wip|release)(\(.+\))?:.{1,50}/
const mergeRe = /^(Merge pull request|Merge branch)/

if (!commitRE.test(msg)) {
  if (!mergeRe.test(msg)) {
    console.log('git commit 信息校验不通过')

    console.error(`git commit 的信息格式不对，需要使用 title(scope): desc的格式
      比如 fix: xx bug
      feat(test): add new
      具体校验逻辑看 scripts/verifyCommit.js
    `)
    process.exit(1)
  }
} else {
  console.log('git commit 信息校验通过')
}