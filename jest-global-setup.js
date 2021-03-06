const shell = require('shelljs')
const onExit = require('signal-exit')

module.exports = async () => {
  if (!shell.which('docker-compose')) {
    shell.echo('Sorry, this script requires docker-compose')
    shell.exit(1)
  }

  onExit(function () {
    shell.echo('Shuting down database... ๐')
    shell.exec('npm run test:down')

    shell.echo('Removing test volume... ๐ ๏ธ')
    shell.exec('docker volume rm -f vuttr-api_db_postgresql_data_test')

    shell.echo('Tests finished...๐')

    process.exit()
  })

  shell.echo('Starting database... ๐พ')

  shell.exec('npm run test:up')

  shell.echo('Starting tests... ๐งช ๐ค')
}
