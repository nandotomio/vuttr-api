const shell = require('shelljs')
const onExit = require('signal-exit')

module.exports = async () => {
  if (!shell.which('docker-compose')) {
    shell.echo('Sorry, this script requires docker-compose')
    shell.exit(1)
  }

  // This ensures that the provisioned test containers will:
  // - shut down at the end and during the tests, if a forced exit occurs
  // - not shut down if tests are running in watch mode
  onExit(function () {
    shell.echo('Shuting down database... 🔌')
    shell.exec('npm run test:down')

    shell.echo('Tests finished...🏁')

    process.exit()
  })

  shell.echo('Starting database... 💾')

  shell.exec('npm run test:up')

  shell.echo('Starting tests... 🧪 🤞')
}
