/**
 * @type {import('lint-staged').Config}
 */
const configuration = {
  '*.ts?(x)': function () {
    return 'tsc -p tsconfig.json --noEmit'
  },
}

module.exports = configuration