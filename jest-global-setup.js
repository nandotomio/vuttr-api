const shell = require('shelljs')
const onExit = require('signal-exit')

module.exports = async () => {
  if (!shell.which('docker-compose')) {
    shell.echo('Sorry, this script requires docker-compose')
    shell.exit(1)
  }

  onExit(function () {
    shell.echo('Shuting down database... 🔌')
    shell.exec('npm run test:down')

    shell.echo('Removing test volume... 🛠️')
    shell.exec('docker volume rm -f vuttr-api_db_postgresql_data_test')

    shell.echo('Tests finished...🏁')

    process.exit()
  })

  shell.echo('Starting database... 💾')

  shell.exec('npm run test:up')

  shell.echo('Starting tests... 🧪 🤞')
}
