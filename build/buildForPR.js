const fs = require('fs')
const graphql = require('@octokit/graphql')
const execa = require('execa')

async function build(num) {
  const { data: {
    repository: {
      pullRequest: {
        headRefOid,
        headRepository: {
          nameWithOwner: repo
        }
      }
    }
  } } = await graphql(`query getPR($num: Int!) {
      repository(owner: "eslint", name: "eslint") {
        pullRequest(number: $num) {
          headRefOid
          headRepository {
            nameWithOwner
          }
        }
      }
    }`, {
    num,
    headers: {
      authorization: 'token ' + process.env.GITHUB_TOKEN
    }
  })

  const url = `https://github.com/${repo}#${headRefOid}`

  await execa('yarn', ['add', '--dev', `eslint@${url}`], { stdio: 'inherit' })
  await execa(
    'yarn',
    ['vue-cli-service', 'build'],
    { env: { BUILD_PR: num }, stdio: 'inherit' }
  )

  process.stdout.write(`Build for PR #${num} successfully!\n`)
}

fs.readFile(
  __dirname + '/pr.txt', { encoding: 'utf-8' },
  async (err, content) => {
    if (err) {
      process.exitCode = 1
      return
    }

    const nums = content.split('\n').filter(Boolean).map(Number.parseInt)
    for (const num of nums) {
      await build(num)
    }
  }
)
