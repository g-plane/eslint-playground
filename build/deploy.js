if (process.env.CIRCLE_PULL_REQUEST) process.exit()

const fs = require('fs')
const ghpages = require('gh-pages')

fs.mkdirSync('./dist/.circleci')
fs.copyFileSync('./static/.circleci/config.yml', './dist/.circleci/config.yml')

ghpages.publish('dist', {
  user: {
    name: 'GPlane Fans',
    email: 'gplane@protonmail.com'
  },
  dotfiles: true,
  // eslint-disable-next-line max-len
  repo: `https://${process.env.GITHUB_TOKEN}@github.com/g-plane/eslint-playground.git`
}, err => {
  if (err) {
    process.stderr.write(err)
    process.exitCode = 1
  } else {
    process.exitCode = 0
  }
})
