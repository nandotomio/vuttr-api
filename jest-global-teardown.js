const shell = require('shelljs')

module.exports = async ({ watch, watchAll }) => {
  if (!watch && !watchAll) {
    shell.echo('Shuting down database... 🔌')
    shell.exec('npm run test:down')

    shell.echo('Removing test volume... 🛠️')
    shell.exec('docker volume rm -f vuttr-api_db_postgresql_data_test')

    shell.echo('Tests finished...🏁')
  }
}
